from flask import Blueprint, jsonify, request

bp = Blueprint('notifications', __name__)

@bp.route('/contact-us', methods=['POST', 'OPTIONS'])
def contact_us():
    if request.method == "OPTIONS":
        return jsonify({}), 200
    data = request.get_json()
    required_fields = ['contact_name', 'contact_email', 'contact_telephone', 'message']
    for field in required_fields:
        if not data.get(field):
            return jsonify({'error': f'Missing required field: {field}'}), 400
           
    return jsonify({'message': 'Contact received successfully'}), 200