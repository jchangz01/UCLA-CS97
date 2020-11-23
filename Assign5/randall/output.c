#include <limits.h>
#include <stdbool.h>
#include <stdio.h>
#include <unistd.h>
#include "output.h"

bool
writebytes (unsigned long long x, int nbytes)
{
    do
      {
        if (putchar (x) < 0)
	  return false;
        x >>= CHAR_BIT;
        nbytes--;
      }
    while (0 < nbytes);
  return true;
}

bool 
writebyteChunks (char* buf, int output_size)
{
  write (1, buf, output_size);
  return true;
}
