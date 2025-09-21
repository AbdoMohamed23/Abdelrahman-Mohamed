import hero_image from '../assets/Abdelrahman-.jpg';
import { TypeAnimation } from 'react-type-animation';
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom';

const Hero = () => {
    const { t, i18n } = useTranslation()

    return (
        <main id='hero' className='max-w-[1200px] grid grid-cols-1 sm:grid-cols-3 gap-8 items-center mx-auto my-10 md:mt-40'>
            <div className='col-span-1 sm:col-span-2 order-2 md:order px-5'>

                <h1 className='text-white text-4xl sm:text-5xl lg:text-7xl font-extrabold flex flex-col gap-4'>
                    <span className='text-primary'>
                        {t("hero_title")}
                    </span>
                    <TypeAnimation key={i18n.language}
                        sequence={[t("hero_role1"), 1000, t("hero_role2"), 1000]}
                        wrapper='span'
                        speed={50}
                        repeat={Infinity}
                    />
                </h1>

                <p className='text-white sm:text-lg my-6 lg:text-xl' dangerouslySetInnerHTML={{ __html: t("hero_description") }} />

                <div className='mt-8'>
                    <a href="/Abdelrahman-Dev.pdf" download={"Abdelrahman-Dev.pdf"} className='inline-flex px-6 py-2 rounded-full me-4 border border-primary hover:bg-primary hover:shadow-md hover:shadow-primary transition-all duration-300 hover:scale-[1.05] text-white'>{t("download_cv")}</a>
                    <Link to="/CV" className='relative inline-flex group text-white px-6 py-2 rounded-full border border-primary bg-primary transition-all duration-300 hover:scale-[1.05]'>
                        <span className='relative'>{t('cv_title')}</span>
                        <span className='absolute inset-0 w-0 bg-black/20 transition-all duration-300 ease-out group-hover:w-full pointer-events-none'></span>
                    </Link>
                </div>

            </div>
            <div className='col-span-1 order-1 md:order-2 w-[300px] md:h-[60vh] lg:w-[340px] mx-auto'>
                <img className='rounded-full shadow-xl shadow-red-800' src={hero_image} alt={t("text_name")} />
            </div>
        </main>
    )
}

export default Hero