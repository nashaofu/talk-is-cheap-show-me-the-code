import  requests
from lxml import etree
import xlwt

def page_url(num):
    url_list=[]
    for i in range(1, num+1):
        url ='https://www.zjjy.com.cn/20/list'+str(i)+'.htm'
        url_list.append(url)
    return  url_list

def page_new_url(url):
    url_list=[]
    url_base='http://www.zjjy.com.cn/' ###
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36'}
    response=requests.get(url,headers=headers,timeout=5)
    response.encoding='utf-8'
    html=response.text
    root=etree.HTML(html)
    url_l=root.xpath('//span[@class="list_bt"]/a/@href')#爬内容的url
    for i  in url_l:
        if i.startswith('../../'):
            url_a=url_base+i.lstrip('../../')#把../../去掉
        else :
            url_a=url_base+i.lstrip('../')#把../去掉
        url_list.append(url_a)

    return url_list
def spider(url):
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36'}
    response=requests.get(url,headers=headers,timeout=5)
    response.encoding='utf-8'
    html=response.text
    root=etree.HTML(html)
    item={}
    title=root.xpath('//h1[@class="arti-title"]/text()')##标题
    title=''.join(title)
    time=root.xpath('//span[@class="arti-update"]/text()')##作者时间
    content=root.xpath('///html/body/div[2]/div/div/div/div[2]//text()')##正文
    title=''.join(title)
    time=''.join(time).split("\xa0")[0]#split分类 以（）里的内容为分割点 []选第几个
    content=''.join(content).replace('\r\n','').replace('\xa0','')#replace 代替 把什么替代成什么
    item = [title, time, content]
    return item
def wirte_page(list):
    with open('zjjy.txt', 'w+', encoding='utf-8') as file:###
        for i in list:
            file.write(str(i) + '\n')
        file.close()
def save_excel(list):
    book = xlwt.Workbook(encoding='utf-8', style_compression=0)
    sheet = book.add_sheet('zjjy')###
    col = ("标题", "时间", "内容")###
    for i in range(3):
        sheet.write(0, i, col[i])
    for i in range(len(list)):
        data = list[i]
        sheet.write(i + 1, 0, data[0])##
        sheet.write(i + 1, 1, data[1])
        sheet.write(i + 1, 2, data[2])


    book.save('zjjy.xls')###
if __name__=='__main__':
    list=[]
    num=int(input("请输入要爬取的页数:"))
    print(page_url(num))

    for i in  page_url(num):
        for j in page_new_url(i):
            print(j)
            list.append(spider(j))
    wirte_page(list)
    save_excel(list)##excal
