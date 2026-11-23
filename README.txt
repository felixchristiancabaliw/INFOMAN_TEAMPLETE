# Hope, Inc. ERP Management System

**Hope, Inc. ERP** is a modern, unified Enterprise Resource Planning web application built to streamline Customer Management, Product Catalogs, Human Resources, and Sales Operations into a single platform. Designed with a clean, responsive split-screen interface and role-based access control, it allows organizations to manage records, user permissions, and system-wide settings efficiently.

---

## ✨ Key Features

* **Multi-Page Interactive Architecture:** Seamless navigation across the landing homepage, authentication screens, and role-specific dashboards.
* **Role-Based Access Control (RBAC):**
  * **Superadmin Dashboard:** Full system access to manage Admin/User accounts, assign roles, inspect audit stamps, restore deleted records, and configure workspace settings.
  * **Admin Dashboard:** Operational overview of Customers, Products, HR, and Sales metrics with manual record creation.
  * **User Dashboard:** Restricted personal workspace displaying only the modules and actions explicitly assigned by an administrator.
* **Authentication & Account Recovery:** Complete Sign In, Account Registration, and Forgot Password flows backed by persistent database storage.
* **Supabase Backend Integration:** Connects directly to Supabase REST APIs (`profiles`, `records`, and `password_resets`) for live data persistence and authentication validation.

---

## 📁 Project Structure

```text
hope-inc-erp/
├── homepage.html               # Landing page & module overview
├── login.html                  # Split-screen user sign-in page
├── register.html               # Account creation form
├── forgotpass.html             # Password recovery request page
├── admin_dashboard.html        # Operational workspace for Admins
├── superadmin_dashboard.html   # Full system & account management for Superadmins
├── user_dashboard.html         # Assigned-module workspace for standard Users
├── styles.css                  # Custom UI styling (Forest Green & Warm Cream theme)
└── page.js                     # Client-side routing, DOM interactivity & Supabase API integration
