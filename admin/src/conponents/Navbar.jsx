// import React from 'react';
import {assets} from '../assets/assets';

const Navbar = () => {
  return (
    <div className='flex justify-between items-center py-2 px-[4%]'>
      <img className='w-[max(10%,_80px)]' src={assets.logo} alt="Logo" />
      <img className='w-12 rounded-full' src={assets.profile_image} alt="profile_image" />
    </div>
  )
}

export default Navbar
