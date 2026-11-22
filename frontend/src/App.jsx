import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Experiences = lazy(() => import('./pages/Experiences'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Skills = lazy(() => import('./pages/Skills'))
const ContentList = lazy(() => import('./pages/ContentList'))
const ContentDetail = lazy(() => import('./pages/ContentDetail'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) { document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView(); return }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Aller au contenu</a>
      <ScrollManager />
      <Header />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<div style={{ minHeight: '60vh' }} aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/projets" element={<Projects />} />
            <Route path="/projets/:slug" element={<ProjectDetail />} />
            <Route path="/competences" element={<Skills />} />
            <Route path="/blog" element={<ContentList kind="post" />} />
            <Route path="/blog/:slug" element={<ContentDetail kind="post" />} />
            <Route path="/tutoriels" element={<ContentList kind="tutorial" />} />
            <Route path="/tutoriels/:slug" element={<ContentDetail kind="tutorial" />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
