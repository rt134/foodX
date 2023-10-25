import { useEffect, useState } from "react"
import CartItemCard from './cards/CartItemCard'
import Shimmer from "./Shimmer"
import { BASE_URL } from '../constants'
import {useUserContext} from '../utils/UserContext'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';


const Cart = () => {
  
  const navigate = useNavigate()
  const {user} = useUserContext()
  const [cartItems, setCartItems] = useState([])
  const [total, setTotal] = useState(0)

  const updateQuantity = (ID, val) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) => {
        if (item.ID === ID) {
          return {
            ...item,
            Quantity: item.Quantity + val,
            Price: (item.Quantity + val) * item.FoodItem.Price,
          };
        } else {
          return item; 
        }
      })
    );
  };

  const removeItem = (ID) => {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item.ID !== ID));
  };

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

  useEffect(() => {
    const newTotal = cartItems.reduce((acc, item) => {
      return acc + item.Price;
    }, 0);

    setTotal(newTotal);
  }, [cartItems]);

  const checkout = async() => {
    try {
      const response = await fetch(BASE_URL + 'cart/checkout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user?.token}`
        },
      });
  
      if (response.status === 200) {
        setCartItems([]);
        toast.success('Items will be delivered within 30 mins', {
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
        toast.error('Failed to checkout. Please retry.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error) {
      toast.error('Failed to checkout. Please retry.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      console.error('Error during checkout:', error);
    }
  };
  

  return cartItems?.length === 0 ? <Shimmer /> : (
    <>
      <div className="flex flex-wrap">
        {
          cartItems.map((data) => <CartItemCard {...data} isCart={true} removeItem={removeItem} updateQuantity={updateQuantity} key={data.ID}/>)
        }
      </div>
      <div>
        Total : {total} <CurrencyRupeeIcon />
        <button 
          className="p-2 m-2 hover:bg-purple-900 text-white bg-purple-700 rounded-lg" onClick={checkout}>Checkout</button>
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