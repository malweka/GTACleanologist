from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, date, time
from enum import Enum
from ..extensions import db

class ScheduleStatus(Enum):
    DRAFT = 'draft'
    SUBMITTED = 'submitted'
    APPROVED = 'approved'
    ACTIVE = 'active'
    COMPLETED = 'completed'

class SlotStatus(Enum):
    AVAILABLE = 'available'
    BOOKED = 'booked'
    BLOCKED = 'blocked'
    EXPIRED = 'expired'

class ExceptionType(Enum):
    SICK_DAY = 'sick_day'
    TIME_OFF = 'time_off'
    EMERGENCY = 'emergency'
    OTHER = 'other'

class Service(db.Model):
    __tablename__ = 'services'
    
    id = db.Column(db.BigInteger, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    duration_minutes = db.Column(db.Integer, nullable=False)
    base_price = db.Column(db.Numeric(10, 2), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

