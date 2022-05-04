from flask import render_template
from flask.helpers import send_file
from webapp.config import app, db
from webapp.models import  Color, ColorSchema, color_schema
from flask import request, jsonify

@app.route('/', methods= ['GET'])
@app.route('/static/', methods = ['GET'])
def home():
  return send_file('templates/index.html')

@app.route('/api/searchcolor/<color>', methods = ['GET'])
def culori(color):
    print(color)
    x = db.session.query(Color).filter(Color.name == color).first()
    if x:
         return color_schema.dump(x), 200        
    else:
       return 'Farbe nicht gefundet', 404

@app.route('/api/addcolor', methods = ['POST'])
def addcolor():
    z = ColorSchema().load(request.get_json())
    new_color = Color(**z) 
    x = db.session.query(Color).filter(Color.name == new_color.name).first()
    if x :
        return 'Farbe existiert bereits', 422
    else:
        db.session.add(new_color)
        db.session.commit()
        return color_schema.dump(new_color), 201

@app.route('/api/update', methods = ['PUT'])
def update():
    z = request.get_json()
    color = db.session.query(Color).filter(Color.name == z['name']).first()
    color.embanew = z['embanew']
    color.embamixed = z['embamixed']
    color.simcamixed = z['simcamixed']
    color.simcanew = z['simcanew']
    color.totalnew = float(color.embanew)+float(color.simcanew)
    color.totalmixed = float(color.embamixed)+float(color.simcamixed)
    db.session.commit()
    return color_schema.dump(color), 200

@app.route('/api/delete/<name>', methods=['DELETE'])
def delete(name):
    x = db.session.query(Color).filter(Color.name == name).first()
    db.session.delete(x)
    db.session.commit()
    return 'Farbe gelosched', 204

@app.route('/api/colors', methods=['GET'])
def colors():
    x= db.session.query(Color).order_by(Color.totalnew,Color.totalmixed).all()
    return render_template('table.html',x=x)

@app.route('/api/changename/<oldname>/<newname>', methods=['PUT'])
def changename(oldname,newname):
    x= db.session.query(Color).filter(Color.name == oldname).first()
    z= db.session.query(Color).filter( Color.name == newname).first()
    if z:
        return 'Farbe name muss einzigartig sein!', 422
    else:
        x.name = newname
        db.session.commit()
        return color_schema.dump(x) , 200

@app.route('/api/colornames', methods = ['GET'])
def colornames():
    x = db.session.query(Color).all()
    z = []
    for j in x:
        z = z + [j.name]
    return jsonify(z) , 200
