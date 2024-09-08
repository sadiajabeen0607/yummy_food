import { useContext } from 'react'
import FoodItem from './FoodItem'
import { StoreContext } from '../context/StoreContext'

const FoodDisplay = ({category}) => {
  const {food_list} =  useContext(StoreContext);
  return (
    <div className='mt-8' id='food-display'>
      <h2 className='text-[max(2vw,_24px)] font-semibold'>Top Dishes Near You</h2>
      <div className='grid grid-cols-auto-fill-minmax gap-7 gap-y-12 mt-8'>
        {food_list.map((item, index) => {
            // {console.log(category, item.category);}
            
            if(category === "All" || category === item.category) {
              return (
                  <FoodItem key={index} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image} />
              )
            }
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
