import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { RiDeleteBin4Fill, RiEdit2Fill } from "react-icons/ri";
import { assets } from "../assets/assets";

const ItemList = ({ url }) => {
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);

    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error(response.data.error);
    }
  };

  const removeFoodItem = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });

    if (response.data.success) {
      await fetchList();
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  const openEditModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("id", selectedItem._id);
    formData.append("name", selectedItem.name);
    formData.append("description", selectedItem.description);
    formData.append("price", selectedItem.price);
    formData.append("category", selectedItem.category);
    if (selectedItem.image) {
      formData.append("image", selectedItem.image);
    }

    const response = await axios.put(`${url}/api/food/update`, formData);
    // console.log(response.data);
    
    if (response.data.success) {
      await fetchList();
      toast.success(response.data.message);
      closeModal();
    } else {
      toast.error(response.data.message);
    }
  };

   // UseEffect to handle body scroll when modal is open or closed
   useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Clean up when the component is unmounted or when showModal changes
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  useEffect(() => {
    fetchList();
  }, []);

  const categories = ["Salad", "Rolls", "Deserts", "Sandwich", "Cake", "Pure Veg", "Pasta", "Noodles"];

  return (
    <div className="w-[70%] ml-[max(5vw,_25px)] sm:mr-[max(5vw,_25px)] my-12 text-gray-600 text-base list flex flex-col gap-2.5">
      <h2 className="text-xl font-medium text-gray-900">All Foods List</h2>
      <div>
        <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] sm:grid-cols-[0.5fr_1fr_0.5fr_0.5fr_0.5fr] gap-2.5 sm:gap-[15px] items-center justify-start py-3 px-4 border border-gray-200 text-sm bg-gray-100 sm:hidden">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] sm:grid-cols-[0.5fr_1fr_0.5fr_0.5fr_0.5fr] gap-2.5 items-center py-3 px-4 border border-gray-200 text-sm"
            >
              <img
                src={`${url}/images/` + item.image}
                alt="item_image"
                className="w-12 object-cover"
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <div className="flex gap-2">
                <RiEdit2Fill
                  onClick={() => openEditModal(item)}
                  className="hover:text-orange-500 w-5 h-5 sm:h-3.5 sm:w-3.5 transition duration-300 cursor-pointer"
                />
                <RiDeleteBin4Fill
                  onClick={() => removeFoodItem(item._id)}
                  className="hover:text-orange-500 w-5 h-5 sm:h-3.5 sm:w-3.5 transition duration-300 cursor-pointer"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for updating item */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-start sm:items-center sm:p-4">
            <div className="bg-white p-6 sm:rounded shadow-lg sm:w-full max-w-[90vw] max-h-[95vh] rounded-lg m-auto overflow-y-auto">
                {/* <h2 className="text-lg font-semibold mb-2">Edit Food Item</h2> */}
                <form className='flex flex-col gap-2' onSubmit={handleUpdate}>
                <div className="flex justify-between items-center text-black">
          <h2 className="text-xl font-medium">Edit Food Item</h2>
          <img
            onClick={() => setShowModal(false)}
            src={assets.cross_icon}
            alt="cross_icon"
            className="w-4 cursor-pointer"
          />
        </div>
        <div className='flex flex-col gap-1.5'>
            <p>Update Image</p>
            <label htmlFor="image">
                <img src={selectedItem?.image instanceof File ? URL.createObjectURL(selectedItem.image) : `${url}/images/${selectedItem?.image}`} alt="upload_area" className='w-24 cursor-pointer' />
            </label>
            <input  onChange={(e) => setSelectedItem({...selectedItem, image: e.target.files[0]})} name="image" type="file" id="image" hidden />
        </div>

        <div className='flex flex-col gap-1.5 w-[max(40%,_280px)]'>
            <p>Product Name</p>
            <input onChange={(e) => setSelectedItem({...selectedItem, name: e.target.value})} value={selectedItem.name} type="text" name="name" id="" placeholder='Type here' required className='p-2.5 border border-gray-300 outline-orange-500' />
        </div>

        <div className='flex flex-col gap-1.5 w-[max(40%,_280px)]'>
            <p>Description</p>
            <textarea onChange={(e) => setSelectedItem({...selectedItem, description: e.target.value})} value={selectedItem.description} name="description" id="" rows="4" placeholder='Write content here' required className='p-2.5 border border-gray-300 outline-orange-500'></textarea>
        </div>

        <div className='flex sm:flex-col gap-8'>
            <div className="flex flex-col gap-1.5">
                <p>Product Category</p>
                <select onChange={(e) => setSelectedItem({...selectedItem, category: e.target.value})} 
                    value={selectedItem.category || categories[0]} name="category" className='max-w-[120px] p-2.5 border border-gray-300 outline-orange-500'>
                    {categories.map((category, index) => {
                        return (
                            <option key={index} value={category}>{category}</option>
                        )
                    })}
                </select>
            </div>

            <div className='flex flex-col gap-1.5'>
                <p>Product Price</p>
                <input type="number" onChange={(e) => setSelectedItem({...selectedItem, price: e.target.value})} value={selectedItem.price} name='price' placeholder='$20' className='max-w-[120px] p-2.5 border border-gray-300 outline-orange-500' />
            </div>
        </div>
        <button type='submit' className='max-w-[120px] cursor-pointer p-2.5 bg-orange-600 hover:bg-orange-500 transition duration-500 text-white'>Update</button>
      </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default ItemList;
