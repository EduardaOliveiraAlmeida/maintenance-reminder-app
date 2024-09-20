from flask import request, jsonify
from main import app, db
from models import Maintenance, Equipment
from datetime import datetime


@app.route('/manutencoes', methods=['GET'])
def get_manutencoes():
    maintenance = Maintenance.query.all()
    return jsonify([{
        'execution_id': m.execution_id,
        'equipment': m.equipment.name,
        'maintenance_date': m.maintenance_date,
        'status': m.status
    } for m in maintenance])


@app.route('/manutencoes', methods=['POST'])
def create_manutencao():
    data = request.json
    new_maintenance = Maintenance(
        machine_id=data['machine_id'],
        maintenance_date=datetime.strptime(data['maintenance_date'], '%Y-%m-%d'),
        status=data['status']
    )
    db.session.add(new_maintenance)
    db.session.commit()
    return jsonify({'message': 'Manutenção registrada com sucesso'}), 201


@app.route('/manutencoes/<int:id>', methods=['PUT'])
def update_manutencao(machine_id):
    maintenance = Maintenance.query.get_or_404(machine_id)
    data = request.json
    maintenance.status = data['status']
    db.session.commit()
    return jsonify({'message': 'Status atualizado com sucesso'})
