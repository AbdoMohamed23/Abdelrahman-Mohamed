import { useTranslation } from 'react-i18next'

const Footer = () => {
      const { t } = useTranslation()
  
  return (
    <div className='max-w-[1200px] sm:h-[150px] p-12 flex justify-between mx-auto sm:mb-0 mb-10'>
        <span className='primary-color'>{t("footer_title")}</span>
        <p className='text-gray-600' dangerouslySetInnerHTML={{ __html: t("footer_des") }}/>
    </div>
  )
}

export default Footer