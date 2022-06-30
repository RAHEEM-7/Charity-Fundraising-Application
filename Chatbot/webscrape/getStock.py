"""Importing bs4 and requests for webScraping"""
from bs4 import BeautifulSoup
import requests

def html_parsing(html):
    soup=BeautifulSoup(html,'lxml')
    stock_price=soup.find('div',class_='BNeawe iBp4i AP7Wnd').text
    return stock_price


def fetch_stock(org):
    """Function to fetch current stock price of an organisation through Web Scraping"""
    org.replace(" ","+")
    url="https://www.google.com/search?client=firefox-b-d&q=+"+org+"+stock+price"
    headers = ({'User-Agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36/ \
            (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
            'Accept-Language': 'en-US, en;q=0.5'})
    html = requests.get(url,headers=headers).text
    stock_price=html_parsing(html)
    print(stock_price)
    return stock_price


if __name__=="__main__":
    print(type(fetch_stock("IBM")))
