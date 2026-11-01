# Hope, Inc. ERP - Website + Backend (S1-DEV-01)

Spring Boot (Java 17) backend that also serves the pages from `src/main/resources/static/`:
index, signin, register, forgot-password, reset-password, dashboard.

## Run it (test mode, no database needed)
1. Open this folder in VS Code (Extension Pack for Java installed).
2. Open `HopeErpApplication.java` and click **Run** above `main`.
3. Open http://localhost:8080 and sign in with `admin@hope.com` / `admin123`.

## Connect the real Supabase database
1. In Supabase > SQL Editor, run `db/01_migration.sql`, then `db/02_seed.sql`.
2. Copy `.env.example` to `.env` and fill in the Supabase details.
3. Run the app and open http://localhost:8080/api/health  ->  `"database":"connected"`.

## Forgot password
- Test mode (default): enter your email on `forgot-password.html`. The reset link is shown on the page
  and printed in the VS Code terminal.
- Real emails: add the `spring.mail...` lines in `.env` (see `.env.example`) and set `SHOW_RESET_LINK=false`.
- Seeded accounts (member1@team.com ...) have no password. Use "Forgot Password?" to create one.

## Continue with Google
1. https://console.cloud.google.com > APIs & Services > **OAuth consent screen** (External, add your email as a test user).
2. **Credentials > Create credentials > OAuth client ID > Web application**.
3. Under **Authorized JavaScript origins** add `http://localhost:8080` (and your website address later).
4. Copy the Client ID into `.env` as `GOOGLE_CLIENT_ID=...` and restart the app.
New Google users are created with the "User" role.

## Pages and API
| Page | Calls |
|---|---|
| index.html | GET /api/overview |
| register.html | POST /api/register, Google: POST /api/google-login |
| signin.html | POST /api/login, Google: POST /api/google-login |
| forgot-password.html | POST /api/forgot-password |
| reset-password.html | POST /api/reset-password |
| dashboard.html | GET /api/dashboard, POST /api/logout |
| (check) | GET /api/health, GET /api/config |

## Known gaps
- `app_user` has no first/last name columns, so the register form's names are not saved.
- Dashboard numbers are placeholders.
- `db/03_sprint1_dba.sql` (other branch) uses different table names; this code follows 01 + 02.
