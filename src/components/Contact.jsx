import React from 'react'
import { useTranslation } from 'react-i18next'

const Contact = () => {
    const { t, i18n } = useTranslation()

  return (
    <div className='max-w-[800px] mx-auto bg-black sm:py-20 p-5' id='contact'>
        <div className='text-center'>
          <h2 className='text-4xl pb-2 font-bold leading-tight primary-color'>{t("text_contact")}</h2>
        </div>
        
        <div className='max-w-[800px] mx-auto'>

          <div className='mt-6 bg-[#161616] rounded-xl'>
            <div className='p-10'>

              <card>
                <h1 className='text-white mb-2 primary-color text-2xl'>{t("text_name")}</h1>
                <div className='grid grid-cols-1 gap-x-5 gap-y-4'>
                  <div>
                    <div className='mt-2.5 flex justify-center'>
                      <a href='https://wa.me/message/UY6ZK2UKESRFB1' 
                      className='bg-[#161616] w-full px-4 py-4 text-gray-400 placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:border-pink-600' >{t("text_contact_whatsapp")}</a>
                    </div>
                  </div>
                  
                  <div>
                    <div className='mt-2.5 flex justify-center'>
                      <a href='mailto:abdomohamed0139@gmail.com?subject=Contact&body=Hello Abdo' 
                        className='bg-[#161616] w-full px-4 py-4 text-gray-400 placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:border-pink-600' >{t("text_contact_email")}</a>
                    </div>
                  </div>

                  <div>
                    <div className='mt-2.5 flex justify-center'>
                      <a href='https://www.linkedin.com/in/abdelrahman-mohamed-09490136b'
                        className='bg-[#161616] w-full px-4 py-4 text-gray-400 placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:border-pink-600' >{t("text_contact_linked")}</a>
                    </div>
                  </div>

                </div>
              </card>

            </div>
          </div>

        </div>
    </div>
  )
}

export default Contact