import { useTranslation } from 'react-i18next'
import Header from './Header'
import Hero from './Hero'
import Skills from './Skills'
import About from './About'
import Work from './Work'
import Contact from './Contact'
import Footer from './Footer'
import BottomNav from './BottomNav'

const Home = () => {
  const { i18n } = useTranslation()
  const dir = i18n.language === 'ar' ? 'rtl' : 'ltr'

  return (
    <div dir={dir}>
      <Header />
      <Hero />
      <Skills />
      <About />
      <Work />
      <Contact />
      <Footer />
      <BottomNav />
    </div>
  )
}

export default Home