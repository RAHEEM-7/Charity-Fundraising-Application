'''Google Search library and Wolframalpha api to answer
    queries not understood by bot.
    '''
import requests
from googlesearch import search
import wolframalpha

def google_search_answer(query):
    '''Google Search library takes in the query
        and returns the link associated.
    '''
    search_result_list=[]
    for j in search(query, tld="co.in", num=10, stop=10, pause=2):
        if "wikipedia" in j:
            search_result_list.append(j)
    if len(search_result_list)==0:
        search_result_list=list(search(query, tld="co.in", num=10, stop=10, pause=2))
    page=requests.get(search_result_list[0])
    if page.status_code==200:
        get_text=requests.get(
            "https://api.wolframalpha.com/v1/result?appid=VYY6WH-Q452YYLEQ6&i="+query
            )
        return "This is what we found on the Web.\n"+ get_text.text+ "\nFeel free to follow this link:",search_result_list[0]
    return "0","0"

def get_answers_wr(ques):
    '''Wolframalpha library takes in the query
        and returns the data associated.
    '''
    try:
        if ques == ' raise ConnectionError ':
            raise(ConnectionError)
        app_id = 'VYY6WH-Q452YYLEQ6'
        client = wolframalpha.Client(app_id)
        res = client.query(ques)
        answer = next(res.results).text
        if answer=="(data not available)":
            google_answer,link = google_search_answer(ques)
            if google_answer!="0":
                return google_answer,link
            return "Sorry! I didn't get you.","0"
        return "This is what we found on the Web.\n" + answer,"0"
    except ConnectionError: # pylint: disable=bare-except
        google_answer,link = google_search_answer(ques)
        if google_answer!="0":
            return google_answer,link
        return "Sorry! I didn't get you.","0"
