from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from services import DbInitializer
from models import Contact, Service
from extensions import db
import os

load_dotenv()
app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
db.init_app(app)
initializer = DbInitializer(db, app)

CORS(app, resources={
        r"/api/*": {
            "origins": "*",  # change later
            "methods": ["GET", "POST", "OPTIONS"],
            "allow_headers": ["Content-Type"]
        }
    })

@app.route('/api/contact-us', methods=['POST', 'OPTIONS'])
def contact_us():
   if request.method == "OPTIONS":
        return jsonify({}), 200
   
   data = request.get_json()
   
   required_fields = ['contact_name', 'contact_email', 'contact_telephone', 'message']
   for field in required_fields:
       if not data.get(field):
           return jsonify({'error': f'Missing required field: {field}'}), 400
           
   return jsonify({'message': 'Contact received successfully'}), 200

@app.route('/api/appointments', methods=['POST'])
def create_contact():
    data = request.get_json()
    
    service = Service.query.get(data['service_requested'])
    if not service:
        return jsonify({'error': 'Invalid service ID'}), 400
        
    contact = Contact(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        phone=data['phone'],
        address=data['address'],
        city=data['city'],
        province=data['province'],
        postal_code=data['postal_code']
    )
    
    db.session.add(contact)
    db.session.flush()
    
    # appointment = Appointment(
    #     appointment_number=str(uuid.uuid4())[:20],
    #     service_id=data['service_requested'],
    #     contact_id=contact.id,
    #     service_date=datetime.fromisoformat(data['appointment_date_time']),
    #     service_notes=data.get('service_notes', '')
    # )
    
    # db.session.add(appointment)
    db.session.commit()
    
    return jsonify({'message': 'Contact and appointment created successfully'}), 201

if __name__ == '__main__' or __name__ == 'app':
    with app.app_context():
        #db.create_all()
        initializer.init_db()
        
    app.run(debug=True, port=5050)