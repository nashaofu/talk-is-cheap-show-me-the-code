#include "add.h"
#include "sub.h"
#include <iostream>

int main()
{

    int a = sub(3, 1);
    std::cout << add(1, 2) << std::endl;
    std::cout << sub(2, 1) << a << std::endl;
    // printf("add %d\n", add(1, 2));
    // printf("sub %d\n", sub(5, 2));
}