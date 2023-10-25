import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import {useUserContext} from '../../utils/UserContext'
import { BASE_URL } from '../../constants'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';


const CartItemCard = ({ ID , Quantity, Price, FoodItem, updateQuantity, removeItem, isCart, UpdatedAt}) => {
  const {user} = useUserContext()
    
  const IncreaseQuantity = async() => {
      try {
        const response = await fetch(BASE_URL+'food/add/'+ FoodItem.ID, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.token}`
          },
          
        });

        if(response.status === 200){
          updateQuantity(ID, 1)
        }else {
          toast.error('Failed, Please retry', {
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

    }

    const DecreseQuantity = async() => {
      
      try {
        const response = await fetch(BASE_URL+'food/remove/'+ FoodItem.ID, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.token}`
          },
          
        });

        if(response.status === 200){
          updateQuantity(ID, -1)
        }else {
          toast.error('Failed, Please retry', {
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
    }

    const RemoveFromCart = async() => {
      try {
        const response = await fetch(BASE_URL+'cart/remove/'+ ID, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.token}`
          },
          
        });
  
        if (response.status === 200){
          removeItem(ID);
        } else {
          toast.error('Failed, Please retry', {
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

    }

    return (
      <div key={ID} className="w-56 p-2 m-2 shadow-lg bg-pink-100 h-70 relative">
      <img alt="image-x" src={FoodItem.ImageUrl} style={{ width: "250px", height: "150px" }} />
      <h2 className='font-bold text-2xl'>{FoodItem.Name}</h2>
      <h3>{Quantity} X {FoodItem.Price} = {Price}</h3>
      {
        isCart ? 
        <div className='flex items-center'>
          <RemoveIcon onClick={DecreseQuantity} /> {Quantity} <AddIcon onClick={IncreaseQuantity} />
          <DeleteIcon onClick={RemoveFromCart} />
        </div> 
        :<div>{format(new Date(UpdatedAt), 'dd MMM yyyy HH:mm')}</div>
      }
      
      <ToastContainer position="top-right"
          autoClose={5000}
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

export default CartItemCard;