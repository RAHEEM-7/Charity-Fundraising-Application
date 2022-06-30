"""Importing request for making an api call and expiringDict to work as cache"""
import requests
from expiringdict import ExpiringDict

#Making a cache to store the news for fast withdrawl
server_cache = ExpiringDict(max_len=10, max_age_seconds=3600, items=None)


def get_news():
    """Function to fetch the latest top 3 headlines using an api"""
    url = "https://api.apilayer.com/financelayer/news?date=today"
    headers = {
              "apikey": "gHsPiPTFgksaDWc0SJQKAJDslqwaL7Fe"
              }
    news=server_cache.get('nws', default='Expired')
    stmt=""
    if news=='Expired':
        response = requests.request("GET", url, headers=headers)
        news = response.json()
        headlines = []
        for headline in range(0, 3):
            headlines.append(news['data'][headline]['title'])
        stmt='Top 3 News for today\n'+headlines[0]+'\n'+headlines[1]+'\n'+headlines[2]+'\n'
        server_cache['nws']=stmt
    else:
        stmt=server_cache.get('nws', default='News is not available')

    return stmt

if __name__=="__main__":
    print(get_news())
