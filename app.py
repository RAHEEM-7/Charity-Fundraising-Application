from cmath import log
from logging import exception
# from flask import Flask, render_template,request,jsonify,session
# from flask_cors import CORS
# from numpy import empty
# from sqlalchemy import null
# from flask_sqlalchemy import SQLAlchemy
# import json
# import random
# from queue import Queue

from flask import Flask,render_template,request,redirect,jsonify,session
from flask_login import login_required, current_user, login_user, logout_user
# from Models import user,db,login
import random

app=Flask(__name__)
app.secret_key="hello"

# app.config["SECRET_KEY"] = '571ebf8e13ca209536c29be68d435c00'
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///fundraise.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

from Models import user,db,login,fundraise
# db = SQLAlchemy(app)
#mail=Mail(app)
#migrate = Migrate(app, db)



db.init_app(app)
login.init_app(app)
login.login_view = 'index'

@app.before_first_request
def create_table():
    db.create_all()

# @app.before_request
# def before_request():
#     if 'user'  in session and request.path == ' ':
#         print("Disconnecting")

@app.get("/")
def index():
    # session['user']=str(random.randint(1,100000))
    return render_template("index.html")

@app.route('/blogs')
@login_required
def blogs():
    return render_template('blog.html')

@app.post("/signup")
def signup():
    message={"flag":"1"}
    if current_user.is_authenticated:
        return redirect('/blogs')
    
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
                user_fullname=name, 
                user_email=email, 
                user_username=username, 
                user_phone=phone)
            user1.set_password(password)
            print(user1)
            db.session.add(user1)
            print("User added")
            db.session.commit()
            print("User committed")
            login_user(user1)
        except exception as ex:
            print("Something Went Wrong",ex)    
    # message={"flag":"1"}
    message['flag'] = 1
    return jsonify(message)


@app.post("/login")
def login():
    if current_user.is_authenticated:
        return jsonify({"flag":"1"})
     
    # if request.method == 'POST':
    print("Login")
    text=request.get_json()
    username = text['username']
    password = text['password']
    user1 = user.query.filter_by(user_username = username).first()
    if user1 is not None and user1.check_password(password):
        print("User logging")
        login_user(user1)
        print("User logged")
        return jsonify({"flag":"1"})
     
    return jsonify({"flag":"0"})

@app.route('/logout')
def logout():
    print("Logging out")
    logout_user()
    return redirect('/blogs')

@app.post('/forget')
def forget():
    print("Forget")
    text=request.get_json()
    username = text['username']
    password = text['password']
    user1 = user.query.filter_by(user_username = username).first()
    if user1 is not None:
        user1.set_password(password)
        db.session.commit()
        login_user(user1)
        return jsonify({"flag":"1"})
    return jsonify({"flag":"0"})


@app.route('/MyAccount')
@login_required
def MyAccount():
    print("My Account")
    return render_template('MyAccount.html')

@app.route('/howitworks')
def howitworks():
    print("How it work")
    return render_template('howitworks.html')

@app.route('/edit')
def edit():
    print("Edit")
    return render_template('edit.html')

@app.post('/edited')
def edit_post():
    print("Edit Post")
    text=request.get_json()
    name = text['name']
    email = text['email']
    # password = text['password']
    username = text['username']
    phone = text['phone']
    user_id = current_user.id
    print(user_id)
    user1 = user.query.filter_by(id = user_id).first()
    if user1 is not None:
        user1.user_fullname = name
        user1.user_email = email
        user1.user_phone = phone
        user1.user_username = username
        db.session.commit()
        return jsonify({"flag":"1"})
    return jsonify({"flag":"0"})

@app.post("/createfundraiser")
def create_fundraiser():
    message={"flag":"1"}
    print('test')
    text=request.get_json()
    type = text['type']
    name = text['name']
    days = text['days']
    amount = text['amount']
    description = text['description']
    phone = text['phone']
    id=current_user.id
    print(id)
    try: 
        fundraiser = fundraise(
            fundraise_type=type,
            fundraise_name=name, 
            fundraise_days=days, 
            fundraise_amount=amount, 
            fundraisePhone=phone,
            fundraise_description=description,
            fundraiseCreator=current_user.user_username
            )
        db.session.add(fundraiser)
        print("fundraiser added")
        db.session.commit()
        print("fundraiser committed")
    except exception as ex:
        print("Something Went Wrong")    
    message={"flag":"1"}
    message['flag'] = 1
    return jsonify(message)
# app.run(host='localhost', port=5000)
if __name__=="__main__":
    app.run(debug=True)