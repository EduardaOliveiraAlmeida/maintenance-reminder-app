from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Configuração do banco de dados (exemplo usando SQLite)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///maintenance.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Instanciar o SQLAlchemy
db = SQLAlchemy(app)


# Modelo de Equipamento
class Equipment(db.Model):
    __tablename__ = 'equipment'
    machine_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(50), nullable=False)


# Modelo de Manutencao
class Maintenance(db.Model):
    __tablename__ = 'maintenance'
    execution_id = db.Column(db.Integer, primary_key=True)
    machine_id = db.Column(db.Integer, db.ForeignKey('equipment.machine_id'), nullable=False)
    maintenance_date = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(20), nullable=False)
    equipment = db.relationship('equipment', backref=db.backref('maintenance', lazy=True))


# Inicializar o banco de dados e criar as tabelas
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
