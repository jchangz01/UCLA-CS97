#include <math.h>
#include <stdio.h>

int main () {
	double x = pow(2, pow(3, 4));
	if (x > 9,223,372,036,854,775,807)
		printf("Nil\n");
	else 
		printf("t\n");
}
