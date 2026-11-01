-- 1. Table: role
CREATE TABLE IF NOT EXISTS role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255) NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table: app_user
CREATE TABLE IF NOT EXISTS app_user (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NULL,
    role_id INT NOT NULL REFERENCES role(id) ON DELETE RESTRICT,
    is_blocked BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Table: module
CREATE TABLE IF NOT EXISTS module (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255) NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Table: rights_catalogue (36 per-action rights)
CREATE TABLE IF NOT EXISTS rights_catalogue (
    id SERIAL PRIMARY KEY,
    module_id INT NOT NULL REFERENCES module(id) ON DELETE CASCADE,
    action_name VARCHAR(100) NOT NULL,
    code VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255) NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Table: user_permission (with Soft Delete)
CREATE TABLE IF NOT EXISTS user_permission (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
    right_id INT NOT NULL REFERENCES rights_catalogue(id) ON DELETE CASCADE,
    granted_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ NULL DEFAULT NULL, -- Soft delete implementation
    CONSTRAINT unique_user_right UNIQUE (user_id, right_id)
);

-- 6. Table: password_reset_token
CREATE TABLE IF NOT EXISTS password_reset_token (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL UNIQUE, -- Hashed token
    is_used BOOLEAN NOT NULL DEFAULT FALSE,    -- Used flag
    expires_at TIMESTAMPTZ NOT NULL,          -- Expiry date/time
    created_at TIMESTAMPTZ DEFAULT NOW()
);