from extensions import db
from datetime import datetime

class Contractor(db.Model):
    __tablename__ = 'contractors'

    id = db.Column(db.BigInteger, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    status = db.Column(db.String(20))
    schedule_submission_day = db.Column(db.Integer, default=4)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    services = db.relationship('Service', secondary='contractor_services')
    weekly_schedules = db.relationship('WeeklySchedule', backref='contractor')
    exceptions = db.relationship('ScheduleException', backref='contractor')