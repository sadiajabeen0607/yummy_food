import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';
import { assets } from '../assets/frontend_assets/assets';

const MyOrders = () => {

    const [data, setData] = useState([]);
    const {url, token} = useContext(StoreContext);

    const fetchOrders = async() => {
        const response = await axios.post(`${url}/api/order/userorders`, {}, {headers: {token}});
        setData(response.data.data);
        // console.log(response.data.data);
        // console.log(data);
        
        
    }

    useEffect(() => {
        if(token) {
            fetchOrders();
        }
    }, [token])
  return (
    <div className='my-12 mx-0'>
      <h2 className='font-medium text-[max(3vw,_12px)]'>My Orders</h2>
      <div className='flex flex-col gap-5 mt-8'>
        {data.map((order, index) => {
            return (
                <div key={index} className='grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] md:grid-cols-[1fr_2fr_1fr] md:gap-y-1.5 md:text-xs items-center gap-7 text-sm py-2.5 px-5 text-gray-800 border border-orange-600'>
                     <img src={assets.parcel_icon} alt="parcel-icon" className='w-12' />
                     <p>{order.items.map((item, index) => {
                        if(index === order.items.length - 1) {
                            return item.name + " x " + item.quantity
                        } else {
                            return item.name + " x " + item.quantity+", "
                        }
                     })}</p>
                     <p>${order.amount}.00</p>
                     <p>orders: {order.items.length}</p>
                     <p><span className='text-orange-600 pr-1'>&#x25cf;</span><b className='font-medium text-gray-700'>{order.status}</b></p>
                     <button onClick={fetchOrders} className='border-none py-2.5 px-1 rounded-[4px] cursor-pointer text-gray-700 bg-orange-100 md:text-[10px]'>Track Order</button>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default MyOrders;
