import { useEffect, useState } from "react"
import RestaurentCard from './RestaurentCard'
import Shimmer from "./Shimmer"
import { BASE_URL } from '../constants'
import {useUserContext} from '../utils/UserContext'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Cart = () => {
  
  const navigate = useNavigate()
  const {user} = useUserContext()
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    if (!user) {
        navigate('/')
    }
    
    fetch(BASE_URL+'cart/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.token}`
        },
        })
        .then((response) => response.json())
        .then((data) => {setCartItems(data)})
        .catch((error) => {
            toast.error('Failed to fetch cart details, Please retry', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.error('Error fetching cart items:', error)
        });
  }, [])

  return cartItems?.length === 0 ? <Shimmer /> : (
    <>
      <div className="flex flex-wrap">
        {
          cartItems.map((data) => <RestaurentCard {...data} key={data.ID}/>)
        }
      </div>
      <ToastContainer position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover />
    </>
  ) 
}
export default Cart;