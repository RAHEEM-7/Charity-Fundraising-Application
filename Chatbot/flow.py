"""Application Flow Architecture"""
# from auth import validate_ssn_number, validate_account_number, verify_otp
# from check import iscustomer
# from information_helper import extract_creditscore, extract_downpayment, \
# extract_loan_amount, extract_loan_duration, extract_location
# from start import start
# from final import customername, phone
# from repeat import repeat_last_statement,repeat_question
# from extra_functionalities import account_balance,account_balance_helper, \
# stockprice, stockprice_helper, news, connect_to_hmc
# from Models import Bank_Customer_Data
from Chatbot.prediction import predict_response, predict_intent
# from Mail_to_HMC import mail
# from webscrape.getNews import get_news
# from webscrape.getCity import get_city
# from VideoCall.zoomlink import create_meeting


def get_prediction_first(text,idx,chance,chat_id,cache,fail,keys):
    getresponse = predict_response(text)
    answer = [getresponse, 0]
    return [answer[0]]
