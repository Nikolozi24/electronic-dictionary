import React from 'react'

const Main = () => {
  return (
    <div>
                    <div className=' upper-header'>
            <img src="./logo.svg"/>
        </div>
        <div className='menu flex justify-center '>
                <ul className=' flex justify-around w-1/2 bg-black text-white'>
                    <li className='uppercase border-x-2 px-2 py-1'>about the visual</li>
                    <li className='uppercase border-x-2 px-2 py-1'>tools</li>
                    <li className='uppercase border-x-2 px-2 py-1'>books</li>
                    <li className='uppercase border-x-2 px-2 py-1'>apps</li>
                    <li className='uppercase border-x-2 px-2 py-1'>dowloads</li>
                    <li className='uppercase border-x-2 px-2 py-1'>about us</li>
                </ul>
        </div>
        <div className='filter'>
              <h1>Themes</h1>
              <ul>
                  <li></li>



              </ul>

        </div>
    </div>
  )
}

export default Main