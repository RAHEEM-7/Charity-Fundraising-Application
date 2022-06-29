#importing modulabel_encodes
"""Training Model"""
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras import Sequential
from tensorflow.keras import layers
import tensorflow
from Chatbot.Preprocessing_Input import preprocessing, remove_stop_words
# from sklearn.model_selection import train_test_split
# read training data from csv file
train= pd.read_csv("./Chatbot/Model/training_data.csv")

#preprocess training data
patterns=[]
patterns_processed=[]
for pattern in train["patterns"]:
    patterns.append(pattern)
    pattern= preprocessing(pattern)
    pattern = remove_stop_words(pattern)
    patterns_processed.append(pattern)
train=train.replace(to_replace=patterns,value=patterns_processed)
# print(train["patterns"])

vectorizer = TfidfVectorizer(ngram_range=(1,10))
train_tfidf_patterns = vectorizer.fit_transform(train["patterns"]).toarray()

# preprocessing target variable(tags)
label_encode = LabelEncoder()
train_tags_encoded = pd.DataFrame({"tags":label_encode.fit_transform(train["tags"])})
train_tags_encoded = pd.get_dummies(train_tags_encoded["tags"]).to_numpy()

y = train_tags_encoded
X = train_tfidf_patterns
# X_train, X_test, Y_train, Y_test = train_test_split(X, y,test_size = 0.2, random_state = 0)
# creating DNN
bot_model = Sequential()
bot_model.add(layers.Dense(512, input_shape=(len(X[0]),)))
#print('train length:',len(train_tfidf[0]))
bot_model.add(layers.Dropout(0.2))
bot_model.add(layers.Dense(256))
bot_model.add(layers.Dropout(0.2))
bot_model.add(layers.Dense(128))
bot_model.add(layers.Dropout(0.2))
bot_model.add(layers.Dense(128))
bot_model.add(layers.Dropout(0.15))
bot_model.add(layers.Dense(len(y[0]), activation="softmax"))
bot_model.compile(optimizer="rmsprop", loss="categorical_crossentropy", metrics=["accuracy"])

# fitting DNN
#bot_model.fit(X_train,Y_train,validation_data=(X_test,Y_test), epochs=200, batch_size=16)
bot_model.fit(X,y, epochs=5, batch_size=32)

# saving model filabel_encode
tensorflow.keras.models.save_model(bot_model, "bot_model")
