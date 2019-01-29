#include <stdio.h>
#include <stdlib.h>
#include <atlimage.h>

int main()
{
  int width = 800;  // 图片宽度
  int heigth = 480; // 图片高度
  int xpos = 0;     // 起始x坐标
  int ypos = 0;     // 起始y坐标

  // 获取窗口的设备上下文（Device Contexts）
  HDC hdcWindow = GetDC(NULL); // 要截图的窗口句柄，为空则全屏
  // 获取设备相关信息的尺寸大小
  int nBitPerPixel = GetDeviceCaps(hdcWindow, BITSPIXEL);
  CImage image;
  // 创建图像，设置宽高，像素
  image.Create(width, heigth, nBitPerPixel);
  // 对指定的源设备环境区域中的像素进行位块（bit_block）转换
  BitBlt(
      image.GetDC(), // 保存到的目标 图片对象 上下文
      xpos, ypos,    // 起始 x, y 坐标
      width, heigth, // 截图宽高
      hdcWindow,     // 截取对象的 上下文句柄
      0, 0,          // 指定源矩形区域左上角的 X, y 逻辑坐标
      SRCCOPY);

  // 释放 DC句柄
  ReleaseDC(NULL, hdcWindow);
  // 释放图片上下文
  image.ReleaseDC();
  // 将图片以 BMP 的格式保存到 F:\ScreenShot.bmp
  image.Save("F:\ScreenShot.bmp", Gdiplus::ImageFormatBMP);

  printf("截图已保存n");

  system("pause");
  return 0;
}
