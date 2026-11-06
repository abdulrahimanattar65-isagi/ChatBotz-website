import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollRobot from './components/ScrollRobot'
import StaticBackdrop from './components/StaticBackdrop'

const Home = lazy(() => import('./pages/Home'))
const Platform = lazy(() => import('./pages/Platform'))
const Services = lazy(() => import('./pages/Services'))
const Solutions = lazy(() => import('./pages/Solutions'))
const HowItWorks = lazy(() => import('./pages/HowItWorks'))
const Features = lazy(() => import('./pages/Features'))
const Pricing = lazy(() => import('./pages/Pricing'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const FAQ = lazy(() => import('./pages/FAQ'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }) }, [pathname])
  return null
}

function NotFound() {
  return (
    <div className="container-x py-48 text-center">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="mt-3 text-neutral-400">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-6 inline-block text-neutral-100 hover:underline">Back to home</Link>
    </div>
  )
}

export default function App() {
  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-surface-950">
      <StaticBackdrop />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-surface-900">Skip to content</a>
      <ScrollToTop />
      <Navbar />
      <main id="main" className="relative z-10">
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/platform" element={<Platform />} />
            <Route path="/services" element={<Services />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ScrollRobot />
    </div>
  )
}
