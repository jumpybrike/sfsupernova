import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { readFileSync } from 'fs'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

async function applyMigration() {
  console.log('🚀 Applying space colony columns migration...\n')

  // Execute each SQL statement separately
  const statements = [
    {
      name: 'Add colony_type column',
      sql: `ALTER TABLE images ADD COLUMN IF NOT EXISTS colony_type VARCHAR(100)`
    },
    {
      name: 'Add artist_featured column',
      sql: `ALTER TABLE images ADD COLUMN IF NOT EXISTS artist_featured BOOLEAN DEFAULT false`
    },
    {
      name: 'Add habitat_feature column',
      sql: `ALTER TABLE images ADD COLUMN IF NOT EXISTS habitat_feature VARCHAR(100)`
    },
    {
      name: 'Create colony_type index',
      sql: `CREATE INDEX IF NOT EXISTS idx_images_colony_type ON images(colony_type) WHERE colony_type IS NOT NULL`
    },
    {
      name: 'Create artist_featured index',
      sql: `CREATE INDEX IF NOT EXISTS idx_images_artist_featured ON images(artist_featured) WHERE artist_featured = true`
    },
    {
      name: 'Create habitat_feature index',
      sql: `CREATE INDEX IF NOT EXISTS idx_images_habitat_feature ON images(habitat_feature) WHERE habitat_feature IS NOT NULL`
    }
  ]

  for (const statement of statements) {
    console.log(`⏳ ${statement.name}...`)

    const { error } = await supabase.rpc('exec', { query: statement.sql })

    if (error) {
      // Try alternative approach - just log that we tried
      console.log(`   ℹ️  ${statement.name} - may already exist or needs manual execution`)
    } else {
      console.log(`   ✅ ${statement.name} - success`)
    }
  }

  console.log('\n🔍 Verifying columns...\n')

  const { data, error } = await supabase
    .from('images')
    .select('*')
    .limit(1)
    .single()

  if (data) {
    const hasColonyType = 'colony_type' in data
    const hasArtistFeatured = 'artist_featured' in data
    const hasHabitatFeature = 'habitat_feature' in data

    if (hasColonyType && hasArtistFeatured && hasHabitatFeature) {
      console.log('✅ Migration successful! All columns present:')
      console.log('   ✅ colony_type')
      console.log('   ✅ artist_featured')
      console.log('   ✅ habitat_feature\n')
      return true
    } else {
      console.log('⚠️  Migration incomplete. Missing columns:')
      if (!hasColonyType) console.log('   ❌ colony_type')
      if (!hasArtistFeatured) console.log('   ❌ artist_featured')
      if (!hasHabitatFeature) console.log('   ❌ habitat_feature')
      console.log('\n📝 Please run the SQL manually in Supabase dashboard:')
      console.log('   https://supabase.com/dashboard/project/riptqrctpkvqkyjjccku/sql/new\n')

      console.log('Copy this SQL:\n')
      console.log(readFileSync('./supabase/migrations/002_add_space_colony_columns.sql', 'utf-8'))
      return false
    }
  }

  return false
}

applyMigration()
  .then((success) => {
    if (success) {
      console.log('🎉 Ready to seed space colony images!')
      process.exit(0)
    } else {
      process.exit(1)
    }
  })
  .catch((error) => {
    console.error('💥 Error:', error.message)
    process.exit(1)
  })
