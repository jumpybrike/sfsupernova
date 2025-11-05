import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

// Load environment variables from .env.local
config({ path: '.env.local' })

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing environment variables!')
  console.error('Please add your Supabase credentials to .env.local')
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
  console.log('🚀 Adding foundation.jpg to gallery...\n')

  const imageData = {
    catalog_number: 'BOOK-1951-001',
    title: 'Foundation by Isaac Asimov',
    year: 1951,
    description: 'Classic science fiction novel by Isaac Asimov, first in the Foundation series.',
    artist: 'Unknown',
    source_url: 'https://cdn.networklayer.co.uk/SFSupernova/images/foundation.jpg',
    license_info: 'Public Domain',
    file_path: 'foundation.jpg',
    thumbnail_path: 'foundation.jpg',
    theme_tags: ['books', 'foundation', 'asimov', '1950s', 'classics']
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
  console.log('🖼️  Full URL: https://cdn.networklayer.co.uk/SFSupernova/images/foundation.jpg')
}

addImage()
