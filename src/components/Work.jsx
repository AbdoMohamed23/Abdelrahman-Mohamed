import React from 'react'
import proj1 from '../assets/arino.png'
import proj2 from '../assets/movies.png'
import proj3 from '../assets/portfolio.png'
import proj4 from '../assets/portfolio2.png'
import proj5 from '../assets/leaves.png'
import proj6 from '../assets/restaurant.png'

const Work = () => {
  return (
    <div className='max-w-[1200px] mx-auto p-5' id='work'>
      <div className='pb-8'>
        <p className='text-4xl mb-3 font-bold primary-color'>Work</p>
        <p className='text-gray-400'>Check out some of mt recent work</p>
      </div>

      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>

        <div className='transform transition-transform duration-300 hover:scale-105 overflow-hidden shadow-lg shadow-[#040c16] group rounded-md flex justify-center items-center h-[200px] bg-cover relative'>
          <img src={proj1} alt="" />
          <div className='opacity-0 group-hover:opacity-90 bg-[gray]/70 absolute inset-0 flex flex-col justify-center items-center'>
            <span className='text-2xl font-bold text-white tracking-wider'>Arino</span>
            <div className='pt-8 text-center'>
              <a href="https://arino-rep.netlify.app/">
                <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                  Live
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className='transform transition-transform duration-300 hover:scale-105 overflow-hidden shadow-lg shadow-[#040c16] group rounded-md flex justify-center items-center h-[200px] bg-cover relative'>
          <img src={proj3} alt="" />
          <div className='opacity-0 group-hover:opacity-90 bg-[gray]/70 absolute inset-0 flex flex-col justify-center items-center'>
            <span className='text-2xl font-bold text-white tracking-wider'>Portfolio</span>
            <div className='pt-8 text-center'>
              <a href="https://portfolio-rep.netlify.app/">
                <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                  Live
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className='transform transition-transform duration-300 hover:scale-105 overflow-hidden shadow-lg shadow-[#040c16] group rounded-md flex justify-center items-center h-[200px] bg-cover relative'>
          <img src={proj4} alt="" />
          <div className='opacity-0 group-hover:opacity-90 bg-[gray]/70 absolute inset-0 flex flex-col justify-center items-center'>
            <span className='text-2xl font-bold text-white tracking-wider'>Portfolio 2</span>
            <div className='pt-8 text-center'>
              <a href="https://portfolio2-rep.netlify.app/">
                <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                  Live
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className='transform transition-transform duration-300 hover:scale-105 overflow-hidden shadow-lg shadow-[#040c16] group rounded-md flex justify-center items-center h-[200px] bg-cover relative'>
          <img src={proj5} alt="" />
          <div className='opacity-0 group-hover:opacity-90 bg-[gray]/70 absolute inset-0 flex flex-col justify-center items-center'>
            <span className='text-2xl font-bold text-white tracking-wider'>Leaves</span>
            <div className='pt-8 text-center'>
              <a href="https://leaves-rep.netlify.app/">
                <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                  Live
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className='transform transition-transform duration-300 hover:scale-105 overflow-hidden shadow-lg shadow-[#040c16] group rounded-md flex justify-center items-center h-[200px] bg-cover relative'>
          <img src={proj2} alt="" />
          <div className='opacity-0 group-hover:opacity-90 bg-[gray]/70 absolute inset-0 flex flex-col justify-center items-center'>
            <span className='text-2xl font-bold text-white tracking-wider'>Movies</span>
            <div className='pt-8 text-center'>
              <a href="https://movies-rep.netlify.app/">
                <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                  Live
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className='transform transition-transform duration-300 hover:scale-105 overflow-hidden shadow-lg shadow-[#040c16] group rounded-md flex justify-center items-center h-[200px] bg-cover relative'>
          <img src={proj6} alt="" />
          <div className='opacity-0 group-hover:opacity-90 bg-[gray]/70 absolute inset-0 flex flex-col justify-center items-center'>
            <span className='text-2xl font-bold text-white tracking-wider'>Restaurant</span>
            <div className='pt-8 text-center'>
              <a href="https://restaurant-rep.netlify.app/">
                <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                  Live
                </button>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Work