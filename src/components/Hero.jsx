import React from 'react';
import heroimage from '../assets/WhatsApp Image 2025-03-17 at 4.33.42 PM.jpeg';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-[1200px] md:h-[70vh] mx-auto py-8 bg-black'>
            <div className='col-span-2 px-5'>

                <h1 className='text-white text-4xl sm:text-5xl lg:text-8xl font-extrabold'>
                    <span className='primary-color'>
                        M7LAWY 🏴‍☠️
                    </span> <br />
                    <TypeAnimation
                    sequence={[
                        "Frontend Dev",
                        1000,
                        "Webdesginer",
                        1000,
                    ]}
                    wrapper='span'
                    speed={50}
                    repeat={Infinity}
                    />
                </h1>

                <p className='text-white sm:text-lg my-6 lg:text-xl mb-6'>
                SkillsFront-End Development: React.js, Vue.js, JavaScript (ES6+), HTML5, CSS3 <br />Back-End Development: Node.js, APIsStyling <br />UI Design: Tailwind CSS, Bootstrap, Responsive DesignVersion Control: Git, GitHubTools and Platforms: Webpack, npm, Vercel, Netlify.
                </p>

                <div>
                    <a href="/" className='px-6 py-3 w-full rounded-xl mr-4 bg-gradient-to-br bg-primary-color text-white'>Download CV</a>
                    <a href="/" className='px-6 py-3 w-full rounded-xl border border-gray-400 hover:bg-gradient-to-r from-[#707e32] to-[#5CD2B9] hover:border-none text-white'>Contact</a>
                </div>

            </div>
            <div className='col-span-1 my-auto mx-auto w-[300px] h-auto lg:w-[340px]'>
                <img className='rounded-full' src={heroimage} alt="hero image" />
            </div>
        </div>
    )
}

export default Hero