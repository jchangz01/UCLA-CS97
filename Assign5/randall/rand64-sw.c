#include <immintrin.h>
#include <stdio.h>
#include <time.h>
#include "rand64-sw.h"
/* Software implementation */

/* Input stream containing random bytes. */
static FILE *urandstream;

/* Initialize the software rand64 implementation.  */
void
software_rand64_init (char* file)
{
  if (file[0] != '\0')
    urandstream = fopen (file, "r");
  else 
    urandstream = fopen ("/dev/random", "r");
  if (! urandstream) {
    fprintf(stderr, "\"%s\" is not a valid file \n", file);
    exit(1);
  }
}

/* Return a random value, using software operations.  */
unsigned long long
software_rand64 (void)
{
  unsigned long long int x;
  if (fread (&x, sizeof x, 1, urandstream) != 1)
    abort ();
  return x;
}

/* Finalize the software rand64 implementation.  */
void
software_rand64_fini (void)
{
  fclose (urandstream);
}




/* mrand48_r implementation */

/* Initialize the mrand48_r implementation */
struct drand48_data buf = {0};
void
mrand48_rng_init (void)
{
  srand48_r(time(NULL), &buf);
}

/* Return a random value, using mrand48_r operations */
unsigned long long 
mrand48_rng (void)
{
  long int x;
  long int y;
  mrand48_r (&buf, &x);
  mrand48_r (&buf, &y);

  return ((unsigned long long)x << 32) | ((unsigned long long)y & 0x00000000FFFFFFFF);
}

/* Finalize the mrand48_r implementation */
void
mrand48_rng_fini (void)
{
}
