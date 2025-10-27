import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import { config } from 'dotenv'

// Load environment variables from .env.local
config({ path: '.env.local' })

// Check environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing environment variables!')
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local')
  process.exit(1)
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

interface ImageData {
  catalog_number: string
  title: string
  year: number
  description: string
  artist: string
  source_url: string
  license_info: string
  file_path: string
  theme_tags: string[]
}

async function seedImages() {
  console.log('🚀 Starting image seeding process...\n')

  // Read the seed data
  const seedDataPath = path.join(process.cwd(), 'lib/seed-data/vintage-scifi-images.json')
  const seedData: ImageData[] = JSON.parse(fs.readFileSync(seedDataPath, 'utf-8'))

  console.log(`📚 Found ${seedData.length} images to import\n`)

  let successCount = 0
  let errorCount = 0
  let skippedCount = 0

  for (const image of seedData) {
    try {
      // Check if image already exists
      const { data: existing } = await supabase
        .from('images')
        .select('id')
        .eq('catalog_number', image.catalog_number)
        .single()

      if (existing) {
        console.log(`⏭️  Skipping ${image.catalog_number} - already exists`)
        skippedCount++
        continue
      }

      // Insert the image
      const { error } = await supabase
        .from('images')
        .insert({
          catalog_number: image.catalog_number,
          title: image.title,
          year: image.year,
          description: image.description,
          artist: image.artist,
          source_url: image.source_url,
          license_info: image.license_info,
          file_path: image.file_path,
          thumbnail_path: image.file_path, // Use same URL for thumbnail
          theme_tags: image.theme_tags,
        })

      if (error) {
        console.error(`❌ Error inserting ${image.catalog_number}:`, error.message)
        errorCount++
      } else {
        console.log(`✅ Added ${image.catalog_number} - ${image.title} (${image.year})`)
        successCount++
      }
    } catch (err: any) {
      console.error(`❌ Error processing ${image.catalog_number}:`, err.message)
      errorCount++
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log('📊 SEEDING SUMMARY')
  console.log('='.repeat(60))
  console.log(`✅ Successfully imported: ${successCount}`)
  console.log(`⏭️  Skipped (already exist): ${skippedCount}`)
  console.log(`❌ Errors: ${errorCount}`)
  console.log(`📦 Total processed: ${seedData.length}`)
  console.log('='.repeat(60) + '\n')

  if (successCount > 0) {
    console.log('🎉 Images have been added to your gallery!')
    console.log('🌐 Visit http://localhost:3000/gallery to see them\n')
  }
}

// Run the seeding
seedImages()
  .then(() => {
    console.log('✨ Seeding complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Fatal error:', error)
    process.exit(1)
  })
