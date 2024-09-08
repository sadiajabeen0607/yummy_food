import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div id='footer' className='mt-24 text-gray-100 bg-gray-900 flex flex-col items-center pt-20 pb-5 gap-5 px-[8vw]'>
      <div className='w-full grid grid-cols-[2fr_1fr_1fr] gap-20 sm:flex sm:flex-col sm:gap-9'>
        <div className='flex flex-col items-start gap-5'>
          <img src={assets.logo} alt="Logo" />
          <p className='text-sm text-gray-200'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque nemo doloribus ipsa ipsum? Quae unde dolores facere ullam molestiae repellendus neque facilis architecto tempora a.</p>
          <div className='flex items-center'>
            <img src={assets.facebook_icon} alt="Facebook" className='w-10 mr-2.5' />
            <img src={assets.twitter_icon} alt="twitter" className='w-10 mr-2.5' />
            <img src={assets.linkedin_icon} alt="linkedIn" className='w-10 mr-2.5' />
          </div>
        </div>
        <div className='flex flex-col items-start gap-5'>
          <h2 className='text-white text-xl font-semibold'>COMPANY</h2>
          <ul>
            <li className='mb-2.5'>
              <Link to="/" className='hover:text-orange-500 transition duration-300'>Home</Link>
            </li>
            <li className='mb-2.5'>
              <Link to="/about" className='hover:text-orange-500 transition duration-300'>About Us</Link>
            </li>
            <li className='mb-2.5'>
              <Link to="delivery" className='hover:text-orange-500 transition duration-300'>Delivery</Link>
            </li>
            <li className='mb-2.5'>
              <Link to="/privacy" className='hover:text-orange-500 transition duration-300'>Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <div className='flex flex-col items-start gap-5'>
          <h2 className='text-white text-xl font-semibold'>GET IN TOUCH</h2>
          <ul>
            <li className='mb-2.5'>+92-322-322-3222</li>
            <li className='mb-2.5'>sadiajabeen@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr className='w-full h-0.5 my-5 mx-0 bg-gray-600' />
      <p className='sm:text-center'>Copyright 2024 @ Tomato.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
