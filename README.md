# Cleanologist - A Python Learning Project for Service Management

Cleanologist is a **work-in-progress** project designed for learning and experimenting with Python. It serves as a platform to explore concepts like API design, contractor scheduling, and database integration in a practical context. While the project provides functionality for managing contractors, scheduling appointments, and handling bookings, it is primarily intended as a learning exercise and not yet a comprehensive service management solution.

## Features

- **Service Management**: Experiment with handling multiple service types such as home cleaning, deep cleaning, and home improvements.
- **Contractor Management**: Manage contractor profiles and service assignments as part of the exploration.
- **Dynamic Scheduling**: Prototype the generation and management of time slots based on contractor availability.
- **RESTful API**: Build and test a modern API using Flask.
- **Multi-Database Support**: Experiment with both SQLite and PostgreSQL databases.
- **Frontend Exploration**: Learn and apply React, Vite, TailwindCSS, and ShadCN components for UI design.

## Areas for Improvement

As this project is a learning exercise, there are areas where the documentation and functionality could be improved:

1. **Detailed Setup Instructions**: Some steps, such as configuring environment variables and database initialization, need clearer explanations for beginners.
2. **Error Handling**: The API could benefit from more robust error handling and validation examples.
3. **Frontend Documentation**: Expand the documentation for setting up and customizing the frontend application.
4. **API Endpoints**: Provide example requests and responses for better clarity on how the API works.
5. **Testing**: Add examples of unit and integration tests for both the backend and frontend.

## System Architecture

### Backend (API)

- Python 3.11
- Flask for RESTful API
- SQLAlchemy ORM
- Support for SQLite and PostgreSQL databases

### Frontend

- ReactJS
- ViteJS for build tooling
- TailwindCSS for styling
- ShadCN UI components

## Prerequisites

- Python 3.11 or higher
- Node.js 16 or higher
- PostgreSQL (optional, if not using SQLite)

## Getting Started

### Setting up the API

1. Clone the repository:
   ```bash
   git clone https://github.com/malweka/GTACleanologist.git
   cd GTACleanologist
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows use: .venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure environment variables:
   ```bash
   # Create .env file
   WORKER_ID=1
   DATABASE_URL=sqlite:///path/to/db/cleanologist.db
   DATABASE_ENGINE=sqlite
   ```

   For PostgreSQL:
   ```bash
   DATABASE_URL=postgresql://user:password@localhost:5432/dbname
   DATABASE_ENGINE=postgres
   ```

5. Initialize the database:
   ```bash
   flask init-db
   ```

6. Run the API:
   ```bash
   flask run
   ```

### Setting up the UI

1. Navigate to the UI directory:
   ```bash
   cd ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Contractors

- `GET /api/contractors` - List contractors (supports pagination)
- `GET /api/contractors/{id}` - Get contractor details and services

### Services

- `GET /api/services` - List available services
- `GET /api/services/{id}` - Get service details

### Appointments

- `GET /api/appointments` - List appointments
- `POST /api/appointments` - Create new appointment
- `GET /api/appointments/{id}` - Get appointment details

## Contributing

Contributions are welcome! As this is a learning project, suggestions, bug fixes, and feature ideas are appreciated.

## License

This project is licensed under the MIT License.
