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
        
        # Get the path to the root directory (parent of app directory)
        self.root_path = Path(__file__).parent.parent.parent
        self.db_scripts_path = self.root_path / 'db'

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
            
            # Use the corrected path to the db scripts
            ddl_path = self.db_scripts_path / 'ddl_sqlite.sql'
            if not ddl_path.exists():
                raise FileNotFoundError(f"DDL file not found at {ddl_path}")
                
            with open(ddl_path) as f:
                sql_commands = f.read().split(';')
                for command in sql_commands:
                    if command.strip():
                        self.db.session.execute(text(command))
            
            seed_path = self.db_scripts_path / 'seed_sqlite.sql'
            if not seed_path.exists():
                raise FileNotFoundError(f"Seed file not found at {seed_path}")
                
            with open(seed_path) as f:
                sql_commands = f.read().split(';')
                for command in sql_commands:
                    if command.strip():
                        self.db.session.execute(text(command))
            
            self.db.session.commit()

    def _init_postgres(self):
        ddl_path = self.db_scripts_path / 'ddl_postgres.sql'
        if not ddl_path.exists():
            raise FileNotFoundError(f"DDL file not found at {ddl_path}")
            
        with open(ddl_path) as f:
            sql_commands = f.read().split(';')
            for command in sql_commands:
                if command.strip():
                    self.db.session.execute(text(command))
        
        seed_path = self.db_scripts_path / 'seed_postgres.sql'
        if not seed_path.exists():
            raise FileNotFoundError(f"Seed file not found at {seed_path}")
            
        with open(seed_path) as f:
            sql_commands = f.read().split(';')
            for command in sql_commands:
                if command.strip():
                    self.db.session.execute(text(command))
        
        self.db.session.commit()