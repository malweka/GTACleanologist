from flask import Blueprint, jsonify, request
from ..models import Contractor
from ..services import ContractorService
from ..extensions import db

bp = Blueprint('contractors', __name__)
contractor_service = ContractorService(db)

@bp.route('/contractors', methods=['GET'])
def list_contractors():
    first = request.args.get('first', 0, type=int)
    max_items = request.args.get('max', 20, type=int)
    
    contractors = contractor_service.list_contractors(first, max_items)
    
    result = [{
        'id': c.id,
        'first_name': c.first_name,
        'last_name': c.last_name,
        'email': c.email,
        'phone': c.phone,
        'status': c.status
    } for c in contractors]
    
    return jsonify(result)

@bp.route('/contractors/<int:contractor_id>', methods=['GET'])
def get_contractor_details(contractor_id):
    contractor = contractor_service.get_contractor_details(contractor_id)
    
    if not contractor:
        return jsonify({'error': 'Contractor not found'}), 404
    
    # Get the contractor services with rates
    contractor_services = [{
        'service_id': service.id,
        'name': service.name,
        'description': service.description,
        'duration_minutes': service.duration_minutes,
        'rate_per_hour': next(
            (cs.rate_per_hour for cs in contractor.contractor_services 
             if cs.service_id == service.id), 
            None
        )
    } for service in contractor.services]
    
    result = {
        'id': contractor.id,
        'first_name': contractor.first_name,
        'last_name': contractor.last_name,
        'email': contractor.email,
        'phone': contractor.phone,
        'status': contractor.status,
        'services': contractor_services
    }
    
    return jsonify(result)