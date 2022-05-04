from webapp.config import db,ma

class Color(db.Model):
    __tablename__ = 'color'
    id = db.Column(db.Integer, primary_key = True, nullable = False, autoincrement= True)
    name = db.Column(db.String(20),unique=True) 
    embanew = db.Column(db.String(20))
    embamixed = db.Column(db.String(20))
    simcanew = db.Column(db.String(20))
    simcamixed = db.Column(db.String(20))
    totalnew = db.Column(db.Float(20))
    totalmixed = db.Column(db.Float(20))

class ColorSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Color
    id = ma.auto_field()
    name= ma.auto_field()
    embanew = ma.auto_field()
    embamixed = ma.auto_field()
    simcanew = ma.auto_field()
    simcamixed = ma.auto_field()

db.create_all()
color_schema = ColorSchema()