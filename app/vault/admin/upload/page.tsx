'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function UploadPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    catalog_number: '',
    title: '',
    year: '',
    description: '',
    artist: '',
    source_url: '',
    license_info: 'Public Domain',
    file_path: '',
    thumbnail_path: '',
    theme_tags: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()

    // Parse theme tags
    const themeTags = formData.theme_tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)

    const { error: insertError } = await supabase
      .from('images')
      .insert({
        catalog_number: formData.catalog_number,
        title: formData.title,
        year: formData.year ? parseInt(formData.year) : null,
        description: formData.description || null,
        artist: formData.artist || null,
        source_url: formData.source_url,
        license_info: formData.license_info,
        file_path: formData.file_path,
        thumbnail_path: formData.thumbnail_path || null,
        theme_tags: themeTags.length > 0 ? themeTags : null,
      })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
    } else {
      router.push('/vault/admin')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Retro grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,107,107,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,107,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />

      <div className="relative">
        {/* Header */}
        <header className="border-b-2 border-[#ff6b6b] bg-black/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <Link href="/vault/admin" className="text-[#ff6b6b] hover:text-white font-['Space_Mono'] transition-colors">
              ← Back to Admin
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-['Orbitron'] font-bold text-[#ff6b6b] mb-4 [text-shadow:0_0_30px_rgba(255,107,107,0.5)]">
              UPLOAD NEW IMAGE
            </h1>
            <p className="text-gray-400 font-['Space_Mono'] text-lg mb-12">
              Add vintage sci-fi artwork to the gallery
            </p>

            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#ff6b6b] to-[#ff5252] rounded-lg blur-lg opacity-20" />

              <div className="relative bg-black border-2 border-[#ff6b6b] rounded-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#ff6b6b] font-['Space_Mono'] mb-2">
                        CATALOG NUMBER *
                      </label>
                      <input
                        type="text"
                        value={formData.catalog_number}
                        onChange={(e) => setFormData({ ...formData, catalog_number: e.target.value })}
                        required
                        className="w-full bg-black border-2 border-[#ff6b6b]/50 rounded px-4 py-3 text-white font-['Space_Mono'] focus:border-[#ff6b6b] focus:outline-none focus:shadow-[0_0_10px_rgba(255,107,107,0.5)] transition-all"
                        placeholder="SCI-FI-1957-042"
                      />
                    </div>

                    <div>
                      <label className="block text-[#ff6b6b] font-['Space_Mono'] mb-2">
                        YEAR
                      </label>
                      <input
                        type="number"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="w-full bg-black border-2 border-[#ff6b6b]/50 rounded px-4 py-3 text-white font-['Space_Mono'] focus:border-[#ff6b6b] focus:outline-none focus:shadow-[0_0_10px_rgba(255,107,107,0.5)] transition-all"
                        placeholder="1957"
                        min="1900"
                        max="2100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#ff6b6b] font-['Space_Mono'] mb-2">
                      TITLE *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="w-full bg-black border-2 border-[#ff6b6b]/50 rounded px-4 py-3 text-white font-['Space_Mono'] focus:border-[#ff6b6b] focus:outline-none focus:shadow-[0_0_10px_rgba(255,107,107,0.5)] transition-all"
                      placeholder="Amazing Stories Cover Art"
                    />
                  </div>

                  <div>
                    <label className="block text-[#ff6b6b] font-['Space_Mono'] mb-2">
                      ARTIST
                    </label>
                    <input
                      type="text"
                      value={formData.artist}
                      onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                      className="w-full bg-black border-2 border-[#ff6b6b]/50 rounded px-4 py-3 text-white font-['Space_Mono'] focus:border-[#ff6b6b] focus:outline-none focus:shadow-[0_0_10px_rgba(255,107,107,0.5)] transition-all"
                      placeholder="Frank R. Paul"
                    />
                  </div>

                  <div>
                    <label className="block text-[#ff6b6b] font-['Space_Mono'] mb-2">
                      DESCRIPTION
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full bg-black border-2 border-[#ff6b6b]/50 rounded px-4 py-3 text-white font-['Space_Mono'] focus:border-[#ff6b6b] focus:outline-none focus:shadow-[0_0_10px_rgba(255,107,107,0.5)] transition-all resize-none"
                      placeholder="Description of the artwork..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#ff6b6b] font-['Space_Mono'] mb-2">
                        SOURCE URL *
                      </label>
                      <input
                        type="url"
                        value={formData.source_url}
                        onChange={(e) => setFormData({ ...formData, source_url: e.target.value })}
                        required
                        className="w-full bg-black border-2 border-[#ff6b6b]/50 rounded px-4 py-3 text-white font-['Space_Mono'] focus:border-[#ff6b6b] focus:outline-none focus:shadow-[0_0_10px_rgba(255,107,107,0.5)] transition-all"
                        placeholder="https://commons.wikimedia.org/..."
                      />
                    </div>

                    <div>
                      <label className="block text-[#ff6b6b] font-['Space_Mono'] mb-2">
                        LICENSE *
                      </label>
                      <input
                        type="text"
                        value={formData.license_info}
                        onChange={(e) => setFormData({ ...formData, license_info: e.target.value })}
                        required
                        className="w-full bg-black border-2 border-[#ff6b6b]/50 rounded px-4 py-3 text-white font-['Space_Mono'] focus:border-[#ff6b6b] focus:outline-none focus:shadow-[0_0_10px_rgba(255,107,107,0.5)] transition-all"
                        placeholder="Public Domain"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#ff6b6b] font-['Space_Mono'] mb-2">
                      IMAGE URL *
                    </label>
                    <input
                      type="url"
                      value={formData.file_path}
                      onChange={(e) => setFormData({ ...formData, file_path: e.target.value })}
                      required
                      className="w-full bg-black border-2 border-[#ff6b6b]/50 rounded px-4 py-3 text-white font-['Space_Mono'] focus:border-[#ff6b6b] focus:outline-none focus:shadow-[0_0_10px_rgba(255,107,107,0.5)] transition-all"
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <label className="block text-[#ff6b6b] font-['Space_Mono'] mb-2">
                      THUMBNAIL URL
                    </label>
                    <input
                      type="url"
                      value={formData.thumbnail_path}
                      onChange={(e) => setFormData({ ...formData, thumbnail_path: e.target.value })}
                      className="w-full bg-black border-2 border-[#ff6b6b]/50 rounded px-4 py-3 text-white font-['Space_Mono'] focus:border-[#ff6b6b] focus:outline-none focus:shadow-[0_0_10px_rgba(255,107,107,0.5)] transition-all"
                      placeholder="https://... (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-[#ff6b6b] font-['Space_Mono'] mb-2">
                      THEME TAGS
                    </label>
                    <input
                      type="text"
                      value={formData.theme_tags}
                      onChange={(e) => setFormData({ ...formData, theme_tags: e.target.value })}
                      className="w-full bg-black border-2 border-[#ff6b6b]/50 rounded px-4 py-3 text-white font-['Space_Mono'] focus:border-[#ff6b6b] focus:outline-none focus:shadow-[0_0_10px_rgba(255,107,107,0.5)] transition-all"
                      placeholder="space-exploration, robots, flying-saucers"
                    />
                    <p className="text-gray-500 font-['Space_Mono'] text-xs mt-2">
                      Comma-separated tags
                    </p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-[#ff6b6b] text-black font-['Orbitron'] font-bold py-3 px-6 rounded hover:bg-[#ff5252] transition-all hover:shadow-[0_0_20px_rgba(255,107,107,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'UPLOADING...' : 'UPLOAD IMAGE'}
                    </button>
                    <Link
                      href="/vault/admin"
                      className="flex-1 bg-transparent border-2 border-[#ff6b6b]/50 text-[#ff6b6b] font-['Orbitron'] font-bold py-3 px-6 rounded hover:border-[#ff6b6b] hover:bg-[#ff6b6b]/10 transition-all text-center"
                    >
                      CANCEL
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
