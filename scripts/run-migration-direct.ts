import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { readFileSync } from 'fs'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function runMigrationDirect() {
  console.log('🔄 Attempting to add space colony columns...\n')

  // Try to insert a test row with the new columns
  // If it fails, the columns don't exist
  const testData = {
    catalog_number: 'TEST-MIGRATION-001',
    title: 'Migration Test',
    year: 2025,
    source_url: 'https://test.com',
    license_info: 'Test',
    file_path: 'https://test.com/test.jpg',
    colony_type: 'cylinder',
    artist_featured: true,
    habitat_feature: 'exterior',
  }

  console.log('🧪 Testing if columns exist...\n')

  const { data, error } = await supabase
    .from('images')
    .insert(testData)
    .select()

  if (error) {
    if (error.message.includes('column') && (error.message.includes('does not exist') || error.message.includes('colony_type') || error.message.includes('artist_featured') || error.message.includes('habitat_feature'))) {
      console.log('❌ Space colony columns do not exist yet!\n')
      console.log('📋 Please run this SQL in your Supabase dashboard:\n')
      console.log('─'.repeat(70))
      console.log(readFileSync('./supabase/migrations/002_add_space_colony_columns.sql', 'utf-8'))
      console.log('─'.repeat(70))
      console.log('\n📍 Steps:')
      console.log('   1. Go to: https://supabase.com/dashboard/project/riptqrctpkvqkyjjccku/sql/new')
      console.log('   2. Copy the SQL above')
      console.log('   3. Paste and click "Run"')
      console.log('   4. Then run: npx tsx scripts/seed-space-colony-images.ts\n')
      process.exit(1)
    } else {
      console.error('❌ Unexpected error:', error.message)
      process.exit(1)
    }
  }

  // If we got here, columns exist! Clean up test row
  if (data && data.length > 0) {
    console.log('✅ Columns exist! Cleaning up test row...\n')
    await supabase
      .from('images')
      .delete()
      .eq('catalog_number', 'TEST-MIGRATION-001')

    console.log('✅ Migration verified! Columns are ready.')
    console.log('\n🚀 Run the seed script now:')
    console.log('   npx tsx scripts/seed-space-colony-images.ts\n')
    process.exit(0)
  }
}

runMigrationDirect()
  .catch((error) => {
    console.error('💥 Error:', error.message)
    process.exit(1)
  })
