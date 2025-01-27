from extensions import db
from datetime import datetime, timedelta

class WeeklySchedule(db.Model):
    __tablename__ = 'weekly_schedules'

    id = db.Column(db.BigInteger, primary_key=True)
    contractor_id = db.Column(db.BigInteger, db.ForeignKey('contractors.id'))
    week_start_date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(20), nullable=False)
    submission_date = db.Column(db.DateTime)
    approval_date = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    details = db.relationship('ScheduleDetail', backref='schedule', cascade='all, delete-orphan')
    time_slots = db.relationship('TimeSlot', backref='schedule')

    @property
    def week_end_date(self):
        return self.week_start_date + timedelta(days=6)

    def get_available_slots(self, service_id=None, date=None):
        query = TimeSlot.query.filter_by(
            schedule_id=self.id,
            status='available'
        )

        if service_id:
            query = query.filter_by(service_id=service_id)
        if date:
            query = query.filter_by(slot_date=date)

        return query.order_by(TimeSlot.slot_date, TimeSlot.start_time).all()
    
class TimeSlot(db.Model):
    __tablename__ = 'time_slots'

    id = db.Column(db.BigInteger, primary_key=True)
    contractor_id = db.Column(db.BigInteger, db.ForeignKey('contractors.id'))
    service_id = db.Column(db.BigInteger, db.ForeignKey('services.id'))
    schedule_id = db.Column(db.BigInteger, db.ForeignKey('weekly_schedules.id'))
    slot_date = db.Column(db.Date, nullable=False)
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)
    is_available = db.Column(db.Boolean, default=True)
    status = db.Column(db.String(20), nullable=False, default='available')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    service = db.relationship('Service')
    contractor = db.relationship('Contractor')

    @classmethod
    def generate_slots(cls, schedule_id, service_id, slot_duration):
        schedule = WeeklySchedule.query.get(schedule_id)
        if not schedule:
            raise ValueError("Schedule not found")

        slots = []
        current_date = schedule.week_start_date

        while current_date <= schedule.week_end_date:
            day_schedule = next(
                (detail for detail in schedule.details
                 if detail.day_of_week == current_date.weekday()),
                None
            )

            if day_schedule:
                exception = ScheduleException.query.filter_by(
                    contractor_id=schedule.contractor_id,
                    exception_date=current_date
                ).first()

                if not exception:
                    current_time = datetime.combine(current_date, day_schedule.start_time)
                    end_time = datetime.combine(current_date, day_schedule.end_time)

                    while current_time + timedelta(minutes=slot_duration) <= end_time:
                        if (day_schedule.break_start and
                            current_time.time() < day_schedule.break_end and
                            (current_time + timedelta(minutes=slot_duration)).time() > day_schedule.break_start):
                            current_time = datetime.combine(current_date, day_schedule.break_end)
                            continue

                        slot = cls(
                            contractor_id=schedule.contractor_id,
                            service_id=service_id,
                            schedule_id=schedule_id,
                            slot_date=current_date,
                            start_time=current_time.time(),
                            end_time=(current_time + timedelta(minutes=slot_duration)).time(),
                            status='available'
                        )
                        slots.append(slot)
                        current_time += timedelta(minutes=slot_duration)

            current_date += timedelta(days=1)

        return slots