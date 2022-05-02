import os
import sys
from flask import Flask, request, Blueprint, jsonify
import flask_sqlalchemy
import flask_praetorian
from flask_cors import CORS, cross_origin
import uuid
from PIL import Image, ImageFilter
import random

db = flask_sqlalchemy.SQLAlchemy()
guard = flask_praetorian.Praetorian()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text, unique=True)
    password = db.Column(db.Text)
    user_id = db.Column(db.Text, unique=True)

    @property
    def rolenames(self):
        try:
            return self.roles.split(',')
        except Exception:
            return []

    @classmethod
    def lookup(cls, username):
        return cls.query.filter_by(username=username).one_or_none()

    @classmethod
    def identify(cls, id):
        return cls.query.get(id)

    @property
    def identity(self):
        return self.id


app = Flask(__name__)
app.debug = True
app.config['UPLOAD_FOLDER'] = './uploads'
app.config['SECRET_KEY'] = 'top secret'
app.config['JWT_ACCESS_LIFESPAN'] = {'days': 30}
app.config['JWT_REFRESH_LIFESPAN'] = {'days': 30}
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.getcwd(), 'database.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
guard.init_app(app, User)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

with app.app_context():
    db.create_all()
    if db.session.query(User).filter_by(username='Shivam1').count() < 1:
        db.session.add(User(
          username='Shivam1',
          password=guard.hash_password('strongpassword'),
          user_id=str(uuid.uuid4()) 
        ))
    db.session.commit()

@app.route('/api/', strict_slashes=False)
@cross_origin()
def home():
    return {"Hello": "World"}, 200

@app.route('/api/login', methods=['POST'], strict_slashes=False)
@cross_origin()
def login():
    req = request.get_json(force=True)
    username = req.get('username', None)
    password = req.get('password', None)
    user = guard.authenticate(username, password)
    ret = {'access_token': guard.encode_jwt_token(user), 'user_id': user.user_id}
    return jsonify(ret), 200

@app.route('/api/register', methods=['POST'], strict_slashes=False)
@cross_origin()
def register():
    req = request.get_json(force=True)
    username = req.get('username', None)
    password = req.get('password', None)

    if db.session.query(User).filter_by(username=username).count() < 1:
        db.session.add(User(
          username=username,
          password=guard.hash_password(password),
          user_id=str(uuid.uuid4()) 
        ))
        db.session.commit()
    else:
        return jsonify({
            'status_code': '409', 
            'error': 'Conflict',
            'message': 'Username taken'
            }), 409
    
    user = guard.authenticate(username, password)
    ret = {'access_token': guard.encode_jwt_token(user), 'user_id': user.user_id}
    return jsonify(ret), 200

@app.route('/api/refresh', methods=['POST'], strict_slashes=False)
@cross_origin()
def refresh():
    print("refresh request")
    old_token = request.get_data()
    new_token = guard.refresh_jwt_token(old_token)
    ret = {'access_token': new_token}
    return ret, 200

@app.route('/upload/', methods=['POST'], strict_slashes=False)
@cross_origin()
def upload():
    try:
        user_id = request.headers.get('User-Id')
        file = request.files['file']
        print(file.filename)
        user_path = './uploads/{}'.format(user_id)
        location = '{}/{}.png'.format(user_id, uuid.uuid4())
        path = './uploads/{}'.format(location)
        if not os.path.exists(user_path):
            os.makedirs('./uploads/{}'.format(user_id))
        file.save(path)
        rotate_image(path)
        apply_transformation(path)
        return jsonify(handle_response(True)), 200
    except BaseException as ex:
        ex_type, ex_value, ex_traceback = sys.exc_info()
        return jsonify(handle_response(False, ex_type.__name__, ex_value)), 400 

@app.route('/gallery/', methods=['POST'], strict_slashes=False)
@cross_origin()
def get_images():
    arr = []
    req = request.get_json(force=True)
    user_id = req.get('user_id', None)

    if not user_id:
        return jsonify({
            'status_code': '401', 
            'error': 'Unauthorized',
            'message': 'Unable to recognize user. Please sign in to access your gallery!'
            })

    user_path = './uploads/{}'.format(user_id)
    if os.path.exists(user_path):
        arr = os.listdir(user_path)
    return jsonify({'images': arr[::-1]}), 200

if __name__ == '__main__':
    app.run(host='localhost', port=5000)

def rotate_image(path):
    img = Image.open(path)
    img = img.rotate(-90)
    img.save(path)

# for image processing we will add a watermark and some filters
def apply_transformation(path):
    # resize images and convert to RGBA
    img = Image.open(path)
    img = img.resize((500, 500)).convert("RGBA")
    watermark_image = Image.open('./uploads/apple.png')
    watermark_image = watermark_image.resize((75, 75)).convert("RGBA")

    # apply random details filter
    filters = [ImageFilter.BLUR, ImageFilter.CONTOUR, ImageFilter.EDGE_ENHANCE_MORE, ImageFilter.EMBOSS, ImageFilter.FIND_EDGES, ImageFilter.DETAIL, ImageFilter.SMOOTH_MORE]
    img = Image.open(path)
    r = random.randint(0, len(filters)-1)
    img = img.filter(filters[r])

    # apply watermark
    position = ((img.width//2, img.height//2))
    img.paste(watermark_image, position, watermark_image)
    img.save(path)


def handle_response(success, error_type=None, error_message=None):
    return {
        'success': success,
        'error': {
            'type': error_type,
            'message': error_message,
        }
    }