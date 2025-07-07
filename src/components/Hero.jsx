import React from 'react';
import heroimage from '../assets/heroSec.jpg';
import { TypeAnimation } from 'react-type-animation';
import { useTranslation } from 'react-i18next'

const Hero = () => {
    const { t, i18n } = useTranslation()

    return (
        <div id='hero' className='grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-[1200px] md:h-[70vh] mx-auto py-8 bg-black'>
            <div className='col-span-2 px-5'>

                <h1 className='text-white text-4xl sm:text-5xl lg:text-7xl font-extrabold'>
                    <span className='primary-color'>
                        {t("hero_title")}
                    </span> <br />
                    <TypeAnimation key={i18n.language}
                        sequence={[t("hero_role1"), 1000, t("hero_role2"), 1000]}
                        wrapper='span'
                        speed={50}
                        repeat={Infinity}
                    />
                </h1>

                <p className='text-white sm:text-lg my-6 lg:text-xl mb-6' dangerouslySetInnerHTML={{ __html: t("hero_description") }}/>


                <div className='mt-2'>
                    <a href="/" className='px-6 py-3 w-full rounded-xl me-4 bg-gradient-to-br bg-primary-color text-white'>{t("download_cv")}</a>
                    <a href="#contact" className='px-6 py-3 w-full rounded-xl border border-gray-400 hover:bg-gradient-to-r from-[#707e32] to-[#5CD2B9] hover:border-none text-white'>{t("text_contact")}</a>
                </div>

            </div>
            <div className='col-span-1 my-auto mx-auto w-[300px] md:h-[60vh] lg:w-[340px]'>
                <img className='rounded-md mt-2' src={heroimage} alt="portfolio" />
            </div>
        </div>
    )
}

export default Hero