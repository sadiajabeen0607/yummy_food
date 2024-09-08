// import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import { useEffect } from 'react';
import { assets } from '../assets/assets';

const Orders = ({url}) => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async() => {
    const response = await axios.get(`${url}/api/order/list`);
    if(response.data.success) {
      setOrders(response.data.data);
      // console.log(response.data.data);
    } else {
      toast.error("Error")
    }
  }

  const statushandler = async(event, orderId) => {
    const response = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: event.target.value
    });

    if(response.data.success) {
      fetchAllOrders();
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div className='w-[70%] ml-[max(5vw,_25px)] sm:mr-[max(5vw,_25px)] my-12'>
      <h3 className='font-medium text-[max(2vw,_16px)]'>All Orders</h3>
      <div>
        {orders.map((order, index) => (
          <div className='grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-start gap-7 lg:gap-4 border border-orange-500 p-5 my-7 mx-0 text-sm text-gray-700 lg:text-xs lg:grid-cols-[0.5fr_2fr_1fr] lg:py-3.5 lg:px-2' key={index}>
            <img src={assets.parcel_icon} alt="parcel-icon" className='lg:w-10' />
            <div>
              <p className='font-semibold'>
                {order.items.map((item, index) => {
                  if(index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  } else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
              </p>

              <p className='font-semibold mt-7 mb-1.5'>{order.address.firstName+ " "+order.address.lastName}</p>
              <div className="mb-2.5">
                <p>{order.address.street+", "}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipCode}</p>
              </div>

              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>items: {order.items.length}</p>
            
            <p className='flex flex-col gap-4'><span>${order.amount}</span> <span>Discount: ₹{order.discount !== 0 ? order.discount : 0}</span></p>
            <select onChange={(event) => statushandler(event, order._id)} value={order.status} className='bg-orange-50 outline-none p-2.5 lg:p-1.5 lg:text-xs border border-orange-500 w-[max(10vw,_120px)]'>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
