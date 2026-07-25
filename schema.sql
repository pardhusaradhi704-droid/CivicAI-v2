-- CivicAI PostgreSQL Database DDL Schema

CREATE TYPE user_role AS ENUM ('citizen', 'official', 'admin');
CREATE TYPE complaint_status AS ENUM (
  'submitted',
  'ai_verified',
  'accepted',
  'in_progress',
  'resolved',
  'closed',
  'rejected'
);
CREATE TYPE priority_level AS ENUM ('low', 'medium', 'high', 'critical');

-- Users Table
CREATE TABLE users (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(32),
  role user_role NOT NULL DEFAULT 'citizen',
  verified BOOLEAN DEFAULT FALSE,
  department_id VARCHAR(64),
  department_name VARCHAR(255),
  designation VARCHAR(255),
  avatar TEXT,
  blocked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Departments Table
CREATE TABLE departments (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(32) NOT NULL,
  lead_name VARCHAR(255),
  lead_email VARCHAR(255),
  lead_phone VARCHAR(32),
  active_complaints INT DEFAULT 0,
  resolved_complaints INT DEFAULT 0,
  avg_resolution_hours NUMERIC(5, 2) DEFAULT 24.0,
  total_staff INT DEFAULT 10
);

-- Complaints Table
CREATE TABLE complaints (
  id VARCHAR(64) PRIMARY KEY,
  tracking_number VARCHAR(64) UNIQUE NOT NULL,
  title VARCHAR(512) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(128) NOT NULL,
  department VARCHAR(255) NOT NULL,
  priority priority_level DEFAULT 'medium',
  urgency_score INT DEFAULT 50,
  status complaint_status DEFAULT 'submitted',
  
  -- Location
  latitude NUMERIC(9, 6) NOT NULL,
  longitude NUMERIC(9, 6) NOT NULL,
  address TEXT NOT NULL,
  ward VARCHAR(128),
  city VARCHAR(128),
  
  -- Citizen
  citizen_id VARCHAR(64) REFERENCES users(id),
  citizen_name VARCHAR(255),
  citizen_phone VARCHAR(32),
  
  -- Media & AI
  media_urls TEXT[],
  audio_url TEXT,
  audio_transcript TEXT,
  language VARCHAR(8) DEFAULT 'en',
  
  -- Assigned Official
  assigned_official_id VARCHAR(64) REFERENCES users(id),
  assigned_staff_name VARCHAR(255),
  assigned_staff_phone VARCHAR(32),
  
  -- SLA & Timestamps
  sla_target_hours INT DEFAULT 24,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Resolution Proofs Table
CREATE TABLE resolution_proofs (
  id SERIAL PRIMARY KEY,
  complaint_id VARCHAR(64) REFERENCES complaints(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  notes TEXT,
  official_id VARCHAR(64) REFERENCES users(id),
  official_name VARCHAR(255),
  ai_verified BOOLEAN DEFAULT TRUE,
  ai_confidence INT DEFAULT 90,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Citizen Ratings Table
CREATE TABLE citizen_ratings (
  id SERIAL PRIMARY KEY,
  complaint_id VARCHAR(64) REFERENCES complaints(id) ON DELETE CASCADE,
  stars INT CHECK (stars >= 1 AND stars <= 5),
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Audit Logs Table
CREATE TABLE audit_logs (
  id VARCHAR(64) PRIMARY KEY,
  action VARCHAR(128) NOT NULL,
  performed_by VARCHAR(255) NOT NULL,
  role VARCHAR(32) NOT NULL,
  target VARCHAR(255),
  details TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
