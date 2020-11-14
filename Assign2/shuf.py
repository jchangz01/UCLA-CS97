#!/usr/bin/python

import random, sys
from optparse import OptionParser

class shuffle:
    def __init__(self, subject, listOrFile):
        if listOrFile == "file":
            #if file does not exist, exit with error
            try:
                f = open(subject, 'r')
                #read file contents into self.lines
                self.lines = f.readlines()
                f.close()
            except:
                print ("shuf.py: " + subject + ": No such file or directory")
                exit(1)
                
        elif listOrFile == "list":
            self.lines = subject

        #track our input type
        self.subjectType = listOrFile
            
        #shuffle lines
        random.shuffle(self.lines)
        
        #read number of lines into self.lineCount
        self.lineCount = len(self.lines)
        
    def display (self, nOptionCount, rOption, outputMethod):
        #case for -r option
        if(rOption):
            if (not bool(nOptionCount)):
                while True:
                    #use sys to print if input is a file
                    if outputMethod == "sys":
                        sys.stdout.write(random.choice(self.lines))
                    #use print to print if input is not a file
                    else:
                        print (random.choice(self.lines))
                    
            else:
                for index in range(nOptionCount):
                    if outputMethod == "sys":
                        sys.stdout.write(random.choice(self.lines))
                    else:
                        print (random.choice(self.lines))
        else:
            #account for -n option
            if (not bool(nOptionCount) or nOptionCount > self.lineCount) and nOptionCount != 0:
                nOptionCount = self.lineCount

            for index in range(nOptionCount):
                #use sys to print if input is a file; otherwise, use print
                if outputMethod == "sys":
                    sys.stdout.write(self.lines[index])
                else:
                    print (self.lines[index])

    def getLineCount (self):
        return self.lineCount

def main():
    usage_msg = """python shuf.py [OPTION]... [FILE]
  or: python shuf.py -e [OPTION]... [ARG]...
  or: python shuf.py -i LO-HI [OPTION]...
Write a random permutation of the input lines to standard output.

With no FILE, or when FILE is -, read standard input."""

    parser = OptionParser(usage_msg);

    parser.add_option("-e","--echo", action="store_true", dest="cliOperands", default=False, help="Treat each command-line operand as an input line\n")
    parser.add_option("-i","--input-range", action="store", dest="uDigits", metavar="LO-HI", type="string", help="Act as if input came from file containing the range of unsigned decimal integers LO...HI, one per line\n")
    parser.add_option("-n","--head-count", dest="count", metavar="COUNT", type="int", help="Output at most count lines. By default, all input lines are output")
    parser.add_option("-r","--repeat",action="store_true",dest="replace", default=False, help="Repeat output values, that is, select with replacement\n")

    options, args = parser.parse_args(sys.argv[1:])
    
    #display error if both -e and -i options are active
    if (options.cliOperands and options.uDigits):
        parser.error("cannot combine -e and -i options")

    #display error if -i is active and operands exist
    if (options.uDigits and len(args) > 0):
        parser.error("extra operand '" + args[0] + "'")

    #display error if -n option's argument is negative
    if (options.count and options.count < 0):
        parser.error("invalid line count: '" + str(options.count) + "'")
    
    #case for -i option
    if (options.uDigits):
        bounds=options.uDigits.split("-")
        if (len(bounds) != 2):
            parser.error("invalid input range: '" + bounds[0] + "'")
        try:
            min=int(bounds[0])
        except:
            parser.error("invalid input range: '" + bounds[0] + "'")
        try:
            max=int(bounds[1])
        except:
            parser.error("invalid input range: '" + bounds[1] + "'")

        if (min > max):
            parser.error("invalid input range: '" + options.uDigits + "'")

        input = [item for item in range(min, max+1)] 
        type = "list"

        outputType = "print"

    #case for -e 
    elif (options.cliOperands):
        input = args
        type = "list"
        outputType = "print"

    #case for no -e or -i options
    else:    
        #check if argument is a file when only one argument is present
        if len(args) == 1 and args[0] != '-':
            input = args[0]
            type = "file"
        elif len(args) > 1:
            parser.error("extra operand '" + args[1] + "'")
        #otherwise, default to stdin for input
        else:
            input = sys.stdin.readlines();    
            type = "list"

        outputType = "sys"
        
    generator = shuffle (input, type)
        
    #display error if  -r option is active but there are no args
    if (generator.getLineCount() < 1 and options.replace):
        parser.error("no lines to repeat")

    generator.display(options.count, options.replace, outputType)

if __name__ == "__main__":
    main()
