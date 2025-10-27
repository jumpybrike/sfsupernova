import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function seedSpaceColonyImages() {
  console.log('🚀 Seeding NASA Space Colony Concept Art (1970s)...\n')

  const images = [
    // TOROIDAL COLONIES
    {
      catalog_number: 'NASA-TORUS-EXT-001',
      title: 'Stanford Torus Exterior View',
      year: 1975,
      description: 'Exterior view of a Stanford Torus toroidal colony designed for 10,000 residents. This rotating wheel-shaped structure would provide artificial gravity through centrifugal force.',
      artist: 'Don Davis',
      source_url: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/art.html',
      license_info: 'Public Domain - NASA Ames Research Center',
      file_path: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/Torus_Exterior_AC76-0525_120.jpg',
      theme_tags: ['space-station', 'torus', 'orbital-habitat'],
      colony_type: 'torus',
      artist_featured: true,
      habitat_feature: 'exterior',
    },
    {
      catalog_number: 'NASA-TORUS-CUT-001',
      title: 'Stanford Torus Cutaway View',
      year: 1975,
      description: 'Cutaway illustration of the Stanford Torus exposing the interior living spaces. The torus rotates to create Earth-like gravity along the rim.',
      artist: 'Rick Guidice',
      source_url: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/art.html',
      license_info: 'Public Domain - NASA Ames Research Center',
      file_path: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/Torus_Cutaway_AC75-1086-1_120.jpg',
      theme_tags: ['space-station', 'torus', 'cutaway'],
      colony_type: 'torus',
      artist_featured: true,
      habitat_feature: 'exterior',
    },
    {
      catalog_number: 'NASA-TORUS-INT-001',
      title: 'Stanford Torus Interior',
      year: 1975,
      description: 'Interior view of the Stanford Torus showing residential and agricultural areas. Sunlight enters through windows along the top, creating an Earth-like environment.',
      artist: 'Don Davis',
      source_url: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/art.html',
      license_info: 'Public Domain - NASA Ames Research Center',
      file_path: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/Torus_Interior_AC75-2621_120.jpg',
      theme_tags: ['space-station', 'interior', 'habitat'],
      colony_type: 'torus',
      artist_featured: true,
      habitat_feature: 'interior',
    },
    {
      catalog_number: 'NASA-TORUS-CON-001',
      title: 'Torus Construction Scene',
      year: 1975,
      description: 'Construction workers assembling the torus rim in orbit. The modular construction approach would allow gradual expansion of the habitat.',
      artist: 'Don Davis',
      source_url: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/art.html',
      license_info: 'Public Domain - NASA Ames Research Center',
      file_path: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/Torus_Construction_AC75-1886_120.jpg',
      theme_tags: ['space-construction', 'torus', 'orbital'],
      colony_type: 'torus',
      artist_featured: true,
      habitat_feature: 'construction',
    },

    // BERNAL SPHERES
    {
      catalog_number: 'NASA-BERNAL-EXT-001',
      title: 'Bernal Sphere Exterior',
      year: 1976,
      description: 'Exterior view of a Bernal Sphere, a spherical living structure designed to house 10,000 people. Named after scientist J.D. Bernal who proposed the concept in 1929.',
      artist: 'Rick Guidice',
      source_url: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/art.html',
      license_info: 'Public Domain - NASA Ames Research Center',
      file_path: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/Bernal_Exterior_AC76-0965_120.jpg',
      theme_tags: ['space-station', 'sphere', 'bernal'],
      colony_type: 'bernal-sphere',
      artist_featured: true,
      habitat_feature: 'exterior',
    },
    {
      catalog_number: 'NASA-BERNAL-INT-001',
      title: 'Bernal Sphere Interior with Human-Powered Flight',
      year: 1976,
      description: 'Interior of a Bernal Sphere showing recreational areas including human-powered flight. The low gravity near the center enables easy flight with simple wings.',
      artist: 'Rick Guidice',
      source_url: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/art.html',
      license_info: 'Public Domain - NASA Ames Research Center',
      file_path: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/Bernal_Interior_AC76-0628_120.jpg',
      theme_tags: ['space-station', 'interior', 'recreation'],
      colony_type: 'bernal-sphere',
      artist_featured: true,
      habitat_feature: 'interior',
    },
    {
      catalog_number: 'NASA-BERNAL-CUT-001',
      title: 'Bernal Sphere Cutaway',
      year: 1976,
      description: 'Cutaway illustration revealing the internal design of the Bernal Sphere. The spherical shape provides maximum volume with minimum surface area.',
      artist: 'Rick Guidice',
      source_url: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/art.html',
      license_info: 'Public Domain - NASA Ames Research Center',
      file_path: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/Bernal_Cutaway_AC76-1089_120.jpg',
      theme_tags: ['space-station', 'cutaway', 'technical'],
      colony_type: 'bernal-sphere',
      artist_featured: true,
      habitat_feature: 'exterior',
    },
    {
      catalog_number: 'NASA-BERNAL-AGR-001',
      title: 'Bernal Sphere Agricultural Modules',
      year: 1978,
      description: 'Agricultural modules in cutaway view showing multiple toroidal farming sections. These separate modules would provide food for the colony population.',
      artist: 'Rick Guidice',
      source_url: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/art.html',
      license_info: 'Public Domain - NASA Ames Research Center',
      file_path: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/Bernal_Agriculture_AC78-0330-4_120.jpg',
      theme_tags: ['agriculture', 'food-production', 'modules'],
      colony_type: 'bernal-sphere',
      artist_featured: true,
      habitat_feature: 'agriculture',
    },
    {
      catalog_number: 'NASA-BERNAL-CON-001',
      title: 'Bernal Sphere Construction Crew',
      year: 1976,
      description: 'Construction crew at work on the Bernal Sphere colony. Astronauts assemble the massive structure in space using materials mined from the Moon or asteroids.',
      artist: 'Don Davis',
      source_url: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/art.html',
      license_info: 'Public Domain - NASA Ames Research Center',
      file_path: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/Bernal_Construction_AC76-1288_120.jpg',
      theme_tags: ['space-construction', 'astronauts', 'assembly'],
      colony_type: 'bernal-sphere',
      artist_featured: true,
      habitat_feature: 'construction',
    },

    // CYLINDRICAL COLONIES (O'Neill Cylinders)
    {
      catalog_number: 'NASA-CYLINDER-EXT-001',
      title: "O'Neill Cylinder Exterior - Double Cylinder Colony",
      year: 1975,
      description: "Exterior view of a double O'Neill cylinder colony designed for over a million residents. Two counter-rotating cylinders provide stability and artificial gravity.",
      artist: 'Rick Guidice',
      source_url: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/art.html',
      license_info: 'Public Domain - NASA Ames Research Center',
      file_path: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/Cylinder_Exterior_AC75-1085_120.jpg',
      theme_tags: ['oneill-cylinder', 'megastructure', 'orbital'],
      colony_type: 'cylinder',
      artist_featured: true,
      habitat_feature: 'exterior',
    },
    {
      catalog_number: 'NASA-CYLINDER-INT-001',
      title: "O'Neill Cylinder Interior",
      year: 1975,
      description: "Interior view of an O'Neill cylinder looking out through large windows. The cylinder's rotation creates Earth-like gravity on the inner surface, with alternating strips of land and windows.",
      artist: 'Rick Guidice',
      source_url: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/art.html',
      license_info: 'Public Domain - NASA Ames Research Center',
      file_path: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/Cylinder_Interior_AC75-1086_120.jpg',
      theme_tags: ['interior', 'habitat', 'windows'],
      colony_type: 'cylinder',
      artist_featured: true,
      habitat_feature: 'interior',
    },
    {
      catalog_number: 'NASA-CYLINDER-END-001',
      title: "O'Neill Cylinder Endcap with Suspension Bridge",
      year: 1975,
      description: "View of the cylinder's endcap featuring a dramatic suspension bridge. The endcaps are transparent to allow sunlight in, with mirrors directing light into the habitat.",
      artist: 'Don Davis',
      source_url: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/art.html',
      license_info: 'Public Domain - NASA Ames Research Center',
      file_path: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/Cylinder_Endcap_AC75-1883_120.jpg',
      theme_tags: ['architecture', 'endcap', 'bridge'],
      colony_type: 'cylinder',
      artist_featured: true,
      habitat_feature: 'interior',
    },
    {
      catalog_number: 'NASA-CYLINDER-ECL-001',
      title: "O'Neill Cylinder Interior - Solar Eclipse",
      year: 1975,
      description: 'Eclipse of the sun with view of clouds and vegetation inside the cylinder. The day/night cycle is controlled by rotating mirrors, creating earthlike conditions.',
      artist: 'Don Davis',
      source_url: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/art.html',
      license_info: 'Public Domain - NASA Ames Research Center',
      file_path: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/Cylinder_Eclipse_AC75-1920_120.jpg',
      theme_tags: ['interior', 'sky', 'atmosphere'],
      colony_type: 'cylinder',
      artist_featured: true,
      habitat_feature: 'interior',
    },
    {
      catalog_number: 'NASA-CYLINDER-MUL-001',
      title: "Multiple O'Neill Cylinder Colonies",
      year: 1975,
      description: 'Multiple two-cylinder colonies aimed toward the sun. Each colony would be an independent city-state in space, connected by transport ships.',
      artist: 'NASA Ames',
      source_url: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/art.html',
      license_info: 'Public Domain - NASA Ames Research Center',
      file_path: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/Cylinder_Multiple_AC75-1921_120.jpg',
      theme_tags: ['multiple-colonies', 'orbital-cities', 'fleet'],
      colony_type: 'cylinder',
      artist_featured: false,
      habitat_feature: 'exterior',
    },
  ]

  console.log(`📊 Found ${images.length} NASA space colony images to seed\n`)
  console.log('🔍 Verifying database columns first...\n')

  // Check if columns exist
  const { data: testImage } = await supabase
    .from('images')
    .select('*')
    .limit(1)
    .single()

  if (testImage) {
    const hasColonyType = 'colony_type' in testImage
    const hasArtistFeatured = 'artist_featured' in testImage
    const hasHabitatFeature = 'habitat_feature' in testImage

    if (!hasColonyType || !hasArtistFeatured || !hasHabitatFeature) {
      console.log('❌ ERROR: Space colony columns not found in database!\n')
      console.log('⚠️  Please run the migration first:')
      console.log('   1. Go to: https://supabase.com/dashboard/project/riptqrctpkvqkyjjccku/sql/new')
      console.log('   2. Copy SQL from: supabase/migrations/002_add_space_colony_columns.sql')
      console.log('   3. Click "Run"\n')
      process.exit(1)
    }
  }

  console.log('✅ Database columns verified!\n')
  console.log('📥 Inserting images...\n')

  let successCount = 0
  let errorCount = 0

  for (const image of images) {
    const { error } = await supabase
      .from('images')
      .insert(image)

    if (error) {
      console.log(`❌ Failed: ${image.title}`)
      console.log(`   Error: ${error.message}\n`)
      errorCount++
    } else {
      console.log(`✅ Added: ${image.title}`)
      console.log(`   Artist: ${image.artist}`)
      console.log(`   Colony: ${image.colony_type} | Feature: ${image.habitat_feature}`)
      console.log(`   Featured: ${image.artist_featured ? 'Yes' : 'No'}\n`)
      successCount++
    }
  }

  console.log('─'.repeat(60))
  console.log(`\n🎉 Seeding complete!`)
  console.log(`   ✅ Success: ${successCount}`)
  console.log(`   ❌ Errors: ${errorCount}`)
  console.log(`\n📊 Total images in database: ${successCount + 10} (10 vintage pulp + ${successCount} space colony)`)
  console.log(`\n🌐 View at: http://localhost:3000/gallery`)
  console.log(`🌐 View at: http://localhost:3000/galleries\n`)
}

seedSpaceColonyImages()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('💥 Fatal error:', error.message)
    process.exit(1)
  })
