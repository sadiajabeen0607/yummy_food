import { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const AddItem = ({url}) => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "", 
        category: "Salad"
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=> ({...data, [name]: value}))
    }
    
    const onSubmitHandler = async(event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("category", data.category);
        formData.append("image", image);

        const response = await axios.post(`${url}/api/food/add`, formData);
        if(response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad"
            });
            setImage(false);
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    }

    const categories = ["Salad", "Rolls", "Deserts", "Sandwich", "Cake", "Pure Veg", "Pasta", "Noodles"];
  return (
    <div className='w-[70%] ml-[max(5vw,_25px)] sm:mr-[max(5vw,_25px)] my-12 text-gray-600 text-base'>
      <form className='flex flex-col gap-5' onSubmit={onSubmitHandler}>
        <div className='flex flex-col gap-2.5'>
            <p>Upload Image</p>
            <label htmlFor="image">
                <img src={image? URL.createObjectURL(image) : assets.upload_area} alt="upload_area" className='w-32 cursor-pointer' />
            </label>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>

        <div className='flex flex-col gap-2.5 w-[max(40%,_280px)]'>
            <p>Product Name</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name="name" id="" placeholder='Type here' required className='p-2.5 border border-gray-300 outline-orange-500' />
        </div>

        <div className='flex flex-col gap-2.5 w-[max(40%,_280px)]'>
            <p>Description</p>
            <textarea onChange={onChangeHandler} value={data.description} name="description" id="" rows="5" placeholder='Write content here' required className='p-2.5 border border-gray-300 outline-orange-500'></textarea>
        </div>

        <div className='flex sm:flex-col gap-8'>
            <div className="flex flex-col gap-2.5">
                <p>Product Category</p>
                <select onChange={onChangeHandler} name="category" className='max-w-[120px] p-2.5 border border-gray-300 outline-orange-500'>
                    {categories.map((category, index) => {
                        return (
                            <option key={index} value={category}>{category}</option>
                        )
                    })}
                </select>
            </div>

            <div className='flex flex-col gap-2.5'>
                <p>Product Price</p>
                <input type="number" onChange={onChangeHandler} value={data.price} name='price' placeholder='$20' className='max-w-[120px] p-2.5 border border-gray-300 outline-orange-500' />
            </div>
        </div>
        <button type='submit' className='max-w-[120px] cursor-pointer p-2.5 bg-orange-600 hover:bg-orange-500 transition duration-500 text-white'>Add</button>
      </form>
    </div>
  )
}

export default AddItem
