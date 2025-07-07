import { AiFillHome, AiOutlineMail } from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { BiGlobe } from "react-icons/bi"; // أيقونة اللغة 🌐

const BottomNav = () => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  const toggleLang = () => {
    const newLang = currentLang === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    document.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden backdrop-blur-lg border-t border-white/20 px-6 py-3 rounded-t-2xl flex justify-around text-white text-sm">
      <NavItem icon={<AiFillHome size={24} />} label={t("home")} link="#hero" />
      <NavItem
        icon={<BsBriefcase size={22} />}
        label={t("work")}
        link="#work"
      />
      <NavItem
        icon={<AiOutlineMail size={24} />}
        label={t("contact")}
        link="#contact"
      />

      {/* 🌐 زر اللغة */}
      <button
        onClick={toggleLang}
        className="flex flex-col items-center relative cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
      >
        <BiGlobe size={22} />
        <span className="mt-1 text-xs text-white/80">{t("language")}</span>
      </button>
    </div>
  );
};

// 🔸 عنصر تنقل قابل للنقر
const NavItem = ({ icon, label, link }) => {
  return (
    <a href={link}>
      <div className="flex flex-col items-center relative transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer">
        {icon}
        <span className="mt-1 text-xs text-white/80">{label}</span>
      </div>
    </a>
  );
};

export default BottomNav;
