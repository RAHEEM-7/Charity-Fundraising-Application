import spacy
from Chatbot.prediction import predict_intent
from Chatbot.webscrape.getStock import fetch_stock
nlp = spacy.load('en_core_web_lg')



def stockprice(text):
    """Checks if user asked for stock price"""
    if predict_intent(text) == "stock_price":
        return True
    return False

def stockprice_helper(text):
    """Fetches stock price of the company"""
    doc = nlp(text)
    if doc.ents:
        for ent in doc.ents:
            if ent.label_ == "ORG":
                return ["The share price of "+ent.text+" is: USD"+fetch_stock(ent.text)]
    return ["Could not fetch share price"]


def news(text):
    """Checks if user asked for news"""
    if predict_intent(text) == "get_news":
        return True
    return False