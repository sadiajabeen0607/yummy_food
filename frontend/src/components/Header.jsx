import React from 'react'

const Header = () => {
  return (
    <div className='h-[34vw] my-7 mx-auto bg-[url(/header_img.png)] bg-no-repeat bg-contain relative'>
      <div className='absolute flex flex-col items-start gap-[1.5vw] bottom-[10%] left-[6vw] max-w-[50%] lg:max-w-[45%] sm:max-w-[65%] animate-fadeIn'>
        <h2 className='font-medium text-white text-[max(4.5vw,_22px)]'>Order your favourite food here</h2>
        <p className='text-white text-[1vw] sm:hidden'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
        <button className='text-gray-500 font-medium py-[1vw] px-[2.3vw] sm:py-[2vw] sm:px-[4vw] bg-white text-[max(1vw,_13px)] rounded-full'>View Menu</button>
      </div>
    </div>
  )
}

export default Header
