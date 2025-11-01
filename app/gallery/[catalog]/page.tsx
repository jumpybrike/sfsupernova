import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { getCdnImageUrl } from '@/lib/imageUrl'

interface PageProps {
  params: Promise<{ catalog: string }>
}

export default async function ImageDetailPage({ params }: PageProps) {
  const { catalog } = await params
  const supabase = await createClient()

  // Get image
  const { data: image } = await supabase
    .from('images')
    .select('*')
    .eq('catalog_number', catalog)
    .single()

  if (!image) {
    notFound()
  }

  // Get user if logged in
  const { data: { user } } = await supabase.auth.getUser()
  let profile = null
  let isStarred = false
  let userFolders = null

  if (user) {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()
    profile = data

    // Check if user has starred this image
    const { data: star } = await supabase
      .from('stars')
      .select('id')
      .eq('user_id', user.id)
      .eq('image_id', image.id)
      .single()

    isStarred = !!star

    // Get user's folders
    const { data: folders } = await supabase
      .from('folders')
      .select('*')
      .eq('user_id', user.id)
      .order('title', { ascending: true })

    userFolders = folders
  }

  // Get comments
  const { data: comments } = await supabase
    .from('comments')
    .select('*, users(*)')
    .eq('image_id', image.id)
    .is('parent_comment_id', null)
    .eq('is_deleted', false)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Retro grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,170,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,170,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />

      <div className="relative">
        {/* Header */}
        <header className="border-b-2 border-[#00ffaa] bg-black/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <Link href="/" className="text-2xl font-['Orbitron'] font-bold text-[#00ffaa] [text-shadow:0_0_20px_rgba(0,255,170,0.5)]">
                  SF SUPERNOVA
                </Link>
              </div>
              <div className="flex items-center gap-4">
                {user ? (
                  <Link
                    href="/vault/dashboard"
                    className="text-[#00ffaa] hover:text-white font-['Space_Mono'] text-sm transition-colors"
                  >
                    {profile?.username || user.email}
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-gray-400 hover:text-[#00ffaa] font-['Space_Mono'] text-sm transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="bg-[#00ffaa] text-black font-['Orbitron'] font-bold py-2 px-4 rounded hover:bg-[#00dd99] transition-all text-sm"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link href="/gallery" className="text-[#00ffaa] hover:text-white font-['Space_Mono'] transition-colors">
              ← Back to Gallery
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Image */}
            <div className="lg:col-span-2">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00ffaa] via-[#4facfe] to-[#00f2fe] rounded-lg blur-lg opacity-20" />
                <div className="relative bg-black border-2 border-[#00ffaa] rounded-lg overflow-hidden">
                  {image.file_path ? (
                    <img
                      src={getCdnImageUrl(image.file_path)}
                      alt={image.title}
                      className="w-full h-auto"
                    />
                  ) : (
                    <div className="aspect-[2/3] bg-gradient-to-br from-[#00ffaa]/20 to-[#4facfe]/20 flex items-center justify-center">
                      <span className="text-9xl">🖼️</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-8">
                <h2 className="text-2xl font-['Orbitron'] font-bold text-[#00ffaa] mb-6 [text-shadow:0_0_20px_rgba(0,255,170,0.5)]">
                  COMMENTS ({comments?.length || 0})
                </h2>

                {user ? (
                  <div className="mb-6">
                    <textarea
                      placeholder="Add a comment..."
                      rows={3}
                      className="w-full bg-black border-2 border-[#00ffaa]/50 rounded px-4 py-3 text-white font-['Space_Mono'] focus:border-[#00ffaa] focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,170,0.5)] transition-all resize-none"
                    />
                    <button className="mt-2 bg-[#00ffaa] text-black font-['Orbitron'] font-bold py-2 px-6 rounded hover:bg-[#00dd99] transition-all">
                      POST COMMENT
                    </button>
                  </div>
                ) : (
                  <div className="mb-6 border-2 border-[#00ffaa]/30 rounded-lg p-6 text-center">
                    <p className="text-gray-400 font-['Space_Mono'] mb-3">
                      Sign in to leave a comment
                    </p>
                    <Link
                      href="/login"
                      className="inline-block bg-[#00ffaa] text-black font-['Orbitron'] font-bold py-2 px-6 rounded hover:bg-[#00dd99] transition-all"
                    >
                      SIGN IN
                    </Link>
                  </div>
                )}

                {/* Comments List */}
                <div className="space-y-4">
                  {comments && comments.length > 0 ? (
                    comments.map((comment: any) => (
                      <div key={comment.id} className="border-2 border-[#00ffaa]/30 rounded-lg p-4">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#00ffaa]/30 to-[#4facfe]/30 rounded-full flex items-center justify-center">
                            <span className="text-lg">👤</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-['Space_Mono'] font-bold text-[#00ffaa]">
                                {comment.users?.username || 'Anonymous'}
                              </span>
                              <span className="text-gray-500 font-['Space_Mono'] text-xs">
                                {new Date(comment.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-300 font-['Space_Mono'] text-sm">
                              {comment.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 font-['Space_Mono'] text-center py-8">
                      No comments yet. Be the first to comment!
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div>
              <div className="sticky top-24 space-y-6">
                {/* Title and Info */}
                <div>
                  <h1 className="text-3xl font-['Orbitron'] font-bold text-[#00ffaa] mb-4 [text-shadow:0_0_20px_rgba(0,255,170,0.5)]">
                    {image.title}
                  </h1>

                  <div className="space-y-3 text-gray-400 font-['Space_Mono']">
                    {image.artist && (
                      <div>
                        <span className="text-gray-500">Artist:</span>{' '}
                        <span className="text-white">{image.artist}</span>
                      </div>
                    )}
                    {image.year && (
                      <div>
                        <span className="text-gray-500">Year:</span>{' '}
                        <span className="text-white">{image.year}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-500">Catalog #:</span>{' '}
                      <span className="text-white font-mono">{image.catalog_number}</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="border-2 border-[#00ffaa]/30 rounded-lg p-4">
                  <div className="flex items-center justify-around">
                    <div className="text-center">
                      <div className="text-2xl font-['Orbitron'] font-bold text-[#00ffaa]">
                        {image.star_count}
                      </div>
                      <div className="text-gray-500 font-['Space_Mono'] text-xs">Stars</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-['Orbitron'] font-bold text-[#00ffaa]">
                        {image.comment_count}
                      </div>
                      <div className="text-gray-500 font-['Space_Mono'] text-xs">Comments</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-['Orbitron'] font-bold text-[#00ffaa]">
                        {image.view_count}
                      </div>
                      <div className="text-gray-500 font-['Space_Mono'] text-xs">Views</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {user && (
                  <div className="space-y-3">
                    <button className={`w-full font-['Orbitron'] font-bold py-3 px-6 rounded transition-all ${
                      isStarred
                        ? 'bg-[#00ffaa] text-black hover:bg-[#00dd99]'
                        : 'bg-transparent border-2 border-[#00ffaa]/50 text-[#00ffaa] hover:border-[#00ffaa] hover:bg-[#00ffaa]/10'
                    }`}>
                      {isStarred ? '⭐ STARRED' : '☆ STAR'}
                    </button>

                    <button className="w-full bg-transparent border-2 border-[#00ffaa]/50 text-[#00ffaa] font-['Orbitron'] font-bold py-3 px-6 rounded hover:border-[#00ffaa] hover:bg-[#00ffaa]/10 transition-all">
                      + ADD TO FOLDER
                    </button>
                  </div>
                )}

                {/* Description */}
                {image.description && (
                  <div>
                    <h3 className="text-lg font-['Orbitron'] font-bold text-[#00ffaa] mb-2">
                      DESCRIPTION
                    </h3>
                    <p className="text-gray-400 font-['Space_Mono'] text-sm">
                      {image.description}
                    </p>
                  </div>
                )}

                {/* Space Colony Info */}
                {(image.colony_type || image.habitat_feature || image.artist_featured) && (
                  <div className="border-2 border-[#4facfe]/30 rounded-lg p-4 bg-[#4facfe]/5">
                    <h3 className="text-lg font-['Orbitron'] font-bold text-[#4facfe] mb-3 flex items-center gap-2">
                      🚀 SPACE COLONY ARTWORK
                    </h3>
                    <div className="space-y-2 text-sm font-['Space_Mono']">
                      {image.colony_type && (
                        <div>
                          <span className="text-gray-500">Colony Type:</span>{' '}
                          <span className="text-white capitalize">
                            {image.colony_type.replace('-', ' ')}
                          </span>
                        </div>
                      )}
                      {image.habitat_feature && (
                        <div>
                          <span className="text-gray-500">Feature:</span>{' '}
                          <span className="text-white capitalize">{image.habitat_feature}</span>
                        </div>
                      )}
                      {image.artist_featured && (
                        <div>
                          <span className="inline-flex items-center gap-2 bg-[#4facfe]/20 border border-[#4facfe]/40 text-[#4facfe] px-3 py-1 rounded font-bold">
                            ⭐ Featured Artist
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {image.theme_tags && image.theme_tags.length > 0 && (
                  <div>
                    <h3 className="text-lg font-['Orbitron'] font-bold text-[#00ffaa] mb-3">
                      TAGS
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {image.theme_tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="bg-[#00ffaa]/10 border border-[#00ffaa]/30 text-[#00ffaa] px-3 py-1 rounded font-['Space_Mono'] text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* License */}
                <div className="border-t-2 border-[#00ffaa]/20 pt-4">
                  <div className="text-gray-500 font-['Space_Mono'] text-xs space-y-1">
                    <div>License: {image.license_info}</div>
                    {image.source_url && (
                      <div>
                        <a
                          href={image.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#00ffaa] hover:text-white underline"
                        >
                          View Source
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
