from flask import Flask
from flask_cors import CORS
from .extensions import db
from .api import contractors, notifications
from dotenv import load_dotenv
from .services import DbInitializer
import os

def create_app():
    load_dotenv()
    app = Flask(__name__)
    
    # Load config
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize extensions
    db.init_app(app)
    initializer = DbInitializer(db, app)
    initializer.init_db()
    CORS(app, resources={
        r"/api/*": {
            "origins": "*",  # change later
            "methods": ["GET", "POST", "OPTIONS"],
            "allow_headers": ["Content-Type"]
        }
    })
    
    # Register blueprints
    app.register_blueprint(contractors.bp, url_prefix='/api')
    app.register_blueprint(notifications.bp, url_prefix='/api')
    #app.register_blueprint(services.bp, url_prefix='/api')
    
    return app