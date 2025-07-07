import React, { useState, useRef, useEffect } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { useTranslation } from 'react-i18next'

const Navbar = () => {
  const [nav, setNav] = useState(false)
  const menuRef = useRef(null)
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'

  const handleNav = () => {
    setNav(!nav)
  }

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar'
    i18n.changeLanguage(newLang)
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr'
  }

  // إغلاق القائمة عند الضغط خارجها
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
    <div className="navCyan border border-gray-600 h-[100px] text-gray-400 max-w-[1200px] mx-auto flex justify-between items-center">

      {/* ✅ اسم الموقع متغير حسب اللغة */}
      <h1 className="text-3xl font-bold primary-color ms-4">{t("text_name")}</h1>

      {/* ✅ روابط الهيدر العادية */}
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

      {/* ✅ أيقونة الموبايل */}
      <div onClick={handleNav} className="block md:hidden me-6 cursor-pointer">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* ✅ قائمة الموبايل الجانبية حسب اللغة */}
      <div
        ref={menuRef}
        className={
          nav
            ? `z-10 fixed h-full top-0 w-[60%] bg-[#202121] ease-in-out duration-500 ${isArabic ? 'right-0' : 'left-0'}
            `:` fixed top-0 h-full w-[60%] ${isArabic ? 'right-[-100%]' : 'left-[-100%]'}`
        }
      >
        <h1 className="text-3xl primary-color m-4">{t("text_name")}</h1>
        <ul className="p-8 text-2xl">
          <li className="p-5"><a href="#about">{t("about")}</a></li>
          <li className="p-5"><a href="#work">{t("work")}</a></li>
          <li className="p-5"><a href="#contact">{t("contact")}</a></li>
          <li className="p-5">
            <button onClick={toggleLanguage} className="px-3 py-1 border rounded">
              {i18n.language === 'ar' ? 'EN' : 'AR'}
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar