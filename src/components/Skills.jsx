import React from "react";
import { useTranslation } from "react-i18next";

import liquid from "../assets/liquid.png";
import bootstrap from "../assets/bootstrap.png";
import javascript from "../assets/javascript.png";
import tailwind from "../assets/tailwind.png";
import react from "../assets/react.png";
import html from "../assets/html.png";
import css from "../assets/css.png";

const skillsList = [
  { name: "HTML", img: html },
  { name: "CSS", img: css },
  { name: "Javascript", img: javascript },
  { name: "Bootstrap", img: bootstrap },
  { name: "Tailwind", img: tailwind },
  { name: "React", img: react },
  { name: "Liquid", img: liquid },
];

const Skills = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  // تكرار العناصر مرتين لتجنب الفراغ
  const repeatedSkills = [...skillsList, ...skillsList, ...skillsList];

  return (
    <div className="max-w-[1200px] mx-auto my-12 overflow-hidden" id="skills">
      <h2 className="text-4xl font-bold pb-4 mb-3 mx-6 primary-color">{t("skills_description")}</h2>

      <div className="relative w-full py-6 text-gray-400 overflow-hidden border border-gray-600">
        <div className={`flex gap-12 w-max items-center px-4 ${isArabic ? "animate-slide-rtl" : "animate-slide-ltr"}`}>
          {repeatedSkills.map((skill, index) => (
            <div key={index} className="flex flex-col items-center min-w-[70px] sm:min-w-[90px] md:min-w-[110px]">
              <img src={skill.img} alt={skill.name} className="w-14 sm:w-16 md:w-20" />
              <p className="mt-2 text-sm">{skill.name}</p>
            </div>
          ))} {/* map */}
        </div>
      </div>
    </div>
  );
};

export default Skills;
