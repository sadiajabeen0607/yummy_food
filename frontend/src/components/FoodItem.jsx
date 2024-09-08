import { useContext } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { StoreContext } from '../context/StoreContext';

const FoodItem = ({id, name, price, description, image}) => {

    const {cartItems, addToCart, removeFromCart, url} = useContext(StoreContext);
    // console.log("cartItems", cartItems);

  return (
    <div className='w-full m-auto rounded-2xl shadow-custom transition duration-300 animate-fadeIn'>
      <div className='relative'>
        <img src={`${url}/images/${image}`} alt={name} className='w-full rounded-t-xl' />
        {!cartItems[id] ? (
            <img onClick={() => addToCart(id)} src={assets.add_icon_white} alt="add-icon" className='absolute bottom-3 right-3 w-8 cursor-pointer rounded-full' />
        ) : (
            <div className='absolute right-3 bottom-3 flex items-center gap-2.5 p-1.5 rounded-full bg-white'>
                <img className='w-7 cursor-pointer' onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="remove-icon" />
                <p>{cartItems[id]}</p>
                <img className='w-7 cursor-pointer' onClick={() => addToCart(id)} src={assets.add_icon_green} alt="add-item" />
            </div>
        )}
      </div>
      <div className='p-5'>
        <div className='flex justify-between items-center mb-2.5'>
            <p className='text-[20px] font-medium'>{name}</p>
            <img src={assets.rating_starts} alt="rating" className='w-[70px]' />
        </div>
        <p className='text-sm text-gray-500'>{description}</p>
        <p className='text-orange-600 text-xl font-medium my-2.5 mx-0'>${price}</p>
      </div>
    </div>
  )
}

export default FoodItem;
