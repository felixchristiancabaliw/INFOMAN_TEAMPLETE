-- =========================================================
-- S1-DBA Sprint 1 Complete Migration & Audit Script
-- =========================================================

-- 1. Reset tables and triggers
DROP TRIGGER IF EXISTS audit_bookings_trigger ON bookings;
DROP FUNCTION IF EXISTS audit_user() CASCADE;
DROP TABLE IF EXISTS audit_log CASCADE;
DROP TABLE IF EXISTS user_permissions CASCADE;
DROP TABLE IF EXISTS rights_catalogue CASCADE;
DROP TABLE IF EXISTS password_reset_tokens CASCADE;
DROP TABLE IF EXISTS app_user CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS modules CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;

-- 2. S1-DBA-01 / S1-DBA-02: Bookings Table
CREATE TABLE bookings (
    id BIGSERIAL PRIMARY KEY,
    room_type TEXT,
    guest_name TEXT,
    status TEXT DEFAULT 'Confirmed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. S1-DBA-04: Password Reset Tokens Table
CREATE TABLE password_reset_tokens (
    id SERIAL PRIMARY KEY,
    user_email TEXT NOT NULL,
    token_hash TEXT NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. S1-DBA-05: Roles, Modules, Rights, and App User
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE modules (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE rights_catalogue (
    id SERIAL PRIMARY KEY,
    module_id INT REFERENCES modules(id) ON DELETE CASCADE,
    right_code VARCHAR(100) UNIQUE NOT NULL,
    action_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE app_user (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    role_id INT REFERENCES roles(id),
    is_blocked BOOLEAN DEFAULT FALSE,
    is_pending BOOLEAN DEFAULT TRUE,
    deleted_at TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed Data
INSERT INTO roles (name) VALUES ('Superadmin'), ('Admin'), ('User') 
ON CONFLICT (name) DO NOTHING;

INSERT INTO modules (name) VALUES 
('Customer'), ('Product'), ('Human Resources'), ('Sales'), ('Reports')
ON CONFLICT (name) DO NOTHING;

INSERT INTO rights_catalogue (module_id, right_code, action_name) VALUES
(1, 'CUST_VIEW', 'View Customer'),
(2, 'PROD_VIEW', 'View Product'),
(3, 'HR_VIEW', 'View HR'),
(4, 'SALE_VIEW', 'View Sales'),
(5, 'REP_VIEW', 'View Reports')
ON CONFLICT (right_code) DO NOTHING;

-- 5. S1-DBA-06: Audit Log Table and Trigger
CREATE TABLE audit_log (
    id BIGSERIAL PRIMARY KEY,
    table_name VARCHAR(50) NOT NULL,
    action VARCHAR(20) NOT NULL,
    user_email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE FUNCTION audit_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_log (table_name, action, user_email)
    VALUES (
        TG_TABLE_NAME,
        TG_OP,
        COALESCE(auth.jwt() ->> 'email', 'System User')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER audit_bookings_trigger
AFTER INSERT OR UPDATE OR DELETE ON bookings
FOR EACH ROW EXECUTE FUNCTION audit_user();
