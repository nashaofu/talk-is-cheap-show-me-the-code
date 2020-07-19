import requests
from lxml import etree
import xlwt
from urllib import parse


def page_url(num):
    url_list = []
    # url_list.append('http://www.zjvtit.edu.cn/xwzx/jyxw.htm')
    for i in range(99, 99-num + 1, -1):
        url = 'http://www.zjvtit.edu.cn/xwzx/jyxw/'+str(i)+'.htm'
        url_list.append(url)
    return url_list


def page_new_url(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36'
    }
    response = requests.get(url, headers=headers, timeout=5)
    response.encoding = 'utf-8'
    html = response.text
    root = etree.HTML(html)
    url_list = root.xpath(
        '//*[@id="wrapper"]/div[3]/div/div[2]/div/div[2]/div[2]/ul/li[]/a/@href')  # 爬内容的url

    return url_list


def spider(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36'
    }
    req_url = parse.urljoin('http://www.zjvtit.edu.cn/xwzx/', url)
    response = requests.get(req_url, headers=headers, timeout=5)
    response.encoding = 'utf-8'
    html = response.text
    root = etree.HTML(html)

    # 标题
    title = root.xpath(
        '//*[@id="wrapper"]/div[3]/div/div[2]/div/div[2]/div[2]/form/div[1]/text()')
    title = ''.join(title).replace('\xa0', '')

    # 作者时间
    time = root.xpath(
        '//*[@id="wrapper"]/div[3]/div/div[2]/div/div[2]/div[2]/form/div[2]/text()')
    time = ''.join(time).replace('\xa0', '')

    content = root.xpath(
        '//*[@id="wrapper"]/div[3]/div/div[2]/div/div[2]/div[2]/form/div[3]//text()')
    content = ''.join(content)  # replace 代替 把什么替代成什么
    content = content.replace('\r\n', '').replace(
        '\t\n', '').replace('\n', '').replace('\xa0', '')
    item = [title, time, req_url, content]
    return item


def wirte_page(list):
    with open('hzzy.txt', 'w+', encoding='utf-8') as file:
        for i in list:
            file.write(str(i) + '\n')
        file.close()


def save_excel(list):
    book = xlwt.Workbook(encoding='utf-8', style_compression=0)
    sheet = book.add_sheet('hzzy')
    col = ("标题", "发布日期", "url", "内容")
    for i in range(4):
        sheet.write(0, i, col[i])
    for i in range(len(list)):
        data = list[i]
        sheet.write(i + 1, 0, data[0])
        sheet.write(i + 1, 1, data[1])
        sheet.write(i + 1, 2, data[2])
        sheet.write(i + 1, 3, data[3])

    book.save('hzzy.xls')


if __name__ == '__main__':
    list = []
    num = int(input("请输入要爬取的页数:"))
    page_urls = page_url(num)
    print(page_urls)
    for page in page_urls:
        urls = page_new_url(page)
        print(len(urls))
    #     # for href in urls:
    #     #     list.append(spider(href))

    # wirte_page(list)
    # save_excel(list)
