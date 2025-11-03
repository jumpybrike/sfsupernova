# Database Migrations

## Running Migrations

### Option 1: Via Supabase SQL Editor (Recommended)

1. Go to your Supabase project SQL Editor: `https://supabase.com/dashboard/project/YOUR_PROJECT/sql/new`
2. Copy the contents of the migration file (e.g., `003_create_reviews_table.sql`)
3. Paste into the SQL Editor
4. Click "Run" to execute

### Option 2: Via Command Line (Requires DATABASE_PASSWORD)

1. Add your database password to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   DATABASE_PASSWORD=your-database-password
   ```

2. Run the migration script:
   ```bash
   npx tsx scripts/apply-reviews-migration.ts
   ```

## Available Migrations

- `001_initial_schema.sql` - Initial database schema (users, images, folders, etc.)
- `002_add_space_colony_columns.sql` - Added space colony artwork fields
- `003_create_reviews_table.sql` - Reviews table for books, films, and audio dramas

## Reviews Table Features

The reviews table includes:
- Full CRUD operations via Row Level Security (admins only for write operations)
- Public read access for all reviews
- Featured flag to control homepage display
- Proper indexes for performance
- Initial seed data with 6 classic sci-fi reviews

## Managing Reviews

### Via Supabase Dashboard

1. Go to Table Editor: `https://supabase.com/dashboard/project/YOUR_PROJECT/editor`
2. Select the `reviews` table
3. Add/edit/delete reviews as needed
4. Set `is_featured = true` for reviews to appear on homepage (max 3 recommended)

### Via API (Admin only)

Reviews are protected by Row Level Security. Only users with `is_admin = true` can create, update, or delete reviews.
