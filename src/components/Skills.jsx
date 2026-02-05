import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'

const Skills = () => {
  const { t } = useTranslation()

  const skills = [
    // Frontend
    { id: 1, name: 'HTML', category: 'frontend', icon: 'fab fa-html5' },
    { id: 2, name: 'CSS', category: 'frontend', icon: 'fab fa-css3' },
    { id: 3, name: 'JavaScript', category: 'frontend', icon: 'fab fa-js' },
    { id: 4, name: 'React.js', category: 'frontend', icon: 'fab fa-react' },
    {
      id: 5,
      name: 'Tailwind CSS',
      category: 'frontend',
      iconSvg: (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="w-10 h-10 md:w-12 md:h-12 text-primary dark:text-primary/80 mb-3 group-hover:scale-125 group-hover:-translate-y-1 transition-all duration-500 relative z-10"
          fill="none"
        >
          <path
            fill="currentColor"
            d="M12 6.5c-2.8 0-4.55 1.4-5.25 4.2 1.05-1.4 2.28-1.92 3.68-1.57.8.2 1.37.78 2 1.42.95.97 2.05 2.1 4.57 2.1 2.8 0 4.55-1.4 5.25-4.2-1.05 1.4-2.28 1.92-3.68 1.57-.8-.2-1.37-.78-2-1.42C15.62 7.63 14.52 6.5 12 6.5Zm-5.25 5.3c-2.8 0-4.55 1.4-5.25 4.2 1.05-1.4 2.28-1.92 3.68-1.57.8.2 1.37.78 2 1.42.95.97 2.05 2.1 4.57 2.1 2.8 0 4.55-1.4 5.25-4.2-1.05 1.4-2.28 1.92-3.68 1.57-.8-.2-1.37-.78-2-1.42-.95-.97-2.05-2.1-4.57-2.1Z"
          />
        </svg>
      )
    },
    { id: 6, name: 'Bootstrap', category: 'frontend', icon: 'fab fa-bootstrap' },
    // Backend
    { id: 7, name: 'PHP', category: 'backend', icon: 'fab fa-php' },
    { id: 8, name: 'Laravel', category: 'backend', icon: 'fab fa-laravel' },
    { id: 9, name: 'Node.js', category: 'backend', icon: 'fab fa-node' },
    { id: 10, name: 'Strapi', category: 'backend', icon: 'fas fa-server' },
    { id: 11, name: 'MySQL', category: 'backend', icon: 'fas fa-database' },
    // E-Commerce Platforms
    { id: 12, name: 'Shopify', category: 'ecommerce', icon: 'fab fa-shopify' },
    { id: 13, name: 'Shopify Liquid', category: 'ecommerce', icon: 'fas fa-code' },
    { id: 14, name: 'Wix', category: 'ecommerce', icon: 'fab fa-wix' },
    { id: 15, name: 'Zid', category: 'ecommerce', icon: 'fas fa-shopping-bag' },
    {
      id: 16,
      name: 'Nicepage',
      category: 'ecommerce',
      iconSvg: (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="w-10 h-10 md:w-12 md:h-12 text-primary dark:text-primary/80 mb-3 group-hover:scale-125 group-hover:-translate-y-1 transition-all duration-500 relative z-10"
          fill="none"
        >
          <path
            fill="currentColor"
            d="M6 18V6h3l6 8V6h3v12h-3l-6-8v8H6Z"
          />
        </svg>
      )
    },
    // Tools & Other
    { id: 17, name: 'Git', category: 'tools', icon: 'fab fa-git-alt' },
    { id: 18, name: 'GitHub', category: 'tools', icon: 'fab fa-github' },
    { id: 19, name: 'i18next', category: 'tools', icon: 'fas fa-language' },
    { id: 20, name: 'SEO', category: 'tools', icon: 'fas fa-search' },
    { id: 21, name: 'Research', category: 'tools', icon: 'fas fa-microscope' },
    { id: 22, name: 'RTL/LTR Support', category: 'tools', icon: 'fas fa-align-right' },
  ]

  const groupedSkills = useMemo(() => {
    return skills.reduce((acc, skill) => {
      const category = skill.category || 'other'
      acc[category] = acc[category] || []
      acc[category].push(skill)
      return acc
    }, {})
  }, [])

  const categories = [
    { key: 'frontend', title: 'FRONTEND', grid: 'grid-flow-col auto-cols-[minmax(140px,1fr)] overflow-x-auto' },
    { key: 'backend', title: 'BACKEND', grid: 'grid-flow-col auto-cols-[minmax(140px,1fr)] overflow-x-auto' },
    { key: 'ecommerce', title: 'E-COMMERCE PLATFORMS', grid: 'grid-flow-col auto-cols-[minmax(140px,1fr)] overflow-x-auto' },
    { key: 'tools', title: 'TOOLS & OTHER', grid: 'grid-flow-col auto-cols-[minmax(140px,1fr)] overflow-x-auto' }
  ]

  const getSkillName = (skill) => {
    return skill.name
  }

  return (
    <section id="skills" className="relative py-20 px-5 min-h-screen flex flex-col items-center justify-center dark:bg-dark_ overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 opacity-10 dark:opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/80/30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/80/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      {/* Animated Gradient Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Horizontal Lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent line-1"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent line-2"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent line-1"></div>

        {/* Vertical Lines */}
        <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-primary/35 to-transparent line-3"></div>
        <div className="absolute right-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent line-3" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container max-w-6xl mx-auto text-center relative z-10">
        {/* Title Section */}
        <div className='text-center mb-16'>
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-primary dark:text-primary/90">{t("skills_description")}</h2>
          <div className='flex justify-center mb-8 pt-2'>
            <div className='w-20 h-1 bg-gradient-to-r from-primary via-primary to-transparent rounded-full'></div>
          </div>
          <p className='text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto'>{t("skills_subtitle")}</p>
        </div>

        {
          categories.map((category) => {
            const items = groupedSkills[category.key] || []
            if (!items.length) return null

            return (
              <div key={category.key} className="mb-16">
                <h3 className="text-3xl font-bold mb-8 text-primary dark:text-primary/80">{category.title}</h3>
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-1 bg-gradient-to-r from-primary via-primary to-transparent rounded-full"></div>
                </div>
                <div className={`grid ${category.grid} gap-4 md:gap-6`}>
                  {items.map((skill) => (
                    <div
                      key={skill.id}
                      className="group skill-item relative bg-gray-50 dark:bg-contact/50 rounded-2xl p-5 md:p-6 border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary/80 transition-all duration-500 flex flex-col items-center justify-center cursor-pointer overflow-hidden hover:shadow-2xl hover:shadow-primary/20 dark:hover:shadow-primary/10"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      {skill.iconSvg ? (
                        skill.iconSvg
                      ) : (
                        <i className={`${skill.icon || 'fas fa-code'} text-4xl md:text-5xl text-primary dark:text-primary/80 mb-3 group-hover:scale-125 group-hover:-translate-y-1 transition-all duration-500 relative z-10`}></i>
                      )}
                      <span className="text-gray-800 dark:text-white text-xs md:text-sm font-medium group-hover:text-primary dark:group-hover:text-primary/90 transition-all duration-300 relative z-10">
                        {getSkillName(skill)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })
        }
      </div>
    </section>
  );
};

export default Skills;
