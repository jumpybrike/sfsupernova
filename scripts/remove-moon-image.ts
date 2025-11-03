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

async function removeImage() {
  console.log('🗑️  Removing moon.jpg from gallery...\n')

  // Delete the image with catalog number SCI-FI-MOON-001
  const { error } = await supabase
    .from('images')
    .delete()
    .eq('catalog_number', 'SCI-FI-MOON-001')

  if (error) {
    console.error('❌ Error removing image:', error.message)
    process.exit(1)
  }

  console.log('✅ Successfully removed moon.jpg from the gallery!')
}

removeImage()
