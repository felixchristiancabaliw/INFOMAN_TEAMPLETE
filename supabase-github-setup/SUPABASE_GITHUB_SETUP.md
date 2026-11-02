# Connect GitHub to Supabase

Copy the `supabase/` folder and the `.github/` folder into the ROOT of your repo.

## One-time setup (about 10 minutes)
1. Supabase > Account (top right) > **Access Tokens** > Generate new token. Copy it.
2. Supabase > your project > **Project Settings > General** > copy the **Project ID** (reference ID).
3. GitHub repo > **Settings > Secrets and variables > Actions > New repository secret**. Add 3 secrets:
   - `SUPABASE_ACCESS_TOKEN` = the token from step 1
   - `SUPABASE_PROJECT_ID` = the Project ID from step 2
   - `SUPABASE_DB_PASSWORD` = your database password
4. Commit and push to `main`. Then open the **Actions** tab to watch **Deploy database to Supabase** run.

## After that
To change the database, add a NEW file in `supabase/migrations/` (name starts with a timestamp,
for example `20261105090000_add_name_columns.sql`) and merge it to `main`.
GitHub then updates Supabase automatically.

## Notes
- `supabase/seed.sql` is the team's `02_seed.sql`. It is NOT run automatically (it starts with TRUNCATE).
  Run it by hand in the Supabase SQL Editor when you want the starter data.
- Do not put `03_sprint1_dba.sql` here. It conflicts with the other two files.
- Supabase also has its own GitHub integration (Project Settings > Integrations > GitHub).
  Some of its features may need a paid plan, which is why this setup uses GitHub Actions instead.
