import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__,static_url_path='/static')
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///farben.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = '73dc20ef805c6e1844f86051ff59da8f28b506c13378eceee51aa433a873173c'
db = SQLAlchemy(app)
ma = Marshmallow(app)
from webapp import routes
