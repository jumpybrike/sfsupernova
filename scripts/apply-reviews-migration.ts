import { Client } from 'pg'
import { config } from 'dotenv'
import { readFileSync } from 'fs'

config({ path: '.env.local' })

async function applyMigration() {
  console.log('🚀 Applying reviews table migration via direct Postgres connection...\n')

  // Extract project ref from Supabase URL
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const projectRef = supabaseUrl.replace('https://', '').replace('.supabase.co', '')

  const dbPassword = process.env.DATABASE_PASSWORD

  if (!dbPassword) {
    console.log('❌ DATABASE_PASSWORD not found in .env.local\n')
    console.log('💡 Alternative: Run the SQL manually in Supabase dashboard')
    console.log('─'.repeat(70))
    console.log(readFileSync('./supabase/migrations/003_add_reviews_table.sql', 'utf-8'))
    console.log('─'.repeat(70))
    console.log('\n📍 Go to your Supabase SQL editor')
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
    const migrationSQL = readFileSync('./supabase/migrations/003_add_reviews_table.sql', 'utf-8')

    console.log('⏳ Executing migration SQL...\n')

    await client.query(migrationSQL)

    console.log('✅ Migration applied successfully!')
    console.log('\n🎉 Reviews table created with:')
    console.log('   ✅ 3 featured reviews seeded')
    console.log('   ✅ RLS policies configured')
    console.log('   ✅ Ready to use in app/page.tsx\n')

    await client.end()
    process.exit(0)
  } catch (error: any) {
    console.error('❌ Error applying migration:', error.message)
    console.log('\n💡 Try running the SQL manually in Supabase dashboard\n')
    await client.end()
    process.exit(1)
  }
}

applyMigration()
