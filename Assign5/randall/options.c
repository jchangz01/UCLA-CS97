#include <unistd.h>
#include <stdbool.h>
#include <ctype.h>
#include <string.h>
#include <stdlib.h>
#include <errno.h>
#include <stdio.h>
#include "options.h"

bool
checkOptions (int argc, char* argv[], struct options* opts) {
  int opt;

  while ((opt = getopt(argc, argv, ":i:o:")) != -1) {
    switch (opt) {
      case 'i':
        if (strcmp(optarg,"rdrand") == 0) {
          opts->input = "rdrand";
       	  break;
        }
	else if (strcmp(optarg, "mrand48_r") == 0) {
          opts->input = "mrand48_r";
          break;
        }
        else if (optarg[0] == '/' && optarg[1] != '\0') {         
          opts->input = "/FILE";
          opts->input_file = optarg;  
	  break; 
        }
        else
        {
          fprintf(stderr, "Invalid operand \"%s\" for '-i'\n", optarg);
          return false;
        }
      case 'o':
        if (strcmp(optarg, "stdio") == 0) {
          opts->output = "stdio";
          break;
        }
	//check to make sure optargs contain only digits
        for (long unsigned i = 0; i < strlen(optarg); i++) {
          if (!isdigit(optarg[i]))
          {
            fprintf(stderr, "Invalid operand for \"%s\" for '-o'\n", optarg); 
            return false;
          }
        }
        opts->output = "N";
        opts->block_size = strtoul(optarg, NULL, 10);
        break;
      case ':':
        fprintf(stderr, "Option -%c requires an operand\n", optopt);
	return false;
      case '?':
        fprintf(stderr, "Unrecognized option: '-%c'\n", optopt);
        return false;
    }
  }
  
  /* Process number of bytes into nbytes */
  if (optind >= argc)
    return false;
    
  char *endptr;
  errno = 0;
  opts->nbytes = strtoll (argv[optind], &endptr, 10);
  if (errno) { 
    perror (argv[optind]);
    return false;
  }

  return !*endptr && 0 <= opts->nbytes;
}
