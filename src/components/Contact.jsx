import React from 'react'

const Contact = () => {
  return (
    <div className='max-w-[1200px] mx-auto bg-black sm:py-20 p-5' id='contact'>
        <div className='text-center'>
          <h2 className='text-4xl font-bold leading-tight primary-color'>Contact Me</h2>
        </div>
        
        <div className='max-w-[800px] mx-auto'>

          <div className='mt-6 bg-[#161616] rounded-xl'>
            <div className='p-10'>

              <card>
                <h1 className='text-white mb-2 primary-color text-2xl'>Abdo-Mohamed</h1>
                <div className='grid grid-cols-1 gap-x-5 gap-y-4'>
                  <div>
                    <div className='mt-2.5 flex justify-center'>
                      <a href='https://wa.me/message/UY6ZK2UKESRFB1' 
                        className='bg-[#161616] w-full px-4 py-4 text-gray-400 placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:border-pink-600' >Message Abdo mohamed on WhatsApp.</a>
                    </div>
                  </div>
                  
                  {/* <div>
                    <div className='mt-2.5 flex justify-center'>
                      <a href='bodimohamed2323@gmail.com' 
                        className='bg-[#161616] w-full px-4 py-4 text-gray-400 placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:border-pink-600' >Email</a>
                    </div>
                  </div> */}

                  <div>
                    <div className='mt-2.5 flex justify-center'>
                      <a href='https://www.linkedin.com/in/abdo-mohamed-50546b29a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
                        className='bg-[#161616] w-full px-4 py-4 text-gray-400 placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:border-pink-600' >LinkedIn</a>
                    </div>
                  </div>

                </div>
              </card>

            </div>
          </div>

        </div>
    </div>
  )
}

export default Contact