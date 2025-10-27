'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewFolderPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setError('You must be logged in to create a folder')
      setLoading(false)
      return
    }

    const slug = generateSlug(title)

    // Check if slug already exists for this user
    const { data: existing } = await supabase
      .from('folders')
      .select('id')
      .eq('user_id', user.id)
      .eq('slug', slug)
      .single()

    if (existing) {
      setError('You already have a folder with this name')
      setLoading(false)
      return
    }

    const { error: insertError } = await supabase
      .from('folders')
      .insert({
        user_id: user.id,
        title,
        description,
        slug,
        is_public: isPublic,
      })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
    } else {
      router.push('/vault/folders')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Retro grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,170,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,170,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />

      <div className="relative">
        {/* Header */}
        <header className="border-b-2 border-[#00ffaa] bg-black/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <Link href="/vault/folders" className="text-[#00ffaa] hover:text-white font-['Space_Mono'] transition-colors">
              ← Back to Folders
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-5xl font-['Orbitron'] font-bold text-[#00ffaa] mb-4 [text-shadow:0_0_30px_rgba(0,255,170,0.5)]">
              CREATE NEW FOLDER
            </h1>
            <p className="text-gray-400 font-['Space_Mono'] text-lg mb-12">
              Organize your vintage sci-fi collection
            </p>

            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00ffaa] via-[#4facfe] to-[#00f2fe] rounded-lg blur-lg opacity-20" />

              <div className="relative bg-black border-2 border-[#00ffaa] rounded-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded">
                      {error}
                    </div>
                  )}

                  <div>
                    <label htmlFor="title" className="block text-[#00ffaa] font-['Space_Mono'] mb-2">
                      FOLDER NAME *
                    </label>
                    <input
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full bg-black border-2 border-[#00ffaa]/50 rounded px-4 py-3 text-white font-['Space_Mono'] focus:border-[#00ffaa] focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,170,0.5)] transition-all"
                      placeholder="e.g., Golden Age Robots"
                    />
                    {title && (
                      <p className="text-gray-500 font-['Space_Mono'] text-sm mt-2">
                        Slug: {generateSlug(title)}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-[#00ffaa] font-['Space_Mono'] mb-2">
                      DESCRIPTION
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className="w-full bg-black border-2 border-[#00ffaa]/50 rounded px-4 py-3 text-white font-['Space_Mono'] focus:border-[#00ffaa] focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,170,0.5)] transition-all resize-none"
                      placeholder="Describe your collection..."
                    />
                  </div>

                  <div>
                    <label className="block text-[#00ffaa] font-['Space_Mono'] mb-4">
                      VISIBILITY
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="visibility"
                          checked={isPublic}
                          onChange={() => setIsPublic(true)}
                          className="w-5 h-5 text-[#00ffaa] focus:ring-[#00ffaa] focus:ring-offset-black"
                        />
                        <div>
                          <div className="text-white font-['Space_Mono'] group-hover:text-[#00ffaa] transition-colors">
                            🌐 Public
                          </div>
                          <div className="text-gray-500 font-['Space_Mono'] text-sm">
                            Anyone can view this folder
                          </div>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="visibility"
                          checked={!isPublic}
                          onChange={() => setIsPublic(false)}
                          className="w-5 h-5 text-[#00ffaa] focus:ring-[#00ffaa] focus:ring-offset-black"
                        />
                        <div>
                          <div className="text-white font-['Space_Mono'] group-hover:text-[#00ffaa] transition-colors">
                            🔒 Private
                          </div>
                          <div className="text-gray-500 font-['Space_Mono'] text-sm">
                            Only you can view this folder
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={loading || !title.trim()}
                      className="flex-1 bg-[#00ffaa] text-black font-['Orbitron'] font-bold py-3 px-6 rounded hover:bg-[#00dd99] transition-all hover:shadow-[0_0_20px_rgba(0,255,170,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'CREATING...' : 'CREATE FOLDER'}
                    </button>
                    <Link
                      href="/vault/folders"
                      className="flex-1 bg-transparent border-2 border-[#00ffaa]/50 text-[#00ffaa] font-['Orbitron'] font-bold py-3 px-6 rounded hover:border-[#00ffaa] hover:bg-[#00ffaa]/10 transition-all text-center"
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
