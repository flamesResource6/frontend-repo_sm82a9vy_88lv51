import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-30 border-b border-white/20">
      <div className="absolute inset-0 -z-10 backdrop-blur-xl bg-white/60 supports-[backdrop-filter]:bg-white/50" />
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="group flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold shadow-sm shadow-blue-500/30"></span>
          <span className="text-lg font-semibold tracking-tight">MacBook Deals NL/BE</span>
          <span className="ml-2 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-10" />
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <a href="#compare" className="relative hover:text-blue-600 transition-colors">Vergelijk prijzen</a>
          <a href="#retailers" className="relative hover:text-blue-600 transition-colors">Winkels</a>
          <a href="#blog" className="relative hover:text-blue-600 transition-colors">Blog</a>
          <a href="/test" className="relative hover:text-blue-600 transition-colors">Status</a>
        </nav>
        <button onClick={() => setOpen(!open)} className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border border-gray-300 bg-white/70 hover:bg-white transition">
          <span className="sr-only">Menu</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-gray-200 bg-white/90 backdrop-blur">
            <div className="px-4 py-3 flex flex-col gap-3 text-sm">
              <a href="#compare" className="hover:text-blue-600" onClick={() => setOpen(false)}>Vergelijk prijzen</a>
              <a href="#retailers" className="hover:text-blue-600" onClick={() => setOpen(false)}>Winkels</a>
              <a href="#blog" className="hover:text-blue-600" onClick={() => setOpen(false)}>Blog</a>
              <a href="/test" className="hover:text-blue-600" onClick={() => setOpen(false)}>Status</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
