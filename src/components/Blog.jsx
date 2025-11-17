import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Blog() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch(`${BACKEND}/posts`).then(r => r.json()).then(setPosts)
  }, [])

  return (
    <section id="blog" className="relative bg-gray-50 border-t border-gray-200 overflow-hidden">
      <div className="pointer-events-none absolute -top-10 left-1/3 h-40 w-40 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Laatste blogposts</h2>
            <p className="text-gray-600">Tips voor het kiezen van het juiste model en het vinden van de beste prijs.</p>
          </div>
          <a href="#" className="text-blue-600 hover:underline">Alles bekijken</a>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {posts.length === 0 && (
            <div className="sm:col-span-2 md:col-span-3 text-center text-gray-600">
              Nog geen artikelen. Voeg er een toe via de backend of database viewer.
            </div>
          )}
          {posts.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-20% 0px -10% 0px' }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden border hover:shadow-md transition-shadow"
            >
              {p.cover_image && <img src={p.cover_image} alt="" className="h-40 w-full object-cover" />}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{p.title}</h3>
                {p.excerpt && <p className="text-sm text-gray-600 mt-1">{p.excerpt}</p>}
                <div className="mt-3">
                  <a className="text-blue-600 hover:underline" href={`/#blog/${p.slug}`}>Lees meer</a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
