import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Compare() {
  const [macs, setMacs] = useState([])
  const [retailers, setRetailers] = useState([])
  const [offers, setOffers] = useState([])
  const [country, setCountry] = useState('NL')
  const [selected, setSelected] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`${BACKEND}/macbooks`).then(r => r.json()).then(setMacs)
    fetch(`${BACKEND}/retailers?country=${country}`).then(r => r.json()).then(setRetailers)
  }, [])

  useEffect(() => {
    fetch(`${BACKEND}/retailers?country=${country}`).then(r => r.json()).then(setRetailers)
  }, [country])

  const loadOffers = async () => {
    setLoading(true)
    const url = new URL(`${BACKEND}/offers`)
    url.searchParams.set('country', country)
    if (selected) url.searchParams.set('macbook_model', selected)
    const res = await fetch(url)
    const data = await res.json()
    setOffers(data)
    setLoading(false)
  }

  return (
    <section id="compare" className="relative bg-white border-t border-gray-200">
      <div className="absolute inset-x-0 -top-8 h-8 bg-gradient-to-b from-transparent to-black/5 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Prijzen vergelijken</h2>
            <p className="text-gray-600">Kies je land en model om actuele aanbiedingen te bekijken.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <select value={country} onChange={e => setCountry(e.target.value)} className="border rounded-md px-3 py-2 bg-white/80 backdrop-blur">
              <option value="NL">Nederland</option>
              <option value="BE">België</option>
            </select>
            <select value={selected} onChange={e => setSelected(e.target.value)} className="border rounded-md px-3 py-2 bg-white/80 backdrop-blur">
              <option value="">Alle modellen</option>
              {macs.map(m => (
                <option key={m.model} value={m.model}>{m.model}</option>
              ))}
            </select>
            <button onClick={loadOffers} className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg transition">Zoeken</button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <AnimatePresence>
            {loading && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="col-span-full text-center text-gray-600">Laden...</motion.div>
            )}
          </AnimatePresence>

          {!loading && offers.length === 0 && (
            <div className="col-span-full text-center text-gray-600">Geen aanbiedingen gevonden. Seed eerst data via de Status pagina, of voeg handmatig toe.</div>
          )}

          {offers.map((o, idx) => (
            <motion.div
              layout
              key={idx}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="border rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow bg-white/90 backdrop-blur"
            >
              <div>
                <p className="text-sm text-gray-500">{o.macbook_model}</p>
                <h3 className="text-lg font-semibold">{o.retailer_name}</h3>
                <p className="text-gray-600">{o.country} • {o.in_stock ? 'Op voorraad' : 'Niet op voorraad'}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">€{o.price_eur.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}</p>
                <a href={o.product_url} target="_blank" className="inline-block mt-2 px-3 py-1 rounded-md bg-gray-900 text-white text-sm hover:scale-[1.02] active:scale-[0.98] transition">Bekijk deal</a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-2">Top winkels</h3>
          <div id="retailers" className="flex flex-wrap gap-2">
            {retailers.map(r => (
              <motion.a
                whileHover={{ y: -2 }}
                key={r.name}
                href={r.affiliate_url || r.site_url}
                target="_blank"
                className="px-3 py-1 rounded-full border text-sm hover:bg-gray-50 bg-white/70 backdrop-blur"
              >
                {r.name}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
