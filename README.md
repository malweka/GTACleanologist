# Cleanologist - Professional Cleaning Service Management

Cleanologist is a comprehensive service management solution designed to streamline the operations of professional cleaning and home improvement services. It provides a robust platform for managing contractors, scheduling appointments, and handling service bookings efficiently.

## Features

- **Service Management**: Handle multiple service types including home cleaning, deep cleaning, and home improvements
- **Contractor Management**: Manage contractor profiles, availability, and service assignments
- **Dynamic Scheduling**: Generate and manage time slots based on contractor availability
- **RESTful API**: Modern API design with Flask for seamless integration
- **Multi-Database Support**: Works with both SQLite and PostgreSQL
- **Modern UI**: Built with React, Vite, TailwindCSS, and ShadCN components

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

Contributions are welcome! Please feel free to submit pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.