import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function upgradeToHiRes() {
  console.log('🔄 Upgrading NASA space colony images to high-resolution...\n')

  // Map of current low-res to high-res URLs
  const upgrades = [
    // TORUS
    {
      catalog: 'NASA-TORUS-EXT-001',
      newUrl: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/Torus_Exterior_AC76-0525_5696.jpg',
      size: '5696px (3.7 MB)'
    },
    {
      catalog: 'NASA-TORUS-CUT-001',
      newUrl: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/Torus_Cutaway_AC75-1086-1_5725.jpg',
      size: '5725px (5.3 MB)'
    },
    {
      catalog: 'NASA-TORUS-INT-001',
      newUrl: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/Torus_Interior_AC75-2621_5718.jpg',
      size: '5718px (6.9 MB)'
    },
    {
      catalog: 'NASA-TORUS-CON-001',
      newUrl: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/Torus_Construction_AC75-1886_5737.jpg',
      size: '5737px (5.2 MB)'
    },
    // BERNAL SPHERE
    {
      catalog: 'NASA-BERNAL-EXT-001',
      newUrl: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/Bernal_Exterior_AC76-0965_5688.jpg',
      size: '5688px (5.5 MB)'
    },
    {
      catalog: 'NASA-BERNAL-INT-001',
      newUrl: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/Bernal_Interior_AC76-0628_5716.jpg',
      size: '5716px (7.2 MB)'
    },
    {
      catalog: 'NASA-BERNAL-CUT-001',
      newUrl: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/Bernal_Cutaway_AC76-1089_5732.jpg',
      size: '5732px (5.7 MB)'
    },
    {
      catalog: 'NASA-BERNAL-AGR-001',
      newUrl: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/Bernal_Agriculture_AC78-0330-4_5726.jpg',
      size: '5726px (4.1 MB)'
    },
    {
      catalog: 'NASA-BERNAL-CON-001',
      newUrl: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/Bernal_Construction_AC76-1288_5716.jpg',
      size: '5716px (8.0 MB)'
    },
    // CYLINDER
    {
      catalog: 'NASA-CYLINDER-EXT-001',
      newUrl: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/Cylinder_Exterior_AC75-1085_5728.jpg',
      size: '5728px (4.4 MB)'
    },
    {
      catalog: 'NASA-CYLINDER-INT-001',
      newUrl: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/Cylinder_Interior_AC75-1086_5732.jpg',
      size: '5732px (6.1 MB)'
    },
    {
      catalog: 'NASA-CYLINDER-END-001',
      newUrl: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/Cylinder_Endcap_AC75-1883_5729.jpg',
      size: '5729px (6.8 MB)'
    },
    {
      catalog: 'NASA-CYLINDER-ECL-001',
      newUrl: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/Cylinder_Eclipse_AC75-1920_5728.jpg',
      size: '5728px (6.1 MB)'
    },
    {
      catalog: 'NASA-CYLINDER-MUL-001',
      newUrl: 'https://nss.org/settlement/nasa/70sArtHiRes/70sArt/Cylinder_Multiple_AC75-1921_5722.jpg',
      size: '5722px (3.1 MB)'
    },
  ]

  console.log(`📊 Upgrading ${upgrades.length} images to publication-quality resolution\n`)

  let successCount = 0
  let errorCount = 0

  for (const upgrade of upgrades) {
    const { error } = await supabase
      .from('images')
      .update({
        file_path: upgrade.newUrl,
        thumbnail_path: null // Remove thumbnail since we have high-res now
      })
      .eq('catalog_number', upgrade.catalog)

    if (error) {
      console.log(`❌ Failed: ${upgrade.catalog}`)
      console.log(`   Error: ${error.message}\n`)
      errorCount++
    } else {
      console.log(`✅ Upgraded: ${upgrade.catalog}`)
      console.log(`   Resolution: ${upgrade.size}`)
      console.log(`   URL: ${upgrade.newUrl.split('/').pop()}\n`)
      successCount++
    }
  }

  console.log('─'.repeat(60))
  console.log(`\n🎉 Upgrade complete!`)
  console.log(`   ✅ Success: ${successCount}`)
  console.log(`   ❌ Errors: ${errorCount}`)
  console.log(`\n📊 Image Quality:`)
  console.log(`   Before: ~120 pixels wide (thumbnails)`)
  console.log(`   After: ~5700 pixels wide (publication quality)`)
  console.log(`   Improvement: 47x higher resolution!`)
  console.log(`\n🌐 View at: http://localhost:3000/gallery`)
  console.log(`🌐 Example: http://localhost:3000/gallery/NASA-BERNAL-AGR-001\n`)
  console.log(`⚠️  Note: High-res images may take a moment to load on first view`)
  console.log(`   But they'll be crisp and beautiful! 🖼️\n`)
}

upgradeToHiRes()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('💥 Fatal error:', error.message)
    process.exit(1)
  })
