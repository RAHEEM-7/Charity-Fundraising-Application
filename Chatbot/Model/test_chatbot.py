# importing modulabel_encodes"
"""Test chatbot"""
import json
import secrets
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
import tensorflow
from Chatbot.Preprocessing_Input import preprocessing, remove_stop_words
from Chatbot.Model import train_chatbot
# loading responses

with open("./Chatbot/Model/responses.json", "r",encoding='utf8') as res:
    responses=json.load(res)

# loading model
bot_model = tensorflow.keras.models.load_model("bot_model")
# importing training data
train = pd.read_csv("./Chatbot/Model/training_data.csv")

def call_response(tag):
    """Return response"""
    return secrets.choice(responses[tag])

# fitting TfIdfVectorizer with training data to preprocess inputs
# train["patterns"] = textnormalization.preprocessing(str(train["patterns"]))
patterns=[]
patterns_processed=[]
for pattern in train["patterns"]:
    patterns.append(pattern)
    pattern = preprocessing(pattern)
    pattern = remove_stop_words(pattern)
    patterns_processed.append(pattern)
train=train.replace(to_replace=patterns,value=patterns_processed)

vectorizer = TfidfVectorizer(ngram_range=(1,10))
vectorizer.fit(train["patterns"])

#fitting Label encoder with target variable(tags) for inverse transformation of predictions
label_encode = LabelEncoder()
label_encode.fit(train["tags"])

# transforming input and predicting intent
def predict_tag(test):
    """Predicting tags"""
    test = remove_stop_words(test)
    test_tfidf = vectorizer.transform([test]).toarray()
    predicted_prob = bot_model.predict(test_tfidf)
    max_val_ind=np.argmax(predicted_prob)
    if predicted_prob[0][max_val_ind] > 0.75:
        encoded_label = [np.argmax(predicted_prob)]
        predicted_tag = label_encode.inverse_transform(encoded_label)[0]
        return predicted_tag
    return "notunderstood"
#print("Welcome!")
#while True:
   #text = input()
   #tag = predict_tag(text)
   #print(tag)
   #response = random.choice(responses[tag])
   #print('Bot:',response)
