struct options {
  long long nbytes;
  char* input;
  char* input_file;
  char* output;
  unsigned int block_size;
};

bool checkOptions (int argc, char* argv[], struct options* opts); 

