from ..extensions import db
from datetime import datetime

class ScheduleException(db.Model):
    __tablename__ = 'schedule_exceptions'

    id = db.Column(db.BigInteger, primary_key=True)
    contractor_id = db.Column(db.BigInteger, db.ForeignKey('contractors.id'))
    exception_date = db.Column(db.Date, nullable=False)
    exception_type = db.Column(db.String(20), nullable=False)
    start_time = db.Column(db.Time)
    end_time = db.Column(db.Time)
    is_full_day = db.Column(db.Boolean, default=True)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)