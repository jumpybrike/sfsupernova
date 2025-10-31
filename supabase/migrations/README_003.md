# Migration 003: Add Reviews Table

This migration creates a `reviews` table to store featured reviews data, replacing the hardcoded array in `app/page.tsx`.

## To Apply This Migration

### Option 1: Supabase Dashboard (Recommended)

1. Go to your Supabase project SQL Editor: https://supabase.com/dashboard/project/YOUR_PROJECT/sql/new

2. Copy the contents of `003_add_reviews_table.sql` and paste into the editor

3. Click **"Run"**

4. Verify the migration succeeded by running:
   ```sql
   SELECT * FROM reviews WHERE is_featured = true;
   ```

### Option 2: Using the Script (Requires DATABASE_PASSWORD)

1. Add your database password to `.env.local`:
   ```
   DATABASE_PASSWORD=your_database_password
   ```

2. Run the migration script:
   ```bash
   npx tsx scripts/apply-reviews-migration.ts
   ```

## What This Migration Does

1. **Creates `reviews` table** with fields:
   - `id` (VARCHAR): Review identifier (matches existing review page IDs)
   - `title` (VARCHAR): Full title of the reviewed work
   - `decade` (VARCHAR): Era (e.g., '1950s')
   - `excerpt` (TEXT): Short description/teaser
   - `category` (VARCHAR): Type - 'Books', 'Audio', or 'Film'
   - `rating` (INTEGER): 1-5 star rating
   - `is_featured` (BOOLEAN): Whether to show on homepage
   - `sort_order` (INTEGER): Display order on homepage

2. **Adds RLS policies** for public read access and admin write access

3. **Seeds 3 featured reviews**:
   - Foundation by Isaac Asimov
   - Dimension X: The Outer Limit
   - The Day the Earth Stood Still

## Verification

After running the migration, the homepage should now fetch reviews from the database instead of using hardcoded data. The app will show an error message if the database query fails.

## Rollback

To remove the reviews table:

```sql
DROP TABLE IF EXISTS reviews CASCADE;
```
