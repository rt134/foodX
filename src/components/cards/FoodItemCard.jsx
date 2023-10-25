import React from 'react';
import { BASE_URL } from '../../constants'
import {ToastContainer, toast } from 'react-toastify';
import {useUserContext} from '../../utils/UserContext'
import 'react-toastify/dist/ReactToastify.css';


const FoodItemCard = ({ Name, Price, ImageUrl, ID }) => {
  const {user} = useUserContext()

  const handleClick = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(BASE_URL+'food/add/' + ID , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`
      }
      });

      if (response.status === 200) {
        toast.success('Item added to cart', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

      } else {
        toast.error('Unable to add to cart, Please retry', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  
  return (
    <div key={ID} className="w-56 p-2 m-2 shadow-lg bg-pink-100 h-70 relative">
      <img alt="image-x" src={ImageUrl} style={{ width: "250px", height: "150px" }} />
      <h2 className='font-bold text-2xl'>{Name}</h2>
      <h3>Price: {Price}</h3>
      <button className="w-full p-2 hover:bg-purple-900 text-white bg-purple-700 rounded-lg" onClick={handleClick}>Add to cart</button>
      <ToastContainer position="top-right"
          autoClose={500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover />
    </div>
  )
}

export default FoodItemCard;
