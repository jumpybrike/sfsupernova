import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function verifyImages() {
  console.log('🔍 Verifying Space Colony Images...\n')

  // Get all images
  const { data: allImages, error } = await supabase
    .from('images')
    .select('*')
    .order('year', { ascending: true })

  if (error) {
    console.error('❌ Error fetching images:', error.message)
    process.exit(1)
  }

  // Separate vintage pulp from space colony art
  const spaceColonyImages = allImages?.filter((img: any) => img.colony_type !== null) || []
  const vintagePulpImages = allImages?.filter((img: any) => img.colony_type === null) || []

  console.log('📊 TOTAL IMAGES:', allImages?.length || 0)
  console.log('   📚 Vintage Pulp Covers:', vintagePulpImages.length)
  console.log('   🚀 NASA Space Colony Art:', spaceColonyImages.length)
  console.log()

  // Analyze space colony images
  if (spaceColonyImages.length > 0) {
    console.log('🚀 SPACE COLONY BREAKDOWN:\n')

    // By colony type
    const byColonyType: Record<string, number> = {}
    const byFeature: Record<string, number> = {}
    const featuredArtists = spaceColonyImages.filter((img: any) => img.artist_featured)

    spaceColonyImages.forEach((img: any) => {
      if (img.colony_type) {
        byColonyType[img.colony_type] = (byColonyType[img.colony_type] || 0) + 1
      }
      if (img.habitat_feature) {
        byFeature[img.habitat_feature] = (byFeature[img.habitat_feature] || 0) + 1
      }
    })

    console.log('   By Colony Type:')
    Object.entries(byColonyType).forEach(([type, count]) => {
      console.log(`      ${type}: ${count}`)
    })

    console.log('\n   By Feature:')
    Object.entries(byFeature).forEach(([feature, count]) => {
      console.log(`      ${feature}: ${count}`)
    })

    console.log(`\n   Featured Artists: ${featuredArtists.length}`)
    console.log()
  }

  // Show sample images
  console.log('📋 SAMPLE IMAGES:\n')

  const samples = [
    vintagePulpImages[0],
    spaceColonyImages.find((img: any) => img.colony_type === 'torus'),
    spaceColonyImages.find((img: any) => img.colony_type === 'bernal-sphere'),
    spaceColonyImages.find((img: any) => img.colony_type === 'cylinder'),
  ].filter(Boolean)

  samples.forEach((img: any) => {
    console.log(`   ${img.year} - ${img.title}`)
    console.log(`      Artist: ${img.artist || 'Unknown'}`)
    if (img.colony_type) {
      console.log(`      Colony: ${img.colony_type} | Feature: ${img.habitat_feature}`)
      console.log(`      Featured: ${img.artist_featured ? '⭐ Yes' : 'No'}`)
    }
    console.log()
  })

  console.log('✅ Verification complete!\n')
  console.log('🌐 View gallery: http://localhost:3000/gallery')
  console.log('🌐 View decades: http://localhost:3000/galleries\n')
}

verifyImages()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('💥 Error:', error.message)
    process.exit(1)
  })
