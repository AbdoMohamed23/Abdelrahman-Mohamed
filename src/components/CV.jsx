import { useTranslation } from "react-i18next";
import { useNavigate, useLocation, Link } from "react-router-dom";
// import profileImage from '../assets/Hero-Sec.jpg';

const CV = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    localStorage.setItem("i18nextLng", newLang);
    const newPath = location.pathname.replace(`//(ar|en)/, /${newLang}`);
    navigate(newPath);
  };

  const isArabic = i18n.language === "ar";

  return (
    <section dir={isArabic ? "rtl" : "ltr"} className="sm:min-h-screen bg-white text-gray-800 sm:py-2">
      {" "}
      <div className="max-w-4xl mx-auto shadow-lg border sm:rounded-lg overflow-hidden">
        {/* Header with toggle */}
        <div className="bg-[#fff] text-black px-6 py-5 flex flex-row items-center gap-6">
          {/* <img
        src={profileImage}
        alt="Profile"
        className="w-24 h-24 rounded-full border-4 border-white object-cover"
      /> */}
          <div className="flex-1">
            <div className="flex justify-between">
              <h1 className="text-3xl font-bold">{t("text_name")}</h1>
              <button onClick={toggleLanguage} className="buttonCV">
                {isArabic ? "English" : "عربي"}
              </button>
            </div>
            <p className="text-sm border-b-2 border-black pb-2">{t("jobTitle")}</p>
            <div className="mt-2 flex flex-col sm:flex-row gap-1 text-sm">
              <p>{t("disCV")}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
          {/* About */}
          <div>
            <h2 className="font-semibold text-[#1e3a5f]">{t("about_title")}</h2>
            <p className="text-sm mt-2">{t("aboutTextCV")}</p>
          </div>

          {/* Education */}
          <div>
            <h2 className="font-semibold text-[#1e3a5f]">{t("education")}</h2>
            <ul className="text-sm mt-2 list-disc list-inside">
              <li>{t("edu1")}</li>
              <li>{t("edu2")}</li>
            </ul>
          </div>

          {/* Skills */}
          <div>
            <h2 className="font-semibold text-[#1e3a5f]">{t("skills")}</h2>
            <ul className="text-sm mt-2 list-disc list-inside">
              <li>React.js</li>
              <li>JavaScript</li>
              <li>Tailwind CSS / Bootstrap</li>
              <li>Routing (React Router)</li>
              <li>Multi-language Sites with i18next</li>
              <li>Responsive Design</li>
              <li>AI-assisted research and content planning</li>
            </ul>
          </div>

          {/* Experience */}
          <div>
            <h2 className="font-semibold text-[#1e3a5f]">{t("experience")}</h2>
            <ul className="text-sm mt-2 list-disc list-inside">
              <li>{t("exp1")}</li>
            </ul>
          </div>

          {/* Freelance Projects */}
          <div>
            <h2 className="font-semibold text-[#1e3a5f]">{t("freelance", "Freelance Projects")}</h2>
            <ul className="text-sm mt-2 list-disc list-inside">
              <li>{t("freelance1")}</li>
              <li>{t("freelance2")}</li>
              <li>{t("freelance3")}</li>
              <li>{t("freelance4")}</li>
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h2 className="font-semibold text-[#1e3a5f]">{t("languages")}</h2>
            <ul className="text-sm mt-2 list-disc list-inside">
              <li>{t("lang1")}</li>
              <li>{t("lang2")}</li>
            </ul>
          </div>

          {/* Certificates */}
          <div>
            <h2 className="font-semibold text-[#1e3a5f]">{t("certificates")}</h2>
            <ul className="text-sm mt-2 list-disc list-inside">
              <li>{t("cert1")}</li>
              {/* <li>{t('cert2')}</li>
          <li>{t('cert3')}</li> */}
            </ul>
          </div>

          {/* BTN */}
          <div className="flex items-center justify-end">
            <Link to="/" className="buttonCV">
              {isArabic ? "ملف الأعمال" : "Portfolio"}
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CV;
