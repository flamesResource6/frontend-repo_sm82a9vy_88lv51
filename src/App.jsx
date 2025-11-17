import Header from './components/Header'
import Hero from './components/Hero'
import Compare from './components/Compare'
import Blog from './components/Blog'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />
      <main>
        <Hero />
        <Compare />
        <Blog />
      </main>
      <footer className="border-t mt-12 bg-white/70">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600 flex flex-col sm:flex-row gap-3 justify-between">
          <p>© {new Date().getFullYear()} MacBook Deals NL/BE. Prijzen kunnen wijzigen. Bevat affiliate links.</p>
          <p><a className="hover:underline" href="/test">Status & seeding</a></p>
        </div>
      </footer>
    </div>
  )
}

export default App
