// import React from 'react';
import { menu_list } from '../assets/frontend_assets/assets';

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div id='explore-menu' className='flex flex-col gap-5'>
      <h1 className='text-gray-800 font-medium text-[20px]'>Explore Our menu</h1>
      <p className='max-w-[60%] text-gray-600 lg:max-w-full text-sm'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
      <div className='flex justify-between items-center outline-none gap-8 text-center my-5 mx-0 overflow-x-scroll scrollbar-hidden'>
        {menu_list.map((item, index) => {
            return (
                <div key={index} onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}>
                    <img src={item.menu_image} alt={item.menu_name} className={`w-[7.5vw] min-w-20 cursor-pointer rounded-full transition-all duration-200 ${category === item.menu_name ? 'border-4 border-orange-600 p-0.5' : ''}`} />
                    <p className='mt-2.5 cursor-pointer text-[max(1.4vw, _16px)] text-gray-600'>{item.menu_name}</p>
                </div>
            )
        })}
      </div>

      <hr className='my-2.5 mx-0 text-gray-300 h-0.5' />
    </div>
  )
}

export default ExploreMenu
