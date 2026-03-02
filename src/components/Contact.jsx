import { useTranslation } from 'react-i18next'

const Contact = () => {
  const { t } = useTranslation()

  const contactSettings = {
    whatsapp_url: 'https://wa.me/message/UY6ZK2UKESRFB1',
    email: 'abdomohamed0139@gmail.com',
    linkedin_url: 'https://www.linkedin.com/in/abdelrahman-mohamed-09490136b',
    instagram_url: 'https://www.instagram.com/e.abdulrahman_mohamed',
    facebook_url: 'https://www.facebook.com/share/17pvKtKJKr/',
    github_url: 'https://github.com/abdomohamed23'
  }

  return (
    <main className='text-black dark:text-white max-w-[1200px] mx-auto my-20 px-5' id='contact'>
      {/* Header Section */}
      <div className='text-center mb-16'>
        <h2 className='text-5xl md:text-6xl font-bold mb-4 text-primary dark:text-primary/90'>{t("text_contact")}</h2>
        <div className='flex justify-center mb-8 pt-2'>
          <div className='w-20 h-1 bg-gradient-to-r from-primary via-primary to-transparent rounded-full'></div>
        </div>
        <p className='text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto'>
          {t("contact_description") || "Let's connect! Reach out through any of the channels below."}
        </p>
      </div>

      {/* Contact Content */}
      <div className='max-w-[800px] mx-auto'>

        {/* Contact Links */}
        <div className='bg-white dark:bg-contact/50 border border-gray-300 dark:border-gray-800 rounded-xl shadow-lg'>
          <div className='p-10'>

            <div>
              <h1 className='mb-6 text-primary text-2xl font-bold text-center'>{t("text_name")}</h1>
              <div className='grid grid-cols-1 gap-4'>
                <a href={contactSettings?.whatsapp_url} target='_blank' rel='noopener noreferrer'
                  className='relative group hover:text-primary transition-all duration-300 w-full px-6 py-4 text-black dark:text-white border-2 border-gray-300 dark:border-gray-700 hover:border-primary dark:hover:border-primary rounded-lg focus:outline-none overflow-hidden'>
                  <span className='relative z-10 flex items-center justify-center gap-3'>
                    <i className='fab fa-whatsapp text-2xl'></i>
                    <span className='font-medium'>{t("text_contact_whatsapp")}</span>
                  </span>
                  <span className='absolute inset-0 w-0 bg-primary/10 dark:bg-primary/20 transition-all duration-300 ease-out group-hover:w-full'></span>
                </a>

                <a href={`mailto:${contactSettings?.email || ''}?subject=Contact&body=Hello`}
                  className='relative group hover:text-primary transition-all duration-300 w-full px-6 py-4 text-black dark:text-white border-2 border-gray-300 dark:border-gray-700 hover:border-primary dark:hover:border-primary rounded-lg focus:outline-none overflow-hidden'>
                  <span className='relative z-10 flex items-center justify-center gap-3'>
                    <i className='fas fa-envelope text-2xl'></i>
                    <span className='font-medium'>{t("text_contact_email")}</span>
                  </span>
                  <span className='absolute inset-0 w-0 bg-primary/10 dark:bg-primary/20 transition-all duration-300 ease-out group-hover:w-full'></span>
                </a>

                <a href={contactSettings?.linkedin_url} target='_blank' rel='noopener noreferrer'
                  className='relative group hover:text-primary transition-all duration-300 w-full px-6 py-4 text-black dark:text-white border-2 border-gray-300 dark:border-gray-700 hover:border-primary dark:hover:border-primary rounded-lg focus:outline-none overflow-hidden'>
                  <span className='relative z-10 flex items-center justify-center gap-3'>
                    <i className='fab fa-linkedin text-2xl'></i>
                    <span className='font-medium'>{t("text_contact_linked")}</span>
                  </span>
                  <span className='absolute inset-0 w-0 bg-primary/10 dark:bg-primary/20 transition-all duration-300 ease-out group-hover:w-full'></span>
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className='mt-10 pt-8 border-t border-gray-300 dark:border-gray-700'>
              <p className='text-center text-gray-600 dark:text-gray-400 mb-6 font-medium text-lg'>{t("follow_me")}</p>
              <div className='flex justify-center gap-6'>
                <a href={contactSettings?.instagram_url} target='_blank' rel='noopener noreferrer'
                  className='group relative p-4 rounded-full border-2 border-primary/30 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1'>
                  <i className='fab fa-instagram text-primary text-2xl group-hover:scale-110 transition-all duration-300'></i>
                </a>
                <a href={contactSettings?.facebook_url} target='_blank' rel='noopener noreferrer'
                  className='group relative p-4 rounded-full border-2 border-primary/30 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1'>
                  <i className='fab fa-facebook text-primary text-2xl group-hover:scale-110 transition-all duration-300'></i>
                </a>
                <a href={contactSettings?.github_url} target='_blank' rel='noopener noreferrer'
                  className='group relative p-4 rounded-full border-2 border-primary/30 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1'>
                  <i className='fab fa-github text-primary text-2xl group-hover:scale-110 transition-all duration-300'></i>
                </a>
                <a href={`mailto:${contactSettings?.email || ''}`}
                  className='group relative p-4 rounded-full border-2 border-primary/30 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1'>
                  <i className='fas fa-envelope text-primary text-2xl group-hover:scale-110 transition-all duration-300'></i>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  )
}

export default Contact