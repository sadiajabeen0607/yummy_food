// import React from 'react'

import { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { assets } from "../assets/frontend_assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const {
    food_list,
    cartItems,
    removeFromCart,
    addToCart,
    deleteFromCart,
    getTotalCartAmount,
    url,
    applyPromoCode,
    promoCode,
    discount,
    promocodes
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const [code, setCode] = useState("");

  const handleApplyPromoCode = () => {
    const isValid = applyPromoCode(code);

    if (isValid) {
      toast.success(`Promo code applied! You get a ${promocodes[code]}% discount.`);
      setCode("");
    } else {
      toast.error("Invalid promo code.");
    }
  };

  // console.log("discount", discount);
  

  const subtotal = getTotalCartAmount();
  const discountAmount = (discount > 0) ? (subtotal * discount) / 100 : 0;
  const deliveryFee = 2;
  const totalAmount = subtotal - discountAmount + deliveryFee;

  return (
    <div className="mt-24 sm:mt-20">
      <div>
        <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] sm:grid-cols-[0.8fr_1fr_0.8fr_1fr_0.8fr_0.4fr] items-center text-gray-500 text-[max(1vw,_12px)]">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div
                  className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] sm:grid-cols-[0.8fr_1fr_0.8fr_1fr_0.8fr_0.4fr] items-center text-[max(1vw,_12px)] my-2.5 mx-0 text-black"
                >
                  <img
                    src={`${url}/images/` + item.image}
                    alt={item.name}
                    className="w-14 sm:w-8"
                  />
                  <p className="sm:w-12 sm:truncate sm:overflow-hidden sm:whitespace-nowrap">
                    {item.name}
                  </p>
                  <p>${item.price}</p>
                  <div className="gap-2.5 sm:gap-1.5 flex justify-start -ml-2.5 items-center">
                    <img
                      className="w-7 sm:w-5 cursor-pointer"
                      onClick={() => removeFromCart(item._id)}
                      src={assets.remove_icon_red}
                      alt="remove-icon"
                    />
                    <p>{cartItems[item._id]}</p>
                    <img
                      className="w-7 sm:w-5 cursor-pointer"
                      onClick={() => addToCart(item._id)}
                      src={assets.add_icon_green}
                      alt="add-item"
                    />
                  </div>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p
                    className="cursor-pointer text-base"
                    onClick={() => deleteFromCart(item._id)}
                  >
                    <RiDeleteBin4Fill className=" cursor-pointer hover:text-orange-500 w-5 h-5 sm:h-3.5 sm:w-3.5 transition duration-300" />
                  </p>
                </div>
                <hr className="h-[1px] bg-gray-200 border-none" />
              </div>
            );
          }
        })}
      </div>
      <div className="mt-20 flex sm:flex-col-reverse justify-between gap-[max(12vw,_20px)]">
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
          <button
            className="border-none text-white bg-orange-600 hover:bg-orange-500 transition duration-300 w-[max(15vw,_220px)] py-2.5 px-5 text-sm rounded-md cursor-pointer"
            onClick={() => navigate("/order")}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="flex-1 sm:justify-start">
          <div>
            <p className="text-gray-600">
              If you have a promo code, Enter it here
            </p>
            <div className="flex items-center justify-between mt-2.5 bg-gray-200 rounded-[4px]">
              <input
                type="text"
                placeholder="promo code"
                className="bg-transparent border-none outline-none pl-2.5"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button
                onClick={handleApplyPromoCode}
                className="w-[max(10vw,_150px)] py-2.5 px-1.5 bg-black hover:bg-gray-800 transition duration text-white border-none rounded-[4px] sm:text-sm"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
