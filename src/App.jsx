import { BrowserRouter, Routes , Route } from 'react-router-dom'
import Home from './components/Home'
import CV from './components/CV'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    // ✅ نغير اتجاه الصفحة على حسب اللغة
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
  }, [i18n.language])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cv" element={<CV />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App