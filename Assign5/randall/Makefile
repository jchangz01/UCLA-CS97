# Make x86-64 random byte generators.

# Copyright 2015, 2020 Paul Eggert

# This program is free software: you can redistribute it and/or
# modify it under the terms of the GNU General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.

# This program is distributed in the hope that it will be useful, but
# WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# General Public License for more details.

# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.  */

# Optimization level.  Change this -O2 to -Og or -O0 or whatever.
OPTIMIZE = -O

# The C compiler and its options.
CC = gcc
CFLAGS = $(OPTIMIZE) -g3 -Wall -Wextra -fanalyzer \
  -march=native -mtune=native -mrdrnd

# The archiver command, its options and filename extension.
TAR = tar
TARFLAGS = --xz --transform 's,^,randall/,'
TAREXT = txz

default: randall

randall: randall.c options.c options.h output.c output.h rand64-hw.c rand64-hw.h \
	 rand64-sw.c rand64-sw.h
	$(CC) $(CFLAGS) $@.c options.c output.c rand64-sw.c rand64-hw.c -o $@

assignment: randall-assignment.$(TAREXT)
assignment-files = COPYING Makefile randall.c options.c options.h output.c output.h \
		rand64-hw.c rand64-hw.h rand64-sw.c rand64-sw.h notes.txt
randall-assignment.$(TAREXT): $(assignment-files)
	$(TAR) $(TARFLAGS) -cf $@ $(assignment-files)

submission: randall-submission.$(TAREXT)
submission-files = $(assignment-files) \
  notes.txt # More files should be listed here, as needed.
randall-submission.$(TAREXT): $(submission-files)
	$(TAR) $(TARFLAGS) -cf $@ $(submission-files)

check: randall 
	if [ `./randall 10 | wc -c` -eq 10 ];\
	then echo "Success!";\
	else echo "Failure!";\
	fi  
	if [ `./randall -i mrand48_r 21312 | wc -c` -eq 21312 ];\
	then echo "Success!";\
	else echo "Failure!";\
	fi
	if [ `./randall -i /dev/urandom 131231 | wc -c` -eq 131231 ];\
	then echo "Success!";\
	else echo "Failure!";\
	fi
	if [ `./randall -o 3 27000 | wc -c` -eq 27000 ];\
	then echo "Success!";\
	else echo "Failure!";\
	fi	 
	if [ `./randall -i mrand48_r -o 8 16000 | wc -c` -eq 16000 ];\
	then echo "Success!";\
	else echo "Failure!";\
	fi
	if [ `./randall -i /dev/urandom -o 3 68585 | wc -c` -eq 68585 ];\
	then echo "Success!";\
	else echo "Failure!";\
	fi 
	if [ `./randall -o stdio 100 | wc -c` -eq 100 ];\
	then echo "Success!";\
	else echo "Failure!";\
	fi 







	

.PHONY: default clean assignment submission

clean:
	rm -f *.o *.$(TAREXT) randall
