import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

// Load environment variables from .env.local
config({ path: '.env.local' })

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing environment variables!')
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

async function addImage() {
  console.log('🚀 Adding twoheaded.jpg to gallery...\n')

  const imageData = {
    catalog_number: 'SCI-FI-1950-TWO',
    title: 'Two-Headed Monster',
    year: 1950,
    description: 'Classic vintage sci-fi illustration featuring a two-headed creature',
    artist: 'Unknown',
    source_url: 'https://lon1.digitaloceanspaces.com/networklayer-cdn/SFSupernova/images/twoheaded.jpg',
    license_info: 'Public Domain',
    file_path: 'https://lon1.digitaloceanspaces.com/networklayer-cdn/SFSupernova/images/twoheaded.jpg',
    thumbnail_path: 'https://lon1.digitaloceanspaces.com/networklayer-cdn/SFSupernova/images/twoheaded.jpg',
    theme_tags: ['monsters', 'golden-age', 'pulp-art']
  }

  // Check if image already exists
  const { data: existing } = await supabase
    .from('images')
    .select('id')
    .eq('catalog_number', imageData.catalog_number)
    .single()

  if (existing) {
    console.log('⏭️  Image already exists with catalog number:', imageData.catalog_number)
    return
  }

  // Insert the image
  const { data, error } = await supabase
    .from('images')
    .insert(imageData)
    .select()

  if (error) {
    console.error('❌ Error adding image:', error.message)
    process.exit(1)
  }

  console.log('✅ Successfully added image!')
  console.log('📸 Catalog Number:', imageData.catalog_number)
  console.log('🔗 View at: /gallery/' + imageData.catalog_number)
}

addImage()
