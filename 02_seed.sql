-- Enable pgcrypto for hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Clear previous seed data
TRUNCATE TABLE user_permission CASCADE;
TRUNCATE TABLE password_reset_token CASCADE;
TRUNCATE TABLE rights_catalogue CASCADE;
TRUNCATE TABLE module CASCADE;
TRUNCATE TABLE app_user CASCADE;
TRUNCATE TABLE role CASCADE;

-- 1. Seed Roles
INSERT INTO role (id, name, description) VALUES
(1, 'Superadmin', 'Full system access'),
(2, 'Admin', 'Administrative access'),
(3, 'User', 'Standard user access');

-- 2. Seed Modules (5 modules)
INSERT INTO module (id, name, description) VALUES
(1, 'Customer', 'Customer management module'),
(2, 'Product', 'Product catalogue module'),
(3, 'Human Resources', 'HR management module'),
(4, 'Sales', 'Sales and orders module'),
(5, 'Reports', 'Reporting and analytics module');

-- 3. Seed 36 Per-Action Rights
INSERT INTO rights_catalogue (id, module_id, action_name, code) VALUES
-- Customer Module (7 actions)
(1, 1, 'View Customers', 'CUSTOMER_VIEW'),
(2, 1, 'Create Customer', 'CUSTOMER_CREATE'),
(3, 1, 'Edit Customer', 'CUSTOMER_EDIT'),
(4, 1, 'Delete Customer', 'CUSTOMER_DELETE'),
(5, 1, 'Export Customers', 'CUSTOMER_EXPORT'),
(6, 1, 'Import Customers', 'CUSTOMER_IMPORT'),
(7, 1, 'View Customer Logs', 'CUSTOMER_LOGS'),

-- Product Module (7 actions)
(8, 2, 'View Products', 'PRODUCT_VIEW'),
(9, 2, 'Create Product', 'PRODUCT_CREATE'),
(10, 2, 'Edit Product', 'PRODUCT_EDIT'),
(11, 2, 'Delete Product', 'PRODUCT_DELETE'),
(12, 2, 'Update Inventory', 'PRODUCT_INVENTORY_UPDATE'),
(13, 2, 'Export Products', 'PRODUCT_EXPORT'),
(14, 2, 'Import Products', 'PRODUCT_IMPORT'),

-- Human Resources Module (8 actions)
(15, 3, 'View Employees', 'HR_EMPLOYEE_VIEW'),
(16, 3, 'Create Employee', 'HR_EMPLOYEE_CREATE'),
(17, 3, 'Edit Employee', 'HR_EMPLOYEE_EDIT'),
(18, 3, 'Delete Employee', 'HR_EMPLOYEE_DELETE'),
(19, 3, 'Manage Payroll', 'HR_PAYROLL_MANAGE'),
(20, 3, 'View Payroll', 'HR_PAYROLL_VIEW'),
(21, 3, 'Approve Leave', 'HR_LEAVE_APPROVE'),
(22, 3, 'View Attendance', 'HR_ATTENDANCE_VIEW'),

-- Sales Module (7 actions)
(23, 4, 'View Orders', 'SALES_ORDER_VIEW'),
(24, 4, 'Create Order', 'SALES_ORDER_CREATE'),
(25, 4, 'Edit Order', 'SALES_ORDER_EDIT'),
(26, 4, 'Cancel Order', 'SALES_ORDER_CANCEL'),
(27, 4, 'Process Refund', 'SALES_REFUND_PROCESS'),
(28, 4, 'Export Sales', 'SALES_EXPORT'),
(29, 4, 'View Invoices', 'SALES_INVOICE_VIEW'),

-- Reports Module (7 actions)
(30, 5, 'View Financial Report', 'REPORT_FINANCIAL_VIEW'),
(31, 5, 'View Sales Report', 'REPORT_SALES_VIEW'),
(32, 5, 'View Inventory Report', 'REPORT_INVENTORY_VIEW'),
(33, 5, 'View HR Report', 'REPORT_HR_VIEW'),
(34, 5, 'Export Reports', 'REPORT_EXPORT'),
(35, 5, 'Schedule Reports', 'REPORT_SCHEDULE'),
(36, 5, 'Configure Report Settings', 'REPORT_CONFIG');

-- 4. Seed Superadmin Accounts per Team Member
INSERT INTO app_user (id, email, password_hash, role_id, is_blocked) VALUES
(1, 'member1@team.com', NULL, 1, FALSE),
(2, 'member2@team.com', NULL, 1, FALSE),
(3, 'member3@team.com', NULL, 1, FALSE),
(4, 'member4@team.com', NULL, 1, FALSE);

-- 5. Seed Initial One-Time Set-Password Tokens (Valid for 24 Hours)
INSERT INTO password_reset_token (user_id, token_hash, is_used, expires_at) VALUES
(1, encode(digest('token_member_1_init_secret', 'sha256'), 'hex'), FALSE, NOW() + INTERVAL '24 hours'),
(2, encode(digest('token_member_2_init_secret', 'sha256'), 'hex'), FALSE, NOW() + INTERVAL '24 hours'),
(3, encode(digest('token_member_3_init_secret', 'sha256'), 'hex'), FALSE, NOW() + INTERVAL '24 hours'),
(4, encode(digest('token_member_4_init_secret', 'sha256'), 'hex'), FALSE, NOW() + INTERVAL '24 hours');

-- Reset Sequences
SELECT setval('role_id_seq', (SELECT MAX(id) FROM role));
SELECT setval('module_id_seq', (SELECT MAX(id) FROM module));
SELECT setval('rights_catalogue_id_seq', (SELECT MAX(id) FROM rights_catalogue));
SELECT setval('app_user_id_seq', (SELECT MAX(id) FROM app_user));