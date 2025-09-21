import hero_image from '../assets/Abdelrahman-.jpg'
import { useTranslation } from 'react-i18next'

const About = () => {
    const { t } = useTranslation()
    const description = [
        { id: 1, text: t("about_description_1") },
        { id: 2, text: t("about_description_2") },
        { id: 3, text: t("about_description_3") },
    ]

    return (
        <main className='text-white max-w-[1200px] mx-auto my-20' id='about'>

            <div className='grid grid-cols-1 md:grid-cols-2 sm:py-16 items-center gap-12 py-5'>

                <div className='mt-4 md:mt-0 text-start flex'>
                    <div className='my-auto mx-6'>
                        <h2 className='text-4xl font-bold mb-10 text-primary'>{t("about_title")}</h2>
                        {description.map((des) =>
                            <div key={des.id} className='p-4 mb-4 border border-gray-700 rounded-lg bg-gray-900/50 hover:border-primary shadow-lg shadow-gray-900/90'>
                                <p className='text-base lg:text-lg'>{des.text}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className='mx-8'>
                    <img className='mx-auto rounded-full shadow-xl shadow-red-800' width={400} src={hero_image} alt={t("text_name")} />
                </div>

            </div>

        </main>
    )
}

export default About