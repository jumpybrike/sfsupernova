import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function runMigration() {
  console.log('🔄 Adding space colony columns to images table...\n')

  console.log('📋 Migration SQL:')
  console.log('─'.repeat(60))
  console.log(`
-- Add new columns for space colony artwork classification
ALTER TABLE images
  ADD COLUMN IF NOT EXISTS colony_type VARCHAR(100), -- 'cylinder', 'torus', 'lunar-base', 'mars-base', 'bernal-sphere', 'asteroid-habitat'
  ADD COLUMN IF NOT EXISTS artist_featured BOOLEAN DEFAULT false, -- Don Davis, Rick Guidice, etc.
  ADD COLUMN IF NOT EXISTS habitat_feature VARCHAR(100); -- 'interior', 'exterior', 'construction', 'agriculture', 'transport'

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_images_colony_type ON images(colony_type) WHERE colony_type IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_images_artist_featured ON images(artist_featured) WHERE artist_featured = true;
CREATE INDEX IF NOT EXISTS idx_images_habitat_feature ON images(habitat_feature) WHERE habitat_feature IS NOT NULL;
  `)
  console.log('─'.repeat(60))
  console.log('\n📍 To run this migration:')
  console.log('   1. Go to https://supabase.com/dashboard/project/riptqrctpkvqkyjjccku/sql/new')
  console.log('   2. Copy the SQL from: supabase/migrations/002_add_space_colony_columns.sql')
  console.log('   3. Click "Run" to execute\n')

  // Try to check if columns already exist
  console.log('🔍 Checking current table structure...\n')

  const { data: existingImage } = await supabase
    .from('images')
    .select('*')
    .limit(1)
    .single()

  if (existingImage) {
    const hasColonyType = 'colony_type' in existingImage
    const hasArtistFeatured = 'artist_featured' in existingImage
    const hasHabitatFeature = 'habitat_feature' in existingImage

    if (hasColonyType && hasArtistFeatured && hasHabitatFeature) {
      console.log('✅ All space colony columns already exist!')
      console.log('   • colony_type')
      console.log('   • artist_featured')
      console.log('   • habitat_feature')
      console.log('\n🎉 Migration appears to be already applied!')
    } else {
      console.log('⚠️  Some columns are missing:')
      if (!hasColonyType) console.log('   ❌ colony_type')
      if (!hasArtistFeatured) console.log('   ❌ artist_featured')
      if (!hasHabitatFeature) console.log('   ❌ habitat_feature')
      console.log('\n👆 Please run the migration in Supabase SQL Editor')
    }
  }
}

runMigration()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('💥 Error:', error.message)
    process.exit(1)
  })
