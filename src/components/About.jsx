import React from 'react'
import aboutImg from '../assets/about.jpg'

const About = () => {
  return (
    <div className='text-white max-w-[1200px] mx-auto my-12' id='about'>
        
        <div className='md:grid md:grid-cols-2 sm:py-16'>

            <div className='mt-4 md:mt-0 text-left flex'>
                <div className='my-auto mx-6'>
                    <h2 className='text-4xl font-bold mb-4 primary-color'>About Me</h2>
                    <p className='text-base lg:text-lg'>I am a passionate and dedicated web developer with expertise in modern front-end technologies. With a strong background in building responsive and user-friendly web applications, I thrive on creating seamless digital experiences. My skill set includes:React.js and Vue.js for building dynamic and interactive user interfaces.Node.js for developing robust server-side applications and RESTful APIs.Tailwind CSS and Bootstrap for crafting visually appealing and responsive designs.I am committed to continuous learning and staying updated with the latest trends and best practices in web development. I enjoy working on challenging projects that push my abilities and allow me to grow as a developer. Whether collaborating with a team or working independently, I aim to deliver high-quality code and efficient solutions.</p>
                </div>
            </div>

            <img className='mx-auto rounded-3xl py-8 md:py-0' src={aboutImg} alt="" width={300} height={300} />
            
        </div>

    </div>
  )
}

export default About