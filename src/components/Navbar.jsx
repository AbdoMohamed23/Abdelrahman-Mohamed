import { useState, useRef, useEffect } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Navbar = () => {
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

  return (
    <>
      {/* ✅ الخلفية الضبابية عند فتح القائمة */}
      {nav && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-10"
          onClick={() => setNav(false)}
        />
      )}

      {/* ✅ Navbar desktop */}
      {!nav && (
        <div className="navCyan border border-gray-600 h-[100px] text-gray-400 max-w-[1200px] mx-auto flex justify-between items-center relative z-20">
          <h1 className="text-3xl font-bold primary-color ms-4">{t("text_name")}</h1>
          <ul className="hidden md:flex items-center">
            <li className="p-5"><a href="#about">{t("about")}</a></li>
            <li className="p-5"><a href="#work">{t("work")}</a></li>
            <li className="p-5"><a href="#contact">{t("contact")}</a></li>
            <li className="p-5">
              <button onClick={toggleLanguage} className="px-3 py-1 border rounded">
                {i18n.language === 'ar' ? 'EN' : 'AR'}
              </button>
            </li>
          </ul>
          <div onClick={handleNav} className="block md:hidden me-6 cursor-pointer z-30">
            <AiOutlineMenu size={20} />
          </div>
        </div>
      )}

      {/* ✅ قائمة الموبايل الناعمة */}
      <div
        ref={menuRef}
        className={`fixed top-6 ${isArabic ? 'left-4' : 'right-4'} w-[80%] text-white bg-[#202121] rounded-xl shadow-lg p-6 z-30 transition-all duration-500 ease-in-out ${
          nav ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <h1 className="text-3xl primary-color mb-4">{t("text_name")}</h1>
        <ul className="space-y-4 text-xl">
          <li><Link to="/about" onClick={() => setNav(false)}>{t("about")}</Link></li>
          <li><Link to="/work" onClick={() => setNav(false)}>{t("work")}</Link></li>
          <li><Link to="/contact" onClick={() => setNav(false)}>{t("contact")}</Link></li>
          <li>
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 border rounded"
            >
              {i18n.language === 'ar' ? 'EN' : 'AR'}
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Navbar