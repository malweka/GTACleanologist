-- SQLite seed data
INSERT INTO services (id, name, description, duration_minutes, base_price) VALUES
(100, 'Home Cleaning', 'Regular cleaning service including dusting, vacuuming, mopping, bathroom sanitizing, and kitchen cleaning. Keeps your home fresh and maintained on a regular schedule.', 120, 30.00),
(101, 'Deep Cleaning', 'Comprehensive cleaning including all regular services plus deep carpet cleaning, cabinet interiors, baseboards, window tracks, and hard-to-reach areas.', 240, 35.00),
(102, 'Home Improvement', 'General home repairs and improvements including painting, basic plumbing, fixture installation, drywall repair, and minor carpentry work.', 180, 78.00);

-- Contractors
INSERT INTO contractors (id, first_name, last_name, email, phone, status) VALUES
(1000, 'John', 'Smith', 'john.smith@email.com', '555-0101', 'active'),
(1001, 'Maria', 'Garcia', 'maria.garcia@email.com', '555-0102', 'active'),
(1002, 'David', 'Johnson', 'david.johnson@email.com', '555-0103', 'active'),
(1003, 'Sarah', 'Williams', 'sarah.williams@email.com', '555-0104', 'active'),
(1004, 'Michael', 'Brown', 'michael.brown@email.com', '555-0105', 'active'),
(1005, 'Lisa', 'Davis', 'lisa.davis@email.com', '555-0106', 'active'),
(1006, 'James', 'Miller', 'james.miller@email.com', '555-0107', 'active'),
(1007, 'Jennifer', 'Wilson', 'jennifer.wilson@email.com', '555-0108', 'active'),
(1008, 'Robert', 'Moore', 'robert.moore@email.com', '555-0109', 'on_leave'),
(1009, 'Patricia', 'Taylor', 'patricia.taylor@email.com', '555-0110', 'active'),
(1010, 'Daniel', 'Anderson', 'daniel.anderson@email.com', '555-0111', 'active'),
(1011, 'Emma', 'Thomas', 'emma.thomas@email.com', '555-0112', 'active'),
(1012, 'William', 'Jackson', 'william.jackson@email.com', '555-0113', 'inactive'),
(1013, 'Elizabeth', 'White', 'elizabeth.white@email.com', '555-0114', 'active'),
(1014, 'Richard', 'Harris', 'richard.harris@email.com', '555-0115', 'active'),
(1015, 'Susan', 'Martin', 'susan.martin@email.com', '555-0116', 'active'),
(1016, 'Joseph', 'Thompson', 'joseph.thompson@email.com', '555-0117', 'active'),
(1017, 'Margaret', 'Martinez', 'margaret.martinez@email.com', '555-0118', 'active'),
(1018, 'Charles', 'Robinson', 'charles.robinson@email.com', '555-0119', 'on_leave'),
(1019, 'Sandra', 'Clark', 'sandra.clark@email.com', '555-0120', 'active'),
(1020, 'Thomas', 'Rodriguez', 'thomas.rodriguez@email.com', '555-0121', 'active'),
(1021, 'Ashley', 'Lewis', 'ashley.lewis@email.com', '555-0122', 'active'),
(1022, 'Christopher', 'Lee', 'christopher.lee@email.com', '555-0123', 'active'),
(1023, 'Karen', 'Walker', 'karen.walker@email.com', '555-0124', 'inactive'),
(1024, 'Steven', 'Hall', 'steven.hall@email.com', '555-0125', 'active');

-- Contractor Services
-- Note: Different rates based on experience and specialization
INSERT INTO contractor_services (contractor_id, service_id, rate_per_hour) VALUES
-- Home Cleaning (id=100) specialists
(1000, 100, 35.00),
(1001, 100, 35.00),
(1002, 100, 40.00),
(1003, 100, 35.00),
(1004, 100, 38.00),
(1005, 100, 35.00),
(1006, 100, 37.00),
(1007, 100, 35.00),
(1008, 100, 40.00),
(1009, 100, 35.00),

-- Deep Cleaning (id=101) specialists
(1010, 101, 45.00),
(1011, 101, 45.00),
(1012, 101, 50.00),
(1013, 101, 45.00),
(1014, 101, 48.00),
(1015, 101, 45.00),
(1016, 101, 47.00),
(1017, 101, 45.00),

-- Home Improvement (id=102) specialists
(1018, 102, 55.00),
(1019, 102, 55.00),
(1020, 102, 60.00),
(1021, 102, 55.00),
(1022, 102, 58.00),
(1023, 102, 55.00),
(1024, 102, 57.00),

-- Multiple services for some experienced contractors
(1000, 101, 45.00),  -- John Smith also does deep cleaning
(1001, 101, 45.00),  -- Maria Garcia also does deep cleaning
(1010, 100, 35.00),  -- Daniel Anderson also does regular cleaning
(1011, 100, 35.00),  -- Emma Thomas also does regular cleaning
(1018, 101, 45.00),  -- Charles Robinson also does deep cleaning
(1019, 101, 45.00);  -- Sandra Clark also does deep cleaning