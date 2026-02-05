import { AiFillHome, AiOutlineMail } from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { BiGlobe } from "react-icons/bi"; // أيقونة اللغة 🌐
import { useState } from "react";
import { MdOutlineRoundaboutRight } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";
import { BsSun, BsMoon } from "react-icons/bs";

const BottomNav = () => {
  const { i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const currentLang = i18n.language;
  const toggleLang = () => {
    const newLang = currentLang === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    document.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  const [activeLink, setActiveLink] = useState('#')

  return (
    <main className="fixed bottom-0 left-0 right-0 z-50 md:hidden backdrop-blur-xl bg-white/40 dark:bg-black/40 border-t border-primary/30 px-4 py-3 rounded-t-3xl shadow-2xl shadow-primary/20">
      <ul className="flex justify-around items-center w-full gap-2">
        <li>
          <a href="#" onClick={() => setActiveLink('#')}
            className={`px-3 py-2 rounded-full flex items-center justify-center transition-all duration-300 ${activeLink === '#' ? 'bg-primary text-white shadow-lg shadow-primary/50 scale-110' : 'text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/10'}`}>
            <AiFillHome size={24} />
          </a>
        </li>
        <li>
          <a href="#about" onClick={() => setActiveLink('#about')}
            className={`px-3 py-2 rounded-full flex items-center justify-center transition-all duration-300 ${activeLink === '#about' ? 'bg-primary text-white shadow-lg shadow-primary/50 scale-110' : 'text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/10'}`}>
            <MdOutlineRoundaboutRight size={24} />
          </a>
        </li>
        <li>
          <a href="#work" onClick={() => setActiveLink('#work')}
            className={`px-3 py-2 rounded-full flex items-center justify-center transition-all duration-300 ${activeLink === '#work' ? 'bg-primary text-white shadow-lg shadow-primary/50 scale-110' : 'text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/10'}`}>
            <BsBriefcase size={24} />
          </a>
        </li>
        <li>
          <a href="#contact" onClick={() => setActiveLink('#contact')}
            className={`px-3 py-2 rounded-full flex items-center justify-center transition-all duration-300 ${activeLink === '#contact' ? 'bg-primary text-white shadow-lg shadow-primary/50 scale-110' : 'text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/10'}`}>
            <AiOutlineMail size={24} />
          </a>
        </li>
        <li className="w-px h-6 bg-primary/20"></li>
        <li>
          <button onClick={toggleTheme} className="text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/10 rounded-full px-3 py-2 transition-all duration-300">
            {theme === 'dark' ? <BsSun size={24} /> : <BsMoon size={24} />}
          </button>
        </li>
        <li>
          <button onClick={toggleLang} className="text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/10 rounded-full px-3 py-2 transition-all duration-300">
            <BiGlobe size={24} />
          </button>
        </li>
      </ul>
    </main>
  );
};

export default BottomNav;
