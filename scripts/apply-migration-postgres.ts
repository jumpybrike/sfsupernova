import { Client } from 'pg'
import { config } from 'dotenv'
import { readFileSync } from 'fs'

config({ path: '.env.local' })

async function applyMigration() {
  console.log('🚀 Applying space colony migration via direct Postgres connection...\n')

  // Extract project ref from Supabase URL
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const projectRef = supabaseUrl.replace('https://', '').replace('.supabase.co', '')

  // Construct Postgres connection string
  // Format: postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  console.log('⚠️  Note: Direct Postgres connection requires database password')
  console.log('📍 To get your password:')
  console.log('   1. Go to: https://supabase.com/dashboard/project/riptqrctpkvqkyjjccku/settings/database')
  console.log('   2. Copy the "Database Password" or reset it')
  console.log('   3. Add to .env.local: DATABASE_PASSWORD=your_password\n')

  const dbPassword = process.env.DATABASE_PASSWORD

  if (!dbPassword) {
    console.log('❌ DATABASE_PASSWORD not found in .env.local\n')
    console.log('💡 Alternative: Run the SQL manually in Supabase dashboard')
    console.log('─'.repeat(70))
    console.log(readFileSync('./supabase/migrations/002_add_space_colony_columns.sql', 'utf-8'))
    console.log('─'.repeat(70))
    console.log('\n📍 Go to: https://supabase.com/dashboard/project/riptqrctpkvqkyjjccku/sql/new')
    console.log('   Copy the SQL above, paste, and click "Run"\n')
    process.exit(1)
  }

  const connectionString = `postgresql://postgres.${projectRef}:${dbPassword}@aws-0-us-west-1.pooler.supabase.com:6543/postgres`

  console.log('🔌 Connecting to database...\n')

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  })

  try {
    await client.connect()
    console.log('✅ Connected!\n')

    // Read migration SQL
    const migrationSQL = readFileSync('./supabase/migrations/002_add_space_colony_columns.sql', 'utf-8')

    console.log('⏳ Executing migration SQL...\n')

    await client.query(migrationSQL)

    console.log('✅ Migration applied successfully!')
    console.log('\n🎉 Space colony columns added:')
    console.log('   ✅ colony_type')
    console.log('   ✅ artist_featured')
    console.log('   ✅ habitat_feature')
    console.log('\n🚀 Ready to seed images!')
    console.log('   Run: npx tsx scripts/seed-space-colony-images.ts\n')

    await client.end()
    process.exit(0)
  } catch (error: any) {
    console.error('❌ Error applying migration:', error.message)
    console.log('\n💡 Try running the SQL manually:')
    console.log('   https://supabase.com/dashboard/project/riptqrctpkvqkyjjccku/sql/new\n')
    await client.end()
    process.exit(1)
  }
}

applyMigration()
