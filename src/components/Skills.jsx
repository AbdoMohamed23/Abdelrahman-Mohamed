import React from 'react'
import liquid from '../assets/liquid.png';
import bootstrap from '../assets/bootstrap.png';
import javascript from '../assets/javascript.png';
import tailwind from '../assets/tailwind.png';
import react from '../assets/react.png';
import { useTranslation } from 'react-i18next'

const Skills = () => {
      const { t, i18n } = useTranslation()

  return (
    <div className='border border-gray-600 bg-black text-gray-400 md:h-[150px] max-w-[1200px] mx-auto grid grid-cols-6 place-items-center md:flex md:justify-between md:items-center'>

        <h2 className='text-gray-700 text-xl md:text-4xl font-bold m-4'dangerouslySetInnerHTML={{ __html: t("skills_description") }}>
        </h2>

        <div className='flex flex-col items-center m-4 sm:my-0 w-[40px] md:w-[100px]'>
          <img src={liquid} alt="" width={100} height={100} />
          <p className='mt-2'>Liquid</p>
        </div>
        
        <div className='flex flex-col items-center m-4 sm:my-0 w-[40px] md:w-[100px]'>
          <img src={bootstrap} alt="" width={100} height={100} />
          <p className='mt-2'>Bootstrap</p>
        </div>
        
        <div className='flex flex-col items-center m-4 sm:my-0 w-[40px] md:w-[100px]'>
          <img src={javascript} alt="" width={100} height={100} />
          <p className='mt-2'>Javascript</p>
        </div>
        
        <div className='flex flex-col items-center m-4 sm:my-0 w-[40px] md:w-[100px]'>
          <img src={tailwind} alt="" width={100} height={100} />
          <p className='mt-2'>Tailwind</p>
        </div>
        
        <div className='flex flex-col items-center m-4 sm:my-0 w-[40px] md:w-[100px]'>
          <img src={react} alt="" width={100} height={100} />
          <p className='mt-2'>React</p>
        </div>
        
    </div>
  )
}

export default Skills