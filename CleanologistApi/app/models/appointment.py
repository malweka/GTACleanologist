from ..extensions import db

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    appointment_number = db.Column(db.String(20), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('service.id'), nullable=False)
    contact_id = db.Column(db.Integer, db.ForeignKey('contact.id'), nullable=False)
    service_date = db.Column(db.DateTime, nullable=False)
    service_notes = db.Column(db.String(2000))