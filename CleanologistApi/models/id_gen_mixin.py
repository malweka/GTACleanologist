from sqlalchemy import Sequence, event
from sqlalchemy.orm import declarative_base
import os
from dotenv import load_dotenv
import time
from extensions import db
import uuid

class IdGenMixin:
    id = db.Column(db.BigInteger, primary_key=True)
    
    @staticmethod
    def generate_id():
        # Example: timestamp-based ID generation
        return int(time.time() * 1000000)  # microsecond precision

    @classmethod
    def __declare_last__(cls):
        event.listen(cls, 'before_insert', cls._set_id)
    
    @staticmethod
    def _set_id(mapper, connection, target):
        if target.id is None:
            target.id = IdGenMixin.generate_distributed_id()
    
    @staticmethod
    def get_worker_id():
        worker_id = os.getenv('WORKER_ID')
        if worker_id is None:
            return 1
        return int(worker_id)

    @staticmethod
    def generate_distributed_id():
        WORKER_ID = IdGenMixin.get_worker_id()
        WORKER_ID_BITS = 5
        SEQUENCE_BITS = 12
        
        # Validate worker ID
        MAX_WORKER_ID = -1 ^ (-1 << WORKER_ID_BITS)
        if WORKER_ID > MAX_WORKER_ID:
            raise ValueError(f"Worker ID cannot be greater than {MAX_WORKER_ID}")
        
        timestamp = int(time.time() * 1000)
        sequence = int.from_bytes(uuid.uuid4().bytes[:2], 'big') & ((1 << SEQUENCE_BITS) - 1)
        
        return (
            ((timestamp << (WORKER_ID_BITS + SEQUENCE_BITS)) |
            (WORKER_ID << SEQUENCE_BITS) |
            sequence)
        )