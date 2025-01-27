from extensions import db
from datetime import datetime

class ScheduleDetail(db.Model):
    __tablename__ = 'schedule_details'

    id = db.Column(db.BigInteger, primary_key=True)
    schedule_id = db.Column(db.BigInteger, db.ForeignKey('weekly_schedules.id'))
    day_of_week = db.Column(db.Integer)
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)
    break_start = db.Column(db.Time)
    break_end = db.Column(db.Time)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)