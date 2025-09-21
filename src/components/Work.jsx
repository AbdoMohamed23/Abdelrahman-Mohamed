import proj1 from '../assets/arino.png'
import proj2 from '../assets/movies.webp'
import proj3 from '../assets/portfolio.png'
import proj4 from '../assets/portfolio2.png'
import proj5 from '../assets/leaves.png'
import proj6 from '../assets/restaurant.webp'
import { useTranslation } from 'react-i18next'

const Work = () => {
  const { t } = useTranslation()

  const works = [
    { title: t("work_arino"), image: proj1, description: t("work_arino_des"), link: "https://arino-rep.netlify.app/" },
    { title: t("work_movies"), image: proj2, description: t("work_movies_des"), link: "https://movies-rep.netlify.app/" },
    { title: t("work_portfolio"), image: proj3, description: t("work_portfolio_des"), link: "https://portfolio-rep.netlify.app/" },
    { title: t("work_portfolio"), image: proj4, description: t("work_portfolio_des"), link: "https://portfolio2-rep.netlify.app/" },
    { title: t("work_leaves"), image: proj5, description: t("work_leaves_des"), link: "https://leaves-rep.netlify.app/" },
    { title: t("work_restaurant"), image: proj6, description: t("work_restaurant_des"), link: "https://restaurant-rep.netlify.app/" },
  ]
  return (
    <main className='max-w-[1200px] min-h-[70vh] mx-auto p-5' id='work'>
      <div className='pb-8'>
        <p className='text-4xl pb-3 font-bold text-primary'>{t("work")}</p>
        <p className='text-gray-400'>{t("work_description")}</p>
      </div>

      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>

        {
          works.map((work) => {
            return (
              <div key={work.id} className='border border-slate-700 hover:border-primary shadow-lg shadow-gray-900/90 rounded-md h-auto my-3 bg-cover'>
                <img src={work.image} alt={work.title} className='rounded-t-md' loading="lazy" />
                <div className='p-3 flex flex-col gap-2'>
                  <h2 className='text-lg font-bold text-white tracking-wider'>{work.title}</h2>
                  <p className='text-gray-500'>{work.description}</p>
                  <div>
                    <a href={work.link}>
                      <button className='text-center rounded-lg mt-3 px-3 py-1 text-primary bg-primary/20 font-semibold text-xl md:text-lg'>
                        {t("work_live")}
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            )
          })
        }

      </div>
    </main>
  )
}

export default Work