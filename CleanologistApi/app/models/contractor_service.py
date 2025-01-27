from ..extensions import db

class ContractorService(db.Model):
    __tablename__ = 'contractor_services'

    contractor_id = db.Column(db.BigInteger, db.ForeignKey('contractors.id'), primary_key=True)
    service_id = db.Column(db.BigInteger, db.ForeignKey('services.id'), primary_key=True)
    rate_per_hour = db.Column(db.Numeric(10, 2), nullable=False)