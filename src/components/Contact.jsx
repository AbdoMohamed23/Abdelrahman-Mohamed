import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Contact = () => {
  const { t } = useTranslation()

  return (
    <main className='max-w-[800px] mx-auto sm:py-20 p-5' id='contact'>
      <div className='text-center'>
        <h2 className='text-4xl pb-2 font-bold leading-tight text-primary'>{t("text_contact")}</h2>
      </div>

      <div className='max-w-[800px] mx-auto'>

        <div className='mt-6 bg-contact border border-gray-800 rounded-xl'>
          <div className='p-10'>

            <div>
              <h1 className='mb-2 text-primary text-2xl'>{t("text_name")}</h1>
              <div className='grid grid-cols-1 gap-x-5 gap-y-4'>
                <div>
                  <div className='mt-2.5 flex justify-center'>
                    <Link to='https://wa.me/message/UY6ZK2UKESRFB1' rel='noopener noreferrer'
                      className='relative group hover:text-primary transition-transform duration-300 w-full px-4 py-4 text-white  border border-gray-700 rounded-md focus:outline-none focus:border-pink-600' >
                      <span className='relative'>{t("text_contact_whatsapp")}</span>
                      <span className='absolute inset-0 w-0 bg-black/20 transition-all duration-300 ease-out group-hover:w-full'></span>
                    </Link>
                  </div>
                </div>

                <div>
                  <div className='mt-2.5 flex justify-center'>
                    <Link to='mailto:abdomohamed0139@gmail.com?subject=Contact&body=Hello Abdo' rel='noopener noreferrer'
                      className='relative group hover:text-primary transition-transform duration-300 w-full px-4 py-4 text-white  border border-gray-700 rounded-md focus:outline-none focus:border-pink-600' >
                      <span className='relative'>{t("text_contact_email")}</span>
                      <span className='absolute inset-0 w-0 bg-black/20 transition-all duration-300 ease-out group-hover:w-full'></span>
                    </Link>
                  </div>
                </div>

                <div>
                  <div className='mt-2.5 flex justify-center'>
                    <Link to='https://www.linkedin.com/in/abdelrahman-mohamed-09490136b' rel='noopener noreferrer'
                      className='relative group hover:text-primary transition-transform duration-300 w-full px-4 py-4 text-white  border border-gray-700 rounded-md focus:outline-none focus:border-pink-600' >
                      <span className='relative'>{t("text_contact_linked")}</span>
                      <span className='absolute inset-0 w-0 bg-black/20 transition-all duration-300 ease-out group-hover:w-full'></span>
                    </Link>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  )
}

export default Contact