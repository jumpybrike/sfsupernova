import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    // Check authentication
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check folder ownership
    const { data: folder } = await supabase
      .from('folders')
      .select('user_id')
      .eq('id', id)
      .single()

    if (!folder || folder.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { image_id } = body

    if (!image_id) {
      return NextResponse.json({ error: 'image_id is required' }, { status: 400 })
    }

    // Check if already in folder
    const { data: existing } = await supabase
      .from('folder_images')
      .select('id')
      .eq('folder_id', id)
      .eq('image_id', image_id)
      .single()

    if (existing) {
      return NextResponse.json({ error: 'Image already in folder' }, { status: 400 })
    }

    // Add image to folder
    const { data, error } = await supabase
      .from('folder_images')
      .insert({
        folder_id: id,
        image_id,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
