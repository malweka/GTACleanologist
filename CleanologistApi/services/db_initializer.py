import os
import sqlite3
from pathlib import Path
from dotenv import load_dotenv
from sqlalchemy import text
from flask import current_app

class DbInitializer:
    def __init__(self, db, app):
        load_dotenv()
        self.db = db
        self.app = app
        self.database_url = os.getenv('DATABASE_URL')
        self.database_engine = os.getenv('DATABASE_ENGINE', 'sqlite')
        self.base_path = Path(__file__).parent.parent

    def init_db(self):
        with self.app.app_context():
            if self.database_engine == 'sqlite':
                self._init_sqlite()
            elif self.database_engine == 'postgres':
                self._init_postgres()
            else:
                raise ValueError(f"Unsupported database engine: {self.database_engine}")

    def _init_sqlite(self):
        db_path = Path(self.database_url.replace('sqlite:///', ''))
        db_path.parent.mkdir(parents=True, exist_ok=True)
        
        if not db_path.exists():
            conn = sqlite3.connect(db_path)
            conn.close()
            
            ddl_path = self.base_path / 'db' / 'ddl_sqlite.sql'
            with open(ddl_path) as f:
                sql_commands = f.read().split(';')
                for command in sql_commands:
                    if command.strip():
                        self.db.session.execute(text(command))
            
            seed_path = self.base_path / 'db' / 'seed_sqlite.sql'
            with open(seed_path) as f:
                sql_commands = f.read().split(';')
                for command in sql_commands:
                    if command.strip():
                        self.db.session.execute(text(command))
            
            self.db.session.commit()

    def _init_postgres(self):
        ddl_path = self.base_path / 'db' / 'ddl_postgres.sql'
        with open(ddl_path) as f:
            sql_commands = f.read().split(';')
            for command in sql_commands:
                if command.strip():
                    self.db.session.execute(text(command))
        
        seed_path = self.base_path / 'db' / 'seed_postgres.sql'
        with open(seed_path) as f:
            sql_commands = f.read().split(';')
            for command in sql_commands:
                if command.strip():
                    self.db.session.execute(text(command))
        
        self.db.session.commit()