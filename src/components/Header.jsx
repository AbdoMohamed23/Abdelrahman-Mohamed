import { useState, useRef, useEffect } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const [nav, setNav] = useState(false)
  const menuRef = useRef(null)
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'

  const handleNav = () => setNav(!nav)

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar'
    i18n.changeLanguage(newLang)
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr'
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setNav(false)
      }
    }
    if (nav) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [nav])

  const [activeLink, setActiveLink] = useState('#')

  return (
    <header>
      {/* ✅ الخلفية الضبابية عند فتح القائمة */}
      {nav && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-10"
          onClick={() => setNav(false)}
        />
      )}

      {/* ✅ Header desktop */}
      <div className="max-w-[900px] flex md:fixed justify-between items-center mx-4 mt-4 md:mt-0 md:mx-auto top-4 inset-0 bg-black/20 backdrop-blur-md px-3 md:px-12 h-[60px] text-gray-400 border rounded-full border-gray-600 z-20">
        <h1 className="text-3xl font-bold text-primary ms-4">{t("text_name")}</h1>
        <ul className="hidden md:flex space-x-4 items-center">
          <li>
            <a href="#" onClick={() => setActiveLink('#')}
              className={`px-3 py-1 rounded-full font-semibold transition-colors ${activeLink === '#' ? 'bg-primary/20 text-primary' : 'text-slate-200 hover:text-primary'}`}>
              {t("home")}</a>
          </li>
          <li>
            <a href="#about" onClick={() => setActiveLink('#about')}
              className={`px-3 py-1 rounded-full font-semibold transition-colors ${activeLink === '#about' ? 'bg-primary/20 text-primary' : 'text-slate-200 hover:text-primary'}`}>
              {t("about")}</a>
          </li>
          <li>
            <a href="#work" onClick={() => setActiveLink('#work')}
              className={`px-3 py-1 rounded-full font-semibold transition-colors ${activeLink === '#work' ? 'bg-primary/20 text-primary' : 'text-slate-200 hover:text-primary'}`}>
              {t("work")}</a>
          </li>
          <li>
            <a href="#contact" onClick={() => setActiveLink('#contact')}
              className={`px-3 py-1 rounded-full font-semibold transition-colors ${activeLink === '#contact' ? 'bg-primary/20 text-primary' : 'text-slate-200 hover:text-primary'}`}>
              {t("contact")}</a>
          </li>
          <li className="">
            <button onClick={toggleLanguage} className="text-slate-200 font-semibold hover:text-primary rounded-full px-3 py-0.5">
              {i18n.language === 'ar' ? 'EN' : 'AR'}
            </button>
          </li>
        </ul>
        <div onClick={handleNav} className="block md:hidden me-6 cursor-pointer z-30">
          <AiOutlineMenu size={20} />
        </div>
      </div>

      {/* ✅ قائمة الموبايل الناعمة */}
      <div
        ref={menuRef}
        className={`fixed top-6 ${isArabic ? 'left-4' : 'right-4'} w-[80%] text-white bg-contact rounded-xl shadow-lg p-6 z-30 transition-all duration-500 ease-in-out ${nav ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
      >
        <h1 className="text-3xl text-primary border-b border-b-primary pb-2 mb-5">{t("text_name")}</h1>
        <ul className="flex flex-col gap-4 text-xl py-3">
          <li>
            <a href="#" onClick={() => { setActiveLink('#'), setNav(false) }}
              className={`px-3 py-1 rounded-full font-semibold transition-colors ${activeLink === '#' ? 'bg-primary/20 text-primary' : 'text-slate-200 hover:text-primary'}`}>
              {t("home")}</a>
          </li>
          <li>
            <a href="#about" onClick={() => { setActiveLink('#about'), setNav(false) }}
              className={`px-3 py-1 rounded-full font-semibold transition-colors ${activeLink === '#about' ? 'bg-primary/20 text-primary' : 'text-slate-200 hover:text-primary'}`}>
              {t("about")}</a>
          </li>
          <li>
            <a href="#work" onClick={() => { setActiveLink('#work'), setNav(false) }}
              className={`px-3 py-1 rounded-full font-semibold transition-colors ${activeLink === '#work' ? 'bg-primary/20 text-primary' : 'text-slate-200 hover:text-primary'}`}>
              {t("work")}</a>
          </li>
          <li>
            <a href="#contact" onClick={() => { setActiveLink('#contact'), setNav(false) }}
              className={`px-3 py-1 rounded-full font-semibold transition-colors ${activeLink === '#contact' ? 'bg-primary/20 text-primary' : 'text-slate-200 hover:text-primary'}`}>
              {t("contact")}</a>
          </li>
          <li className="">
            <button onClick={toggleLanguage} className="text-slate-200 font-semibold hover:text-primary rounded-full px-3 py-0.5">
              {i18n.language === 'ar' ? 'EN' : 'AR'}
            </button>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header