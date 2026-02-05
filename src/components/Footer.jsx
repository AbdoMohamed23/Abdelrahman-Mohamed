import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className='max-w-[1200px] sm:h-[150px] p-12 flex justify-between mx-auto sm:mb-0 mb-10'>
      <span className='text-primary '>{t("footer_title")}</span>
      <p className='text-gray-700 dark:text-gray-600' dangerouslySetInnerHTML={{ __html: t("footer_des") }} />
    </footer>
  )
}

export default Footer