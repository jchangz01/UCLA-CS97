/* Generate N bytes of random output.  */

/* When generating output this program uses the x86-64 RDRAND
   instruction if available to generate random numbers, falling back
   on /dev/random and stdio otherwise.

   This program is not portable.  Compile it with gcc -mrdrnd for a
   x86-64 machine.

   Copyright 2015, 2017, 2020 Paul Eggert

   This program is free software: you can redistribute it and/or
   modify it under the terms of the GNU General Public License as
   published by the Free Software Foundation, either version 3 of the
   License, or (at your option) any later version.

   This program is distributed in the hope that it will be useful, but
   WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
   General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>.  */

#include <errno.h>
#include <stdbool.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "options.h"
#include "output.h"
#include "rand64-hw.h"
#include "rand64-sw.h"


/* Main program, which outputs N bytes of random data.  */
int
main (int argc, char **argv)
{
  /* Declare an object of options and set default input and output to empty strings*/
  struct options opts;
  opts.input = "";
  opts.input_file = "";
  opts.output = "";
  opts.block_size = 0;  

  /* Check options and arguments. */
  bool valid = checkOptions (argc, argv, &opts);

  if (!valid)
    {
      fprintf (stderr, "%s: usage: %s NBYTES\n", argv[0], argv[0]);
      return 1;
    }

  long long nbytes = opts.nbytes;
  /* If there's no work to do, don't worry about which library to use.  */
  if (nbytes == 0)
    return 0;

  /* Now that we know we have work to do, arrange to use the
     appropriate library.  */
  void (*initialize) (void) = NULL;
  void (*initialize_sw) (char*) = NULL;
  unsigned long long (*rand64) (void) = NULL;
  void (*finalize) (void) = NULL;
  
  /* Use hardware when running on x86-64 machine (default) or if input argument is "mrand48_r"; 
  otherwise, use software when /FILE is specified or when machine is not x86-64 */
  
  if (strcmp(opts.input, "/FILE") == 0)
  {
    initialize_sw = software_rand64_init;
    rand64 = software_rand64;
    finalize = software_rand64_fini;
  }
  else if (strcmp(opts.input, "mrand48_r") == 0)
  {
    initialize = mrand48_rng_init;
    rand64 = mrand48_rng;
    finalize = mrand48_rng_fini;
  } 
  else if (strcmp(opts.input, "rdrand") == 0)
  {
    if (rdrand_supported ()) {
      initialize = hardware_rand64_init;
      rand64 = hardware_rand64;
      finalize = hardware_rand64_fini;
    }
    else {
      fprintf(stderr, "-i option \"%s\" is unavailible on a non x86-64 machine\n", opts.input);
      return 1;
    }
  }
  else 
  {
    if (rdrand_supported()) {
      initialize = hardware_rand64_init;
      rand64 = hardware_rand64;
      finalize = hardware_rand64_fini;
    }
    else {
      initialize_sw = software_rand64_init;
      rand64 = software_rand64;
      finalize = software_rand64_fini;
    }
 }
  
    
  // if we are using software implementation, call software initialize with potential file
  if (initialize_sw)
    initialize_sw (opts.input_file);
  else
    initialize ();

  int wordsize = sizeof rand64();
  int output_errno = 0;
 
  if (strcmp(opts.output, "N") == 0)
  {
     if (opts.block_size == 0) {
       fprintf (stderr, "CANNOT output 0 KiB at a time!\n");
       return 1;
     }
     unsigned int output_blockSize = opts.block_size * 1024;
     unsigned long long x = 0;
     char* byte_buffer = (char*)malloc(output_blockSize);
     if (byte_buffer == NULL){
       fprintf(stderr, "TERMINTATE! Accessed NULL memory!!\n");
       exit (1);
     }
    
     while (nbytes > 0)
     {
       unsigned int output_size = nbytes < output_blockSize ? nbytes : output_blockSize;
       for (unsigned int i = 0; i < output_size; i++)
       {
         if (i % 8 == 0)
           x = rand64();
         byte_buffer[i] = x >> (i % 8);
       }
       writebyteChunks (byte_buffer, output_size);
       nbytes -= output_size;
     }
     free(byte_buffer);
  }
  else
  {
    do
    {
        unsigned long long x = rand64();
        int outbytes = nbytes < wordsize ? nbytes : wordsize;
        if (!writebytes (x, outbytes))
	{
	  output_errno = errno;
	  break;
	}
        nbytes -= outbytes;
    }
    while (0 < nbytes);
  }

  if (fclose (stdout) != 0)
    output_errno = errno;

  if (output_errno)
    {
      errno = output_errno;
      perror ("output");
    }

  finalize ();
  return !!output_errno;
}
