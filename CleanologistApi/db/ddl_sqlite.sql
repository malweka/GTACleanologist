-- SQLite Schema
CREATE TABLE contacts (
    id INTEGER PRIMARY KEY ,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(120) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address VARCHAR(200) NOT NULL,
    city VARCHAR(20) NOT NULL,
    province VARCHAR(20) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE services (
    id INTEGER PRIMARY KEY ,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    duration_minutes INTEGER NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contractors (
    id INTEGER PRIMARY KEY ,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    status VARCHAR(20) CHECK (status IN ('active', 'inactive', 'on_leave')),
    schedule_submission_day INTEGER DEFAULT 4,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contractor_services (
    contractor_id INTEGER REFERENCES contractors(id),
    service_id INTEGER REFERENCES services(id),
    rate_per_hour DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (contractor_id, service_id)
);

CREATE TABLE weekly_schedules (
    id INTEGER PRIMARY KEY ,
    contractor_id INTEGER REFERENCES contractors(id),
    week_start_date DATE NOT NULL,
    status VARCHAR(20) CHECK (status IN ('draft', 'submitted', 'approved', 'active', 'completed')),
    submission_date TIMESTAMP,
    approval_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (contractor_id, week_start_date)
);

CREATE TABLE schedule_details (
    id INTEGER PRIMARY KEY ,
    schedule_id INTEGER REFERENCES weekly_schedules(id),
    day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    break_start TIME,
    break_end TIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (schedule_id, day_of_week)
);

CREATE TABLE schedule_exceptions (
    id INTEGER PRIMARY KEY ,
    contractor_id INTEGER REFERENCES contractors(id),
    exception_date DATE NOT NULL,
    exception_type VARCHAR(20) CHECK (exception_type IN ('sick_day', 'time_off', 'emergency', 'other')),
    start_time TIME,
    end_time TIME,
    is_full_day BOOLEAN DEFAULT 1,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (contractor_id, exception_date, start_time)
);

CREATE TABLE time_slots (
    id INTEGER PRIMARY KEY ,
    contractor_id INTEGER REFERENCES contractors(id),
    service_id INTEGER REFERENCES services(id),
    schedule_id INTEGER REFERENCES weekly_schedules(id),
    slot_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT 1,
    status VARCHAR(20) CHECK (status IN ('available', 'booked', 'blocked', 'expired')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (contractor_id, slot_date, start_time)
);

CREATE TABLE appointments (
    id INTEGER PRIMARY KEY ,
    contact_id INTEGER REFERENCES contacts(id),
    service_id INTEGER REFERENCES services(id),
    contractor_id INTEGER REFERENCES contractors(id),
    schedule_id INTEGER REFERENCES weekly_schedules(id),
    slot_id INTEGER REFERENCES time_slots(id),
    appointment_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status VARCHAR(20) CHECK (status IN ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled')),
    total_price DECIMAL(10,2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE appointment_feedback (
    id INTEGER PRIMARY KEY ,
    appointment_id INTEGER REFERENCES appointments(id) UNIQUE,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_weekly_schedules_contractor ON weekly_schedules(contractor_id);
CREATE INDEX idx_weekly_schedules_dates ON weekly_schedules(week_start_date);
CREATE INDEX idx_schedule_details_schedule ON schedule_details(schedule_id);
CREATE INDEX idx_schedule_exceptions_contractor ON schedule_exceptions(contractor_id);
CREATE INDEX idx_schedule_exceptions_date ON schedule_exceptions(exception_date);
CREATE INDEX idx_time_slots_schedule ON time_slots(schedule_id);
CREATE INDEX idx_time_slots_date_status ON time_slots(slot_date, status);
CREATE INDEX idx_appointments_schedule ON appointments(schedule_id);