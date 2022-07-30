"""Application Flow Architecture"""
# from auth import validate_ssn_number, validate_account_number, verify_otp
# from check import iscustomer
# from information_helper import extract_creditscore, extract_downpayment, 
# extract_loan_amount, extract_loan_duration, extract_location
# from start import start
# from final import customername, phone
# from repeat import repeat_last_statement,repeat_question
# from extra_functionalities import account_balance,account_balance_helper, 
# stockprice, stockprice_helper, news, connect_to_hmc
# from Models import Bank_Customer_Data
from Chatbot.prediction import predict_response, predict_intent
from Chatbot.newfeatures import stockprice, stockprice_helper, news
from Chatbot.webscrape.getNews import get_news
from Chatbot.Preprocessing_Input import preprocessing, remove_stop_words

# from Mail_to_HMC import mail
# from webscrape.getNews import get_news
# from webscrape.getCity import get_city
# from VideoCall.zoomlink import create_meeting


def get_prediction_first (text):
    if stockprice(text):
        answer = stockprice_helper(text)
        return [answer]

    if news(text):
        answer = get_news()
        return [answer]
    print("text = ", text)
    getresponse = predict_response(text)
    print("getresponse = ", getresponse)
    return [getresponse]
    # return [text]

