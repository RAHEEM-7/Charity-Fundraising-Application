"""Response Module"""
from Chatbot.Model.test_chatbot import predict_tag, call_response
from Chatbot.google.get_answers import get_answers_wr

def predict_response(text):
    """Fetches responses from model, wolframalphapi and google-search api"""
    tag = predict_tag(text)
    print('tag=',tag)
    if tag == "notunderstood":
        getresponse,link = get_answers_wr(text)
        if getresponse == "0" and link == "0":
            return "Sorry I could not fetch the answer"
        if link == "0":
            return getresponse
        return "This is what we found on the web: "+str(link)

    getresponse = call_response(tag)
    print('getresponse=',getresponse)
    return getresponse

def predict_intent(text):
    """Fetches intents of the corresponding input"""
    tag = predict_tag(text)
    return str(tag)
