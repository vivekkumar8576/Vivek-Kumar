CREATE DATABASE IF NOT EXISTS krishivani;
USE krishivani;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  state VARCHAR(120) NOT NULL,
  pin_code VARCHAR(6) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS crops (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(80) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  seasons VARCHAR(120) NOT NULL,
  states TEXT NOT NULL,
  water_need VARCHAR(20) NOT NULL,
  duration_days INT NOT NULL,
  expected_yield_qtl_per_acre INT NOT NULL,
  advisory TEXT NOT NULL,
  image TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS schemes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(80) NOT NULL UNIQUE,
  title VARCHAR(180) NOT NULL,
  authority VARCHAR(180) NOT NULL,
  support TEXT NOT NULL,
  eligibility TEXT NOT NULL,
  timeline VARCHAR(120) NOT NULL,
  benefit_amount VARCHAR(255) NOT NULL,
  required_documents TEXT NOT NULL,
  apply_steps TEXT NOT NULL,
  official_portal VARCHAR(255) NOT NULL,
  helpline VARCHAR(120) NOT NULL,
  last_updated VARCHAR(80) NOT NULL
);

CREATE TABLE IF NOT EXISTS market_prices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(80) NOT NULL UNIQUE,
  crop VARCHAR(120) NOT NULL,
  market VARCHAR(120) NOT NULL,
  unit VARCHAR(20) NOT NULL,
  min_price DECIMAL(10,2) NOT NULL,
  modal_price DECIMAL(10,2) NOT NULL,
  max_price DECIMAL(10,2) NOT NULL,
  trend VARCHAR(20) NOT NULL
);

INSERT IGNORE INTO crops (slug, name, seasons, states, water_need, duration_days, expected_yield_qtl_per_acre, advisory, image) VALUES
('paddy', 'Paddy', 'Kharif', 'Punjab,Odisha,West Bengal,Andhra Pradesh', 'High', 125, 23, 'Transplant within 20 to 30 days for better tillering and uniform stand.', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'),
('maize', 'Maize', 'Kharif,Rabi', 'Bihar,Karnataka,Maharashtra,Telangana', 'Moderate', 102, 24, 'Use early top-dressing of nitrogen before knee-high growth stage.', 'https://images.unsplash.com/photo-1601593768793-8f6f75470d91?auto=format&fit=crop&w=1200&q=80'),
('cotton', 'Cotton', 'Kharif', 'Maharashtra,Gujarat,Telangana,Madhya Pradesh', 'Moderate', 170, 12, 'Monitor bollworm pressure weekly once flowering starts.', 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=1200&q=80'),
('soybean', 'Soybean', 'Kharif', 'Madhya Pradesh,Maharashtra,Rajasthan', 'Moderate', 106, 10, 'Ensure seed treatment to reduce early root and stem diseases.', 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1200&q=80'),
('wheat', 'Wheat', 'Rabi', 'Punjab,Haryana,Uttar Pradesh,Madhya Pradesh', 'Moderate', 135, 21, 'Critical irrigation at CRI and heading stage protects yield potential.', 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80'),
('mustard', 'Mustard', 'Rabi', 'Rajasthan,Haryana,Uttar Pradesh,West Bengal', 'Low', 116, 8, 'Spray micronutrients at pre-flowering if leaf yellowing is visible.', 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=1200&q=80');

INSERT IGNORE INTO schemes (slug, title, authority, support, eligibility, timeline, benefit_amount, required_documents, apply_steps, official_portal, helpline, last_updated) VALUES
('pm-kisan', 'PM-KISAN Samman Nidhi', 'Ministry of Agriculture', 'INR 6,000 annual income support in three direct transfers.', 'Landholding farmer families with updated records.', 'Open year-round', 'INR 2,000 per installment, 3 installments per year', '["Aadhaar","Bank account passbook","Land ownership records"]', '["Register on PM-KISAN portal or CSC center.","Submit Aadhaar, bank, and land details.","Verify beneficiary status through local agriculture office."]', 'https://pmkisan.gov.in', '155261 / 011-24300606', 'June 2026'),
('fasal-bima', 'Pradhan Mantri Fasal Bima Yojana', 'DA&FW', 'Premium-subsidized crop insurance for weather and yield loss.', 'All notified crop growers in participating districts.', 'Before sowing cut-off', 'Farmer premium usually 1.5%-2% for major crops; balance subsidized', '["Aadhaar","Bank details","Sowing certificate","Land/lease proof"]', '["Choose notified crop and insurer for your district.","Apply through bank, insurer, or PMFBY portal.","Keep acknowledgment and policy number for claim tracking."]', 'https://pmfby.gov.in', '14447', 'May 2026'),
('kcc', 'Kisan Credit Card', 'Department of Financial Services', 'Affordable short-term credit for inputs and farm operations.', 'Farmers and allied sector producers with valid records.', 'Continuous', 'Interest subvention up to 2%; prompt repayment incentive up to 3%', '["Identity proof","Address proof","Land records","Recent photo"]', '["Visit nearest bank branch offering KCC.","Submit KCC form with land and cropping details.","After sanction, use card/limit for seasonal farm expenses."]', 'https://www.myscheme.gov.in', '1800-11-5526', 'April 2026');

INSERT IGNORE INTO market_prices (slug, crop, market, unit, min_price, modal_price, max_price, trend) VALUES
('p1', 'Paddy', 'Ludhiana', 'Quintal', 2110, 2250, 2395, 'up'),
('p2', 'Wheat', 'Kanpur', 'Quintal', 2320, 2465, 2610, 'stable'),
('p3', 'Cotton', 'Akola', 'Quintal', 6440, 6880, 7325, 'down'),
('p4', 'Soybean', 'Indore', 'Quintal', 3995, 4260, 4510, 'up'),
('p5', 'Maize', 'Nizamabad', 'Quintal', 1920, 2040, 2180, 'stable');