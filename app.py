from logging import exception
from flask import Flask, render_template,request,jsonify,session
from flask_cors import CORS
from numpy import empty
from sqlalchemy import null
from flask_sqlalchemy import SQLAlchemy
import json
import random
from queue import Queue

# from Model import test_chatbot

app=Flask(__name__)
app.secret_key="hello"

app.config["SECRET_KEY"] = '571ebf8e13ca209536c29be68d435c00'
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///fundraise.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
#mail=Mail(app)
#migrate = Migrate(app, db)

from Models import *

@app.before_request
def before_request():
    if 'user'  in session and request.path == ' ':
        print("Disconnecting")

@app.get("/")
def index():
    session['user']=str(random.randint(1,100000))
    return render_template("index.html")

@app.post("/signup")
def signup():
    text=request.get_json()
    name = text['name']
    email = text['email']
    password = text['password']
    username = text['username']
    phone = text['phone']
    exists = db.session.query(
        db.session.query(user).filter_by(user_username=username).exists()
    ).scalar() 
    if exists:
        print("User already exists")
        return jsonify({"flag": "0"})
    else :
        try: 
            user1 = user(
                #user_id=userid,
                user_fullname=name, 
                user_email=email, 
                user_password=password,
                user_username=username, 
                user_phone=phone)
            print(user1)
            db.session.add(user1)
            print("User added")
            db.session.commit()
            print("User committed")
        except exception as ex:
            print("Something Went Wrong",ex)    
    message={"flag":"1"}

    return jsonify(message)

if __name__=="__main__":
    app.run(debug=True)