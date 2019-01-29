#include <iostream>
using namespace std;

#include <iomanip>
using std::setw;

void printArray()
{
  // 一个带有 5 行 2 列的数组
  int a[5][2] = {{0, 0}, {1, 2}, {2, 4}, {3, 6}, {4, 8}};

  // 输出数组中每个元素的值
  for (int i = 0; i < 5; i++)
    for (int j = 0; j < 2; j++)
    {
      cout << "a[" << i << "][" << j << "]: ";
      cout << a[i][j] << endl;
    }

  char greeting[6] = {'H', 'e', 'l', 'l', 'o', '\0'};
  char greeting2[] = "Hello";

  cout << "Greeting message: ";
  cout << greeting << endl;
  std::
          cout
      << greeting2 << endl;
}

void printStr()
{
  char str1[11] = "Hello";
  char str2[11] = "World";
  char str3[12];
  int len;

  // 复制 str1 到 str3
  strcpy(str3, str1);
  cout << "strcpy( str3, str1) : " << str3 << endl;
  // 连接后，str1 的总长度
  len = strlen(str1);
  cout << "strlen(str1) : " << len << endl;

  // 连接 str1 和 str2
  strcat(str1, str2);
  cout << "strcat( str1, str2): " << str1 << endl;

  // 连接后，str1 的总长度
  len = strlen(str1);
  cout << "strlen(str1) : " << len << endl;
}

int main()
{
  int n[10]; // n 是一个包含 10 个整数的数组

  // 初始化数组元素
  for (int i = 0; i < 10; i++)
  {
    n[i] = i + 100; // 设置元素 i 为 i + 100
  }
  cout << "Element" << setw(13) << "Value" << endl;

  // 输出数组中每个元素的值
  for (int j = 0; j < 10; j++)
  {
    cout << setw(7) << j << setw(13) << n[j] << endl;
  }
  printArray();
  printStr();
  return 0;
}
