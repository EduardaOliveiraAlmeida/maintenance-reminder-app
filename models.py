from main import db


class Equipment(db.Model):
    machine_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(50), nullable=False)


class Maintenance(db.Model):
    execution_id = db.Column(db.Integer, primary_key=True)
    machine_id = db.Column(db.Integer, db.ForeignKey('Equipment.machine_id'), nullable=False)
    maintenance_date = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(20), nullable=False)
    equipment = db.relationship('Equipment', backref=db.backref('maintenance', lazy=True))
