import proj1 from '../assets/arino.png'
import proj2 from '../assets/movies.webp'
import proj3 from '../assets/portfolio.png'
import proj4 from '../assets/portfolio2.png'
import proj5 from '../assets/leaves.png'
import proj6 from '../assets/restaurant.webp'
import { useTranslation } from 'react-i18next'

const Work = () => {
  const { t } = useTranslation()
  const projects = [
    { id: 1, title: 'work_arino', description: 'work_arino_des', image: proj1, link: 'https://arino-rep.netlify.app/' },
    { id: 2, title: 'work_movies', description: 'work_movies_des', image: proj2, link: 'https://movies-rep.netlify.app/' },
    { id: 3, title: 'work_portfolio', description: 'work_portfolio_des', image: proj3, link: 'https://portfolio-rep.netlify.app/' },
    { id: 4, title: 'work_portfolio', description: 'work_portfolio_des', image: proj4, link: 'https://portfolio2-rep.netlify.app/' },
    { id: 5, title: 'work_leaves', description: 'work_leaves_des', image: proj5, link: 'https://leaves-rep.netlify.app/' },
    { id: 6, title: 'work_restaurant', description: 'work_restaurant_des', image: proj6, link: 'https://restaurant-rep.netlify.app/' }
  ]

  const works = projects.map((project) => ({
    id: project.id,
    title: t(project.title),
    image: project.image,
    description: t(project.description),
    link: project.link
  }))
  return (
    <main className='max-w-[1200px] min-h-[70vh] mx-auto p-5' id='work'>
      {/* Header Section */}
      <div className='text-center mb-16'>
        <h2 className='text-5xl md:text-6xl font-bold mb-4 text-primary dark:text-primary/90'>{t("work")}</h2>
        <div className='flex justify-center mb-8 pt-2'>
          <div className='w-20 h-1 bg-gradient-to-r from-primary via-primary to-transparent rounded-full'></div>
        </div>
        <p className='text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto'>{t("work_description")}</p>
      </div>

      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
        {
          works.map((work, index) => {
            return (
              <a
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                key={work.id}
              >
                <div
                  className='group relative overflow-hidden rounded-2xl border border-primary dark:border-primary/80 hover:border-primary dark:hover:border-primary/80 sm:border-gray-200 sm:dark:border-gray-800 sm:hover:border-primary sm:dark:hover:border-primary/80 transition-all duration-500 bg-gray-50 dark:bg-contact/50 sm:hover:shadow-lg sm:hover:shadow-primary/30 cursor-pointer flex flex-col'
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Image Container */}
                  <div className='relative w-full overflow-hidden'>
                    <img
                      src={work.image}
                      alt={work.title}
                      className='w-full h-auto object-contain scale-105 sm:group-hover:scale-105 sm:scale-100 transition-transform duration-500'
                      loading="lazy"
                    />

                    {/* Bottom Accent Line */}
                    <div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 transform scale-x-100 sm:scale-x-0 sm:group-hover:scale-x-100 transition-transform duration-500'></div>
                  </div>

                  {/* Content Container */}
                  <div className='p-6 flex flex-col gap-3 flex-grow'>
                    <h2 className='text-xl font-bold text-primary dark:text-primary/90 sm:text-gray-900 sm:dark:text-white'>
                      {work.title}
                    </h2>
                    <p className='text-gray-700 dark:text-gray-300 sm:text-gray-600 sm:dark:text-gray-400 text-sm leading-relaxed'>
                      {work.description}
                    </p>
                  </div>
                </div>
              </a>
            )
          })
        }
      </div>
    </main>
  )
}

export default Work