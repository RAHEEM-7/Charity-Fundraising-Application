# from sqlalchemy import null
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager
import datetime

login = LoginManager()
db = SQLAlchemy()

class fundraise(db.Model):
  fundraise_id  = db.Column(db.Integer, primary_key=True)
  fundraise_name = db.Column(db.String(255), nullable=False)
  fundraise_type = db.Column(db.String(255), nullable=False) 
  fundraise_days = db.Column(db.Integer, nullable=False)
  fundraise_amount = db.Column(db.Integer, nullable=False)
  fundraise_description = db.Column(db.String(255), nullable=False)
  fundraisePhone = db.Column(db.String(255), nullable=False)
  fundraiseImage = db.Column(db.String(255), default=None)
  fundraiseApproval = db.Column(db.String(1), default='0') 
  fundraiseExpiry = db.Column(db.String(1), default='1') 
  fundraiseCreator = db.Column(db.String(255), nullable=False) 
  fundraise_reg_date = db.Column(db.TIMESTAMP, nullable=False, default=datetime.datetime.now()) 

class user(UserMixin,db.Model):
  id  = db.Column(db.Integer, primary_key=True)
  user_fullname = db.Column(db.String(255), nullable=False)
  user_username = db.Column(db.String(255), nullable=False)
  user_email = db.Column(db.String(255), nullable=False)
  user_password_hash = db.Column(db.String())
  user_phone = db.Column(db.String(255), nullable=False)
  user_reg_date = db.Column(db.TIMESTAMP, nullable=False,default=datetime.datetime.now())

  def set_password(self,password):
        self.user_password_hash = generate_password_hash(password)
     
  def check_password(self,password):
      return check_password_hash(self.user_password_hash,password)

@login.user_loader
def load_user(id):
    return user.query.get(int(id))
