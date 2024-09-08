// import React from 'react'
import { NavLink } from 'react-router-dom';

const Navlink = ({to, text, src, alt}) => {
  return (
    <>
      <NavLink to={to} className={({isActive}) => `flex items-center gap-3 border border-gray-300 border-r-0 py-2 px-2.5 cursor-pointer rounded-tl-md rounded-l-md hover:bg-orange-50 hover:border-orange-500 ${isActive ? "bg-orange-50 border-orange-500" : ""}`}>
            <img src={src} alt={alt} />
            <p className="md:hidden">{text}</p>
        </NavLink>
    </>
  )
}

export default Navlink
