from sqlalchemy import null
from app import db
import datetime

class fundraise(db.Model):
  fundraise_id  = db.Column(db.Integer, primary_key=True)
  fundraise_name = db.Column(db.String(255), nullable=False)
  fundraise_type = db.Column(db.String(255), nullable=False) 
  fundraise_days = db.Column(db.Integer, nullable=False)
  fundraise_amount = db.Column(db.Integer, nullable=False)
  fundraise_description = db.Column(db.String(255), nullable=False)
  fundraisePhone = db.Column(db.String(255), nullable=False)
  fundraiseImage = db.Column(db.String(255), default=None) # doubt
  fundraiseApproval = db.Column(db.String(1), default='0') # doubt
  fundraiseExpiry = db.Column(db.String(1), default='1') # doubt
  fundraiseCreator = db.Column(db.String(255), nullable=False) # doubt 
  fundraise_reg_date = db.Column(db.TIMESTAMP, nullable=False, default=datetime.datetime.now()) # doubt

class user(db.Model):
  user_id  = db.Column(db.Integer, primary_key=True)
  user_fullname = db.Column(db.String(255), nullable=False)
  user_username = db.Column(db.String(255), nullable=False)
  user_email = db.Column(db.String(255), nullable=False)
  user_password = db.Column(db.String(255), nullable=False)
  user_phone = db.Column(db.String(255), nullable=False)
  vkey = db.Column(db.String(45), default=None)
  verified = db.Column(db.String(1), default='0')
  user_reg_date = db.Column(db.TIMESTAMP, nullable=False)

# db.create_all()