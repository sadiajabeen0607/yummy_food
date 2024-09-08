// import React from 'react'
import { assets } from "../assets/assets"
import Navlink from "./Navlink"

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-[100vh] border-[1.5px] border-gray-300 border-t-0 text-[max(1vw,_10px)]">
      <div className="pt-12 pl-[20%] flex flex-col gap-5">

        <Navlink to="/add" text="Add Item" src={assets.add_icon} alt="add_icon"  />
        
        <Navlink to="/list" text="List Items" src={assets.order_icon} alt="order_icon" />
       
        <Navlink to="/orders" text="Order" src={assets.order_icon} alt="order_icon" />
      </div>
    </div>
  )
}

export default Sidebar
