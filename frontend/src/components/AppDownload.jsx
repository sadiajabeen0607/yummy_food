import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const AppDownload = () => {
  return (
    <div id='app-download' className='mt-24 mx-auto mb-auto text-center font-medium text-[max(3vw,_20px)]'>
      <p>For Better Experience Download <br /> Tomato App</p>
      <div className='mt-10 flex justify-center gap-[max(2vw,_10px)]'>
        <img src={assets.play_store} alt="play_store" className='w-[max(30vw,_120px)] max-w-44 transition duration-500 cursor-pointer transform ease-in-out delay-150 hover:-translate-y-1 hover:scale-110' />
        <img src={assets.app_store} alt="app_store" className='w-[max(30vw,_120px)] max-w-44 transition duration-500 cursor-pointer transform ease-in-out delay-150 hover:-translate-y-1 hover:scale-110' />
      </div>
    </div>
  )
}

export default AppDownload;
