




HOPE, INC. ERP WEBSITE — SETUP GUIDE

FILES
- index.html: single website entry point
- styles.css: styling
- app.js: pages, navigation, Supabase Auth and CRUD starter
- supabase.sql: database tables and starter Row Level Security policies

STEP 1 — CREATE SUPABASE PROJECT
1. Open https://supabase.com and create a project.
2. Open SQL Editor > New query.
3. Copy all contents of supabase.sql, paste, and click Run.
4. Open Project Settings > API.
5. Copy Project URL and anon/public key.

STEP 2 — CONNECT WEBSITE
1. Open app.js in VS Code.
2. At the top, replace:
   YOUR_SUPABASE_PROJECT_URL
   YOUR_SUPABASE_ANON_KEY
3. Save the file.
4. Do NOT use the service_role/secret key in app.js or any browser code.

STEP 3 — RUN WEBSITE
1. Open the project folder in VS Code.
2. Install the Live Server extension if needed.
3. Right-click index.html > Open with Live Server.
4. Register a test account. Confirm its email if email confirmation is enabled.
5. Sign in.

STEP 4 — CREATE THE FIRST SUPERADMIN
1. Register your own account from the website.
2. In Supabase > Authentication > Users, copy your account UUID.
3. In SQL Editor run:
   update public.user_profiles
   set role = 'Superadmin'
   where id = 'PASTE-YOUR-UUID-HERE';
4. Sign out and sign in again.

IMPORTANT ROLE SECURITY
- Public registration always creates a User role.
- Do not add a role dropdown to public registration.
- Do not trust localStorage/sessionStorage to decide permissions.
- The included SQL intentionally prevents browser clients from changing profile roles.
- A production Superadmin workflow for creating Admin accounts should use a Supabase Edge Function or trusted server endpoint. That server must verify the caller's Superadmin role and use the service-role key only on the server.
- Admin and Superadmin currently share module access. User access is limited by allowed_modules.
- Review and test all RLS policies before using real business data.

CURRENT STARTER SCOPE
Landing, sign-in, registration, forgot-password email, role-based navigation, customer CRUD, product CRUD and price history, department CRUD, job CRUD and job history are wired as a starter.
The Employees, detailed Sales workflow (sale line items/payment calculations), Reports/PDF export, and Superadmin account/permission management screens still need their full workflows implemented before production. The schema for these modules is included so they can be added without redesigning the database.

SUPABASE AUTH REDIRECT
For password recovery and email confirmation, configure Supabase Authentication > URL Configuration:
- Site URL: your deployed website URL (or local Live Server URL while testing)
- Add the same local/deployed URL to Redirect URLs.

Do not publish real credentials in screenshots or public repositories. The anon/public key is intended for browser use only when RLS is configured correctly; the service_role key is secret.


MULTI-PAGE VERSION
Each major view has its own HTML file. All pages share styles.css and app.js.
Start the website from index.html using VS Code Live Server.

HTML FILES
- index.html\n- login.html\n- register.html\n- forgot-password.html\n- superadmin-dashboard.html\n- admin-dashboard.html\n- user-dashboard.html\n- customers.html\n- customer-details.html\n- products.html\n- product-price-history.html\n- human-resources.html\n- departments.html\n- job-details.html\n- job-history.html\n- sales.html\n- sale-details.html\n- reports.html\n- user-management.html

The HTML documents are separate entry points. Shared CSS and JavaScript avoid duplicating common styling and logic. Detail-page HTML files are included as separate destinations; their specialized workflows can be expanded in the next implementation pass.
