import { useTranslation } from 'react-i18next'

const About = () => {
    const { t, i18n } = useTranslation()
    const isArabic = i18n.language === 'ar'

    const aboutCards = [
        { id: 1, label_ar: t('about_label_1'), label_en: t('about_label_1'), description_ar: t('about_description_1'), description_en: t('about_description_1') },
        { id: 2, label_ar: t('about_label_2'), label_en: t('about_label_2'), description_ar: t('about_description_2'), description_en: t('about_description_2') },
        { id: 3, label_ar: t('about_label_3'), label_en: t('about_label_3'), description_ar: t('about_description_3'), description_en: t('about_description_3') },
        { id: 4, label_ar: t('about_label_4'), label_en: t('about_label_4'), description_ar: t('about_description_4'), description_en: t('about_description_4') }
    ]

    return (
        <main className='text-black dark:text-white max-w-[1200px] mx-auto my-20 px-5' id='about'>
            {/* Header Section */}
            <div className='text-center mb-16'>
                <h2 className='text-5xl md:text-6xl font-bold mb-4 text-primary dark:text-primary/90'>
                    {t("about_title")}
                </h2>
                <div className='flex justify-center mb-8 pt-2'>
                    <div className='w-20 h-1 bg-gradient-to-r from-primary via-primary to-transparent rounded-full'></div>
                </div>
                <p className='text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto'>
                    {t("about_subtitle")}
                </p>
            </div>

            {/* Description Cards Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10'>
                {aboutCards.map((des) => {
                    const colors = [
                        "from-cyan-500 to-cyan-600",
                        "from-cyan-500 to-cyan-600",
                        "from-cyan-500 to-cyan-600",
                        "from-cyan-500 to-cyan-600"
                    ]
                    const colorIndex = des.id - 1

                    return (
                        <div
                            key={des.id}
                            className='group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md hover:border-primary dark:hover:border-primary/60 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 dark:hover:shadow-primary/10 p-8 lg:p-10'
                        >
                            {/* Background Gradient */}
                            <div className={`absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br ${colors[colorIndex]} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full blur-3xl`}></div>

                            {/* Card Number - RTL/LTR Support */}
                            <div className={`absolute top-6 ${isArabic ? 'left-6' : 'right-6'} text-6xl font-bold text-primary/5 dark:text-primary/10 group-hover:text-primary/15 transition-colors duration-500 group-hover:scale-110 ${isArabic ? 'origin-top-left' : 'origin-top-right'} transition-transform`}>
                                0{des.id}
                            </div>

                            {/* Card Label */}
                            <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-8 relative z-10 group-hover:text-primary transition-colors duration-300'>
                                {isArabic ? (des.label_ar || des.label_en) : (des.label_en || des.label_ar)}
                            </h3>

                            {/* Content */}
                            <p className='text-gray-700 dark:text-gray-300 text-base lg:text-lg leading-relaxed user-select-none select-none relative z-10'>
                                {isArabic ? (des.description_ar || des.description_en) : (des.description_en || des.description_ar)}
                            </p>

                            {/* Bottom Accent Line */}
                            <div className='absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-transparent group-hover:w-full transition-all duration-500'></div>
                        </div>
                    )
                })}
            </div>

        </main>
    )
}

export default About