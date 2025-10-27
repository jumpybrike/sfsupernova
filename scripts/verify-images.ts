import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function verifyImages() {
  console.log('🔍 Checking Supabase database for images...\n')

  const { data: images, error } = await supabase
    .from('images')
    .select('catalog_number, title, year, artist')
    .order('year', { ascending: true })

  if (error) {
    console.error('❌ Error:', error)
    return
  }

  console.log(`✅ Found ${images?.length} images in the database:\n`)

  images?.forEach((img, idx) => {
    console.log(`${idx + 1}. [${img.catalog_number}] ${img.title} (${img.year})`)
    if (img.artist) console.log(`   Artist: ${img.artist}`)
  })

  console.log('\n' + '='.repeat(60))
  console.log('These images are now live on your gallery!')
  console.log('Visit: http://localhost:3000/gallery')
  console.log('='.repeat(60))
}

verifyImages()
