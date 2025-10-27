# Quick Start: Add NASA Space Colony Images

## Step 1: Run the Migration (2 minutes)

The space colony fields need to be added to your database first.

### Option A: Copy-Paste in Supabase Dashboard (Easiest)

1. **Go to Supabase SQL Editor:**
   https://supabase.com/dashboard/project/riptqrctpkvqkyjjccku/sql/new

2. **Copy this SQL:**
   ```sql
   -- Add space colony columns
   ALTER TABLE images
     ADD COLUMN IF NOT EXISTS colony_type VARCHAR(100),
     ADD COLUMN IF NOT EXISTS artist_featured BOOLEAN DEFAULT false,
     ADD COLUMN IF NOT EXISTS habitat_feature VARCHAR(100);

   -- Add indexes
   CREATE INDEX IF NOT EXISTS idx_images_colony_type ON images(colony_type) WHERE colony_type IS NOT NULL;
   CREATE INDEX IF NOT EXISTS idx_images_artist_featured ON images(artist_featured) WHERE artist_featured = true;
   CREATE INDEX IF NOT EXISTS idx_images_habitat_feature ON images(habitat_feature) WHERE habitat_feature IS NOT NULL;

   -- Add comments
   COMMENT ON COLUMN images.colony_type IS 'Type of space habitat: cylinder, torus, lunar-base, mars-base, bernal-sphere, asteroid-habitat';
   COMMENT ON COLUMN images.artist_featured IS 'Featured space artist like Don Davis or Rick Guidice';
   COMMENT ON COLUMN images.habitat_feature IS 'View type: interior, exterior, construction, agriculture, transport';
   ```

3. **Click "Run"**

4. You should see: "Success. No rows returned"

### Option B: Use Full Migration File

The complete migration is in: `supabase/migrations/002_add_space_colony_columns.sql`

---

## Step 2: Seed the Images (30 seconds)

Once the migration is complete, run:

```bash
npx tsx scripts/seed-space-colony-images.ts
```

This will add **15 NASA space colony concept art images** from the 1970s:

- 4 Stanford Torus images (Don Davis, Rick Guidice)
- 5 Bernal Sphere images (Don Davis, Rick Guidice)
- 6 O'Neill Cylinder images (Don Davis, Rick Guidice)

All images are from NASA Ames Research Center and are **public domain**.

---

## Step 3: View the Results

Your site will now have **25 total images**:
- 10 vintage pulp covers (1931-1976)
- 15 NASA space colony art (1975-1978)

View them at:
- http://localhost:3000/gallery
- http://localhost:3000/galleries

---

## What You'll See

### Gallery Page
All 25 images mixed together

### Individual Image Pages
NASA space colony art will show a blue "🚀 SPACE COLONY ARTWORK" section with:
- Colony Type (Cylinder, Torus, Bernal Sphere)
- Feature (Interior, Exterior, Construction, Agriculture)
- Featured Artist badge (for Don Davis & Rick Guidice)

### Admin Upload Form
New "SPACE COLONY ARTWORK (1970s)" section with dropdowns for:
- Colony Type
- Habitat Feature
- Featured Artist checkbox

---

## Troubleshooting

### "Column does not exist" error when seeding
→ You need to run the migration first (Step 1)

### Images not displaying
→ Make sure Next.js config allows nss.org domain (already done ✅)

### Want to add more images?
→ Use the admin form at: http://localhost:3000/vault/admin/upload

---

## Quick Commands

```bash
# Check if migration is needed
npx tsx scripts/run-migration-direct.ts

# Seed space colony images (after migration)
npx tsx scripts/seed-space-colony-images.ts

# Verify images in database
npx tsx scripts/verify-images.ts
```

---

Ready to go! Just run Step 1 in Supabase, then Step 2 in your terminal.
