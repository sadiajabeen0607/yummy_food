// import React from 'react'

import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import InputField from "../components/InputField";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlaceOrder = ({setShowLogin}) => {
  const { getTotalCartAmount, discount, token, food_list, cartItems, url, promoCode, setDiscount, setPromoCode } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "", 
      phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({...data, [name]:value}));
  }

  const subtotal = getTotalCartAmount();
    const discountAmount = discount ? (subtotal * discount) / 100 : 0;
    const deliveryFee = 2;
    const totalAmount = subtotal - discountAmount + deliveryFee;

  const onPlaceOrder = async(e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if(cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo['quantity'] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: totalAmount,
      discount: discountAmount
    }
    let response = await axios.post(`${url}/api/order/place`, orderData, {headers: {token}});
    if(response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url);
      localStorage.removeItem("discount");
      localStorage.removeItem("promoCode");
      setDiscount(0);
      setPromoCode("");
    } else {
      toast.error("Error Placing Order");
    }
    
  }

  useEffect(() => {
    if(!token) {
      setShowLogin(true);
      navigate("/cart");
    } else if(getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form onSubmit={onPlaceOrder} className="sm:block flex items-start justify-between gap-12 sm:mt-12 mt-24">
      <div className="w-full max-w-[max(30%,_500px)]">
        <p className="text-3xl font-semibold mb-12">Delivery Information</p>
        <div className="flex gap-2.5">
          <InputField type="text" name="firstName" value={data.firstName} onChange={onChangeHandler} placeholder="First name" className="mb-4" />
          <InputField type="text" name="lastName" value={data.lastName} onChange={onChangeHandler} placeholder="Last name" className="mb-4" />
        </div>

        <InputField type="email" name="email" value={data.email} onChange={onChangeHandler} placeholder="Email Address" className="mb-4" />
        <InputField type="text" name="street" value={data.street} onChange={onChangeHandler} placeholder="Street" className="mb-4" />

        <div className="flex gap-2.5">
          <InputField type="text" name="city" value={data.city} onChange={onChangeHandler} placeholder="City" className="mb-4" />
          <InputField type="text" name="state" value={data.state} onChange={onChangeHandler} placeholder="State" className="mb-4" />
        </div>

        <div className="flex gap-2.5">
          <InputField type="text" name="zipCode" value={data.zipCode} onChange={onChangeHandler} placeholder="Zip code" className="mb-4" />
          <InputField type="text" name="country" value={data.country} onChange={onChangeHandler} placeholder="Country" className="mb-4" />
        </div>

        <InputField type="text" name="phone" value={data.phone} onChange={onChangeHandler} placeholder="Phone" className="mb-4" />
      </div>
      <div className="w-full max-w-[max(40%,_500px)] sm:mt-10">
        <div className="flex-1 flex flex-col gap-5">
          <h2 className="text-xl font-semibold">Cart Totals</h2>
          <div>
            <div className="flex justify-between text-gray-600">
              <p>Subtotal</p>
              <p>${subtotal}</p>
            </div>
            {promoCode ? (
              <>
                <hr className="my-2.5 mx-0" />
                <div className="flex justify-between text-gray-600">
                  <p>Discount</p>
                  <p>${discountAmount.toFixed(2)} ({discount}%)</p>
                </div>
              </>
            ) : null}
            <hr className="my-2.5 mx-0" />
            <div className="flex justify-between text-gray-600">
              <p>Delivery Fee</p>
              <p>${subtotal === 0 ? 0 : deliveryFee}</p>
            </div>
            <hr className="my-2.5 mx-0" />
            <div className="flex justify-between text-gray-600">
              <p>Total</p>
              <p>${totalAmount.toFixed(2)}</p>
            </div>
          </div>
          <button type="submit" className="mt-7 border-none text-white bg-orange-600 hover:bg-orange-500 transition duration-300 w-[max(15vw,_220px)] py-2.5 px-5 text-sm rounded-md cursor-pointer">
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
