# SF Supernova - Supabase Setup Guide

This guide will help you set up your Supabase project for the vintage sci-fi image gallery.

## Quick Start

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Click "New Project"
3. Fill in your project details:
   - **Name**: SF Supernova (or whatever you prefer)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free tier is fine to start
4. Wait for the project to be created (~2 minutes)

### 2. Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - keep this secret!

### 3. Configure Environment Variables

1. Create a `.env.local` file in your project root (copy from `.env.example`):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

2. Replace the placeholder values with your actual keys from step 2

### 4. Run the Database Migration

1. In your Supabase project dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
4. Paste it into the SQL editor
5. Click **Run** (bottom right)
6. Wait for the migration to complete (you should see "Success. No rows returned")

This will create:
- All database tables (users, images, folders, comments, etc.)
- Indexes for performance
- Row Level Security (RLS) policies
- Database triggers and functions

### 5. Configure Authentication

1. In your Supabase dashboard, go to **Authentication** → **Providers**
2. Enable **Email** provider (should be enabled by default)
3. Optional: Configure email templates under **Email Templates**

#### Disable Email Confirmation (Development Only)

For easier testing during development:

1. Go to **Authentication** → **Providers** → **Email**
2. Scroll down to **Email Settings**
3. Toggle OFF "Enable email confirmations"

**Note**: Re-enable this in production!

### 6. Create Your First Admin User

After signing up through your app:

1. Go to **Authentication** → **Users** in Supabase
2. Find your user in the list
3. Go to **SQL Editor** and run:

```sql
UPDATE users
SET is_admin = true
WHERE email = 'your@email.com';
```

Replace `your@email.com` with your actual email.

Now you can access the admin panel at `/vault/admin`!

### 7. Optional: Enable Storage for Image Uploads

If you want to store images directly in Supabase (vs using external URLs):

1. Go to **Storage** in your Supabase dashboard
2. Click **Create bucket**
3. Name it `images`
4. Set to **Public bucket** (for public viewing)
5. Click **Create**

Then add storage policies:

```sql
-- Allow anyone to view images
CREATE POLICY "Public images are viewable by everyone"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Allow admins to upload images
CREATE POLICY "Admins can upload images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'images'
  AND (SELECT is_admin FROM users WHERE id = auth.uid())
);
```

## Running Your App

```bash
# Install dependencies (if not done already)
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` and you should see your site!

## Key Routes

- **Home**: `/` - Main site
- **Gallery**: `/gallery` - Browse all images
- **Login**: `/login` - User login
- **Sign Up**: `/signup` - Create account
- **Dashboard**: `/vault/dashboard` - User dashboard (protected)
- **My Folders**: `/vault/folders` - Manage folders (protected)
- **Admin Panel**: `/vault/admin` - Admin controls (admin only)

## Testing the Setup

### 1. Create an Account

1. Go to `/signup`
2. Fill in username, email, and password
3. Click "Request Access"
4. Check your email for confirmation (if enabled)

### 2. Make Yourself an Admin

```sql
UPDATE users
SET is_admin = true
WHERE email = 'your@email.com';
```

### 3. Upload Your First Image

1. Log in and go to `/vault/admin`
2. Click "Upload Image"
3. Fill in the form with image details
4. You can use Wikimedia Commons images, for example:
   - **Title**: Amazing Stories Cover
   - **Catalog Number**: SCI-FI-1926-001
   - **Year**: 1926
   - **Source URL**: https://commons.wikimedia.org/...
   - **License**: Public Domain
   - **Image URL**: [Direct link to image]

### 4. Create a Folder

1. Go to `/vault/folders`
2. Click "New Folder"
3. Name it (e.g., "Golden Age Robots")
4. Browse gallery and add images to your folder

## Database Schema Overview

### Core Tables

- **users** - User accounts and profiles
- **images** - Image catalog
- **folders** - User collections
- **folder_images** - Many-to-many relationship for folders
- **stars** - User favorites/stars
- **comments** - Image comments
- **follows** - User following system
- **activity_log** - Activity tracking for trending

### Security

All tables have Row Level Security (RLS) enabled with policies:

- **Public read** for images and public folders
- **Authenticated write** for user-owned content
- **Admin-only write** for image management

## API Routes

The following API endpoints are available:

### Images

- `POST /api/images/[id]/star` - Star an image
- `DELETE /api/images/[id]/star` - Unstar an image
- `GET /api/images/[id]/comments` - Get comments
- `POST /api/images/[id]/comments` - Add comment

### Folders

- `GET /api/folders` - List folders
- `POST /api/folders` - Create folder
- `POST /api/folders/[id]/images` - Add image to folder
- `DELETE /api/folders/[id]/images/[imageId]` - Remove image from folder

## Troubleshooting

### "Invalid API key" error

- Double-check your `.env.local` file
- Make sure you copied the full keys (they're long!)
- Restart your dev server after changing env vars

### Can't log in

- Check if email confirmation is required (disable for dev)
- Check browser console for errors
- Verify the user exists in **Authentication** → **Users**

### Admin panel not accessible

- Make sure `is_admin = true` in the users table
- Check the middleware is working (no console errors)
- Try logging out and back in

### Migration errors

- Make sure you ran the entire migration SQL
- Check for syntax errors in the SQL editor
- Some functions may need to be created separately if there are errors

## Next Steps

1. **Customize the design** - The vintage sci-fi theme is in place, feel free to adjust colors/fonts
2. **Add more images** - Populate your gallery with vintage sci-fi art
3. **Enable social features** - The comment system, follows, and activity feeds are ready
4. **Set up image storage** - Configure Supabase Storage or use a CDN
5. **Deploy** - Deploy to Vercel or your preferred platform

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Wikimedia Commons](https://commons.wikimedia.org/) - Public domain sci-fi images

## Need Help?

Check the Supabase dashboard logs:
- **Logs** tab for API requests
- **Database** → **Logs** for SQL queries
- Browser console for frontend errors

Good luck building your vintage sci-fi gallery! 🚀
