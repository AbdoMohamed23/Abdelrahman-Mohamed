import './App.css'
import About from './components/About'
import BottomNav from './components/BottomNav'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Skills from './components/Skills'
import Work from './components/Work'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    // ✅ نغير اتجاه الصفحة على حسب اللغة
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
  }, [i18n.language])

  return (
    <>
      <Navbar />
      <Hero />
      <Skills />
      <About />
      <Work />
      <Contact />
      <Footer />
      <BottomNav />
    </>
  )
}

export default App