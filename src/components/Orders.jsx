import { useEffect, useState } from "react"
import CartItemCard from './cards/CartItemCard'
import Shimmer from "./Shimmer"
import { BASE_URL } from '../constants'
import {useUserContext} from '../utils/UserContext'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Orders = () => {
  
  const navigate = useNavigate()
  const {user} = useUserContext()
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    if (!user) {
        navigate('/')
    }
    
    fetch(BASE_URL+'cart/orders', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.token}`
        },
        })
        .then((response) => response.json())
        .then((data) => {setCartItems(data)})
        .catch((error) => {
            toast.error('Failed to fetch Order details, Please retry', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.error('Error fetching ordered items:', error)
        });
  }, [])


  

  return cartItems?.length === 0 ? <Shimmer /> : (
    <>
      <div className="flex flex-wrap">
        {
          cartItems.map((data) => <CartItemCard {...data} isCart={false} key={data.ID}/>)
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
export default Orders;