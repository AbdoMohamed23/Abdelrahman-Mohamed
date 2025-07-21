import React from 'react'
import aboutImg from '../assets/hero-section.jpg'
import { useTranslation } from 'react-i18next'

const About = () => {
    const { t, i18n } = useTranslation()

  return (
    <div className='text-white max-w-[1200px] mx-auto my-12' id='about'>
        
        <div className='md:grid md:grid-cols-2 sm:py-16'>

            <div className='mt-4 md:mt-0 text-start flex'>
                <div className='my-auto mx-6'>
                    <h2 className='text-4xl font-bold pb-4 primary-color'>{t("about_title")}</h2>
                    <p className='text-base lg:text-lg'>{t("about_description")}</p>
                </div>
            </div>

            <img className='mx-auto rounded-3xl md:my-auto mt-12' src={aboutImg} alt="" width={300} height={300} />
            
        </div>

    </div>
  )
}

export default About