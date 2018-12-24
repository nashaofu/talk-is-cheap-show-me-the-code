#include <iostream>
#include "math/multiply.h"
#include "math/power.h"
#include "config.h"

#if defined(CMAKE_OPTION)
void cmakeOption()
{
  std::cout << "cmakeOption" << std::endl;
};
#else
void cmakeOption()
{
  std::cout << "cmakeOption2" << std::endl;
};
#endif

int main()
{
  cmakeOption();
  std::cout << "multiply:" << multiply(123, 212) << std::endl;
  std::cout << "power:" << power(10, 2) << std::endl;
  return 0;
}
