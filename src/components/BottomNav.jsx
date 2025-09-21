import { AiFillHome, AiOutlineMail } from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { BiGlobe } from "react-icons/bi"; // أيقونة اللغة 🌐
import { useState } from "react";
import { MdOutlineRoundaboutRight } from "react-icons/md";

const BottomNav = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const toggleLang = () => {
    const newLang = currentLang === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    document.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  const [activeLink, setActiveLink] = useState('#')

  return (
    <main className="fixed bottom-0 left-0 right-0 z-50 md:hidden backdrop-blur-lg border-t border-primary/50 px-6 py-3 rounded-t-2xl flex justify-around text-white text-sm">
      <ul className="flex justify-around w-full">
        <li>
          <a href="#" onClick={() => setActiveLink('#')}
            className={`px-3 py-1 rounded-full flex ${activeLink === '#' ? 'bg-primary/20 text-primary' : 'text-slate-200 hover:text-primary'}`}>
            <AiFillHome size={22} />
          </a>
        </li>
        <li>
          <a href="#about" onClick={() => setActiveLink('#about')}
            className={`px-3 py-1 rounded-full flex ${activeLink === '#about' ? 'bg-primary/20 text-primary' : 'text-slate-200 hover:text-primary'}`}>
            <MdOutlineRoundaboutRight size={22} />
          </a>
        </li>
        <li>
          <a href="#work" onClick={() => setActiveLink('#work')}
            className={`px-3 py-1 rounded-full flex ${activeLink === '#work' ? 'bg-primary/20 text-primary' : 'text-slate-200 hover:text-primary'}`}>
            <BsBriefcase size={22} />
          </a>
        </li>
        <li>
          <a href="#contact" onClick={() => setActiveLink('#contact')}
            className={`px-3 py-1 rounded-full flex ${activeLink === '#contact' ? 'bg-primary/20 text-primary' : 'text-slate-200 hover:text-primary'}`}>
            <AiOutlineMail size={24} />
          </a>
        </li>
        <li>
          <button onClick={toggleLang} className="text-slate-200 hover:text-primary rounded-full px-3 py-1">
            <BiGlobe size={22} />
          </button>
        </li>
      </ul>
    </main>
  );
};

export default BottomNav;
