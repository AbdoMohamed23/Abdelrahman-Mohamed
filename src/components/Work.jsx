import React from 'react'
import proj1 from '../assets/arino.png'
import proj2 from '../assets/movies.png'
import proj3 from '../assets/portfolio.png'
import proj4 from '../assets/portfolio2.png'
import proj5 from '../assets/leaves.png'
import proj6 from '../assets/restaurant.png'
import { useTranslation } from 'react-i18next'

const Work = () => {
      const { t, i18n } = useTranslation()
  return (
    <div className='max-w-[1200px] min-h-[70vh] mx-auto p-5' id='work'>
      <div className='pb-8'>
        <p className='text-4xl pb-3 font-bold primary-color'>{t("work")}</p>
        <p className='text-gray-400'>{t("work_description")}</p>
      </div>

      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>

        <div className='transform transition-transform duration-300 hover:scale-105 overflow-hidden shadow-lg shadow-[#040c16] group rounded-md flex justify-center items-center h-[200px] bg-cover relative'>
          <img src={proj1} alt="" loading="lazy" />
          <div className='opacity-0 group-hover:opacity-90 bg-[gray]/70 absolute inset-0 flex flex-col justify-center items-center'>
            <span className='text-2xl font-bold text-white tracking-wider'>{t("work_arino")}</span>
            <div className='pt-8 text-center'>
              <a href="https://arino-rep.netlify.app/">
                <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                  {t("work_live")}
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className='transform transition-transform duration-300 hover:scale-105 overflow-hidden shadow-lg shadow-[#040c16] group rounded-md flex justify-center items-center h-[200px] bg-cover relative'>
          <img src={proj3} alt="" loading="lazy" />
          <div className='opacity-0 group-hover:opacity-90 bg-[gray]/70 absolute inset-0 flex flex-col justify-center items-center'>
            <span className='text-2xl font-bold text-white tracking-wider'>{t("work_portfolio")}</span>
            <div className='pt-8 text-center'>
              <a href="https://portfolio-rep.netlify.app/">
                <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                  {t("work_live")}
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className='transform transition-transform duration-300 hover:scale-105 overflow-hidden shadow-lg shadow-[#040c16] group rounded-md flex justify-center items-center h-[200px] bg-cover relative'>
          <img src={proj4} alt="" loading="lazy" />
          <div className='opacity-0 group-hover:opacity-90 bg-[gray]/70 absolute inset-0 flex flex-col justify-center items-center'>
            <span className='text-2xl font-bold text-white tracking-wider'>{t("work_portfolio")}</span>
            <div className='pt-8 text-center'>
              <a href="https://portfolio2-rep.netlify.app/">
                <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                  {t("work_live")}
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className='transform transition-transform duration-300 hover:scale-105 overflow-hidden shadow-lg shadow-[#040c16] group rounded-md flex justify-center items-center h-[200px] bg-cover relative'>
          <img src={proj5} alt="" loading="lazy" />
          <div className='opacity-0 group-hover:opacity-90 bg-[gray]/70 absolute inset-0 flex flex-col justify-center items-center'>
            <span className='text-2xl font-bold text-white tracking-wider'>{t("work_leaves")}</span>
            <div className='pt-8 text-center'>
              <a href="https://leaves-rep.netlify.app/">
                <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                  {t("work_live")}
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className='transform transition-transform duration-300 hover:scale-105 overflow-hidden shadow-lg shadow-[#040c16] group rounded-md flex justify-center items-center h-[200px] bg-cover relative'>
          <img src={proj2} alt="" loading="lazy" />
          <div className='opacity-0 group-hover:opacity-90 bg-[gray]/70 absolute inset-0 flex flex-col justify-center items-center'>
            <span className='text-2xl font-bold text-white tracking-wider'>{t("work_movies")}</span>
            <div className='pt-8 text-center'>
              <a href="https://movies-rep.netlify.app/">
                <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                  {t("work_live")}
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className='transform transition-transform duration-300 hover:scale-105 overflow-hidden shadow-lg shadow-[#040c16] group rounded-md flex justify-center items-center h-[200px] bg-cover relative'>
          <img src={proj6} alt="" loading="lazy" />
          <div className='opacity-0 group-hover:opacity-90 bg-[gray]/70 absolute inset-0 flex flex-col justify-center items-center'>
            <span className='text-2xl font-bold text-white tracking-wider'>{t("work_restaurant")}</span>
            <div className='pt-8 text-center'>
              <a href="https://restaurant-rep.netlify.app/">
                <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                  {t("work_live")}
                </button>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Work