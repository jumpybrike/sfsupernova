import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function removeNASAImages() {
  console.log('Removing NASA images from database...');

  const { data, error } = await supabase
    .from('images')
    .delete()
    .like('catalog_number', 'NASA-%')
    .select();

  if (error) {
    console.error('Error removing NASA images:', error);
    return;
  }

  console.log('✅ Successfully removed NASA images');
  console.log(`Deleted ${data?.length || 0} NASA image records`);
}

removeNASAImages();
