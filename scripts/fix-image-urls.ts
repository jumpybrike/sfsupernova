import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const workingImages = [
  {
    catalog_number: 'FLASH-1936-001',
    title: 'Flash Gordon Strange Adventures - December 1936',
    year: 1936,
    description: 'Classic Flash Gordon pulp magazine cover featuring space adventure artwork.',
    artist: 'Unknown',
    source_url: 'https://commons.wikimedia.org/wiki/File:Flash_Gordon_Strange_Adventures_December_1936.jpg',
    license_info: 'Public Domain',
    file_path: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Flash_Gordon_Strange_Adventures_December_1936.jpg',
    theme_tags: ['flash-gordon', 'space-adventure', '1930s', 'pulp'],
  },
  {
    catalog_number: 'SCI-FI-ADV-1958-001',
    title: 'Science Fiction Adventures - April 1958',
    year: 1958,
    description: 'Cover art by legendary sci-fi artist Ed Emshwiller.',
    artist: 'Ed Emshwiller',
    source_url: 'https://commons.wikimedia.org/wiki/File:Cover_of_the_April_1958_issue_of_Science_Fiction_Adventures,_by_Ed_Emshwiller.jpg',
    license_info: 'Public Domain',
    file_path: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Cover_of_the_April_1958_issue_of_Science_Fiction_Adventures%2C_by_Ed_Emshwiller.jpg',
    theme_tags: ['ed-emshwiller', '1950s', 'space-age', 'pulp'],
  },
  {
    catalog_number: 'IMAGINATION-1956-001',
    title: 'Imagination Magazine - June 1956',
    year: 1956,
    description: 'Vintage 1950s science fiction pulp magazine with colorful retro-futuristic cover art.',
    artist: 'Unknown',
    source_url: 'https://commons.wikimedia.org/wiki/File:Imagination195606.png',
    license_info: 'Public Domain',
    file_path: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Imagination195606.png',
    theme_tags: ['imagination-magazine', '1950s', 'pulp', 'retro-futuristic'],
  },
  {
    catalog_number: 'IMAGINATIVE-1957-001',
    title: 'Imaginative Tales - November 1957',
    year: 1957,
    description: 'Space Age pulp fiction with dramatic cover illustration.',
    artist: 'Unknown',
    source_url: 'https://commons.wikimedia.org/wiki/File:Imaginative_tales_195711.jpg',
    license_info: 'Public Domain',
    file_path: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Imaginative_tales_195711.jpg',
    theme_tags: ['space-age', '1950s', 'pulp'],
  },
  {
    catalog_number: 'MIRACLE-1931-001',
    title: 'Miracle Science and Fantasy Stories - June-July 1931',
    year: 1931,
    description: 'Early Golden Age science fiction pulp magazine from the 1930s.',
    artist: 'Unknown',
    source_url: 'https://commons.wikimedia.org/wiki/File:Miracle_Science_and_Fantasy_Stories_June-July_1931.jpg',
    license_info: 'Public Domain',
    file_path: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Miracle_Science_and_Fantasy_Stories_June-July_1931.jpg',
    theme_tags: ['golden-age', '1930s', 'pulp'],
  },
  {
    catalog_number: 'SATELLITE-1958-001',
    title: 'Satellite Science Fiction - February 1958',
    year: 1958,
    description: 'Late 1950s sci-fi magazine with sleek Space Age aesthetic.',
    artist: 'Unknown',
    source_url: 'https://commons.wikimedia.org/wiki/File:Satellite_science_fiction_195802.jpg',
    license_info: 'Public Domain',
    file_path: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Satellite_science_fiction_195802.jpg',
    theme_tags: ['space-age', '1950s', 'satellites'],
  },
  {
    catalog_number: 'SF-MAG-1960-001',
    title: 'SF Magazine - December 1960',
    year: 1960,
    description: 'Early 1960s science fiction magazine cover.',
    artist: 'Unknown',
    source_url: 'https://commons.wikimedia.org/wiki/File:SF-Magazine-1960-December-1.jpg',
    license_info: 'Public Domain',
    file_path: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/SF-Magazine-1960-December-1.jpg',
    theme_tags: ['1960s', 'space-age'],
  },
  {
    catalog_number: 'SPACE-TRAVEL-1958-001',
    title: 'Space Travel - July 1958',
    year: 1958,
    description: 'Space Age magazine celebrating the dawn of the space race.',
    artist: 'Unknown',
    source_url: 'https://commons.wikimedia.org/wiki/File:Space_travel_195807.jpg',
    license_info: 'Public Domain',
    file_path: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Space_travel_195807.jpg',
    theme_tags: ['space-travel', 'space-race', '1950s'],
  },
  {
    catalog_number: 'CITY-NEPTUNE-001',
    title: 'City on Neptune - Vintage Sci-Fi Illustration',
    year: 1950,
    description: 'Classic retro-futuristic artwork depicting a city on Neptune.',
    artist: 'Unknown',
    source_url: 'https://commons.wikimedia.org/wiki/File:City_on_Neptune.png',
    license_info: 'Public Domain',
    file_path: 'https://upload.wikimedia.org/wikipedia/commons/9/96/City_on_Neptune.png',
    theme_tags: ['planets', 'cities', 'retro-futuristic', '1950s'],
  },
  {
    catalog_number: 'CAE-1976-001',
    title: 'Légendes de Québec - Fiction Magazine 1976',
    year: 1976,
    description: 'French-Canadian science fiction magazine cover.',
    artist: 'Unknown',
    source_url: 'https://commons.wikimedia.org/wiki/File:Cae-20-legendrekvater1976couverturefiction270.jpg',
    license_info: 'Public Domain',
    file_path: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Cae-20-legendrekvater1976couverturefiction270.jpg',
    theme_tags: ['1970s', 'french-canadian', 'international'],
  },
];

async function fixImageURLs() {
  console.log('🔄 Fixing image URLs in database...\n')

  // Delete old images with broken URLs
  console.log('🗑️  Deleting old images with broken URLs...')
  const { error: deleteError } = await supabase
    .from('images')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all

  if (deleteError) {
    console.error('Error deleting old images:', deleteError)
  } else {
    console.log('✅ Deleted old images\n')
  }

  // Insert new images with working URLs
  console.log('📥 Inserting new images with working URLs...\n')

  let successCount = 0
  let errorCount = 0

  for (const image of workingImages) {
    const { error } = await supabase
      .from('images')
      .insert({
        ...image,
        thumbnail_path: image.file_path,
      })

    if (error) {
      console.error(`❌ Error inserting ${image.catalog_number}:`, error.message)
      errorCount++
    } else {
      console.log(`✅ Added ${image.catalog_number} - ${image.title} (${image.year})`)
      successCount++
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log('📊 SUMMARY')
  console.log('='.repeat(60))
  console.log(`✅ Successfully added: ${successCount}`)
  console.log(`❌ Errors: ${errorCount}`)
  console.log('='.repeat(60))
  console.log('\n🎉 Database updated with working image URLs!')
  console.log('🌐 Refresh your browser to see the images\n')
}

fixImageURLs()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('💥 Fatal error:', error)
    process.exit(1)
  })
