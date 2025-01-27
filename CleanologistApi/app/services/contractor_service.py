from ..models.contractor import Contractor
from ..extensions import db
from sqlalchemy.orm import joinedload
from typing import Optional

class ContractorService:
    def __init__(self, db):
        self.db = db
    
    def list_contractors(self, first: int, max_items: int) -> list:
        """
        Retrieve a paginated list of contractors.
        
        Args:
            first (int): The offset (starting position)
            max_items (int): Maximum number of items to return
            
        Returns:
            list: List of contractor objects
        """
        query = Contractor.query.order_by(Contractor.id)
        contractors = query.offset(first).limit(max_items + 1).all()
        return contractors[:max_items]

    def get_contractor_details(self, contractor_id: int) -> Optional[Contractor]:
        """
        Retrieve detailed information about a specific contractor including their services.
        
        Args:
            contractor_id (int): The ID of the contractor
            
        Returns:
            Optional[Contractor]: Contractor object with loaded services or None if not found
        """
        return Contractor.query\
            .options(joinedload(Contractor.services))\
            .filter(Contractor.id == contractor_id)\
            .first()