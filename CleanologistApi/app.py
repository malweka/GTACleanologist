from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from datetime import datetime
import uuid

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cleanologist.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from models.contact import Contact
from models.service import Service
from models.appointment import Appointment

def init_services():
    default_services = [
        Service(id=100, service_name='deep-cleaning', service_description='Deep Cleaning'),
        Service(id=101, service_name='home-improvements', service_description='Home Improvements'),
        Service(id=102, service_name='house-cleaning', service_description='House Cleaning')
    ]
    
    for service in default_services:
        if not Service.query.get(service.id):
            db.session.add(service)
    db.session.commit()

@app.route('/api/contacts', methods=['POST'])
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
    
    appointment = Appointment(
        appointment_number=str(uuid.uuid4())[:20],
        service_id=data['service_requested'],
        contact_id=contact.id,
        service_date=datetime.fromisoformat(data['appointment_date_time']),
        service_notes=data.get('service_notes', '')
    )
    
    db.session.add(appointment)
    db.session.commit()
    
    return jsonify({'message': 'Contact and appointment created successfully'}), 201

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        init_services()
    app.run(debug=True)