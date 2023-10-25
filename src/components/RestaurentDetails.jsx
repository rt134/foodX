import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from '../constants';
import { useUserContext } from "../utils/UserContext";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FoodItemCard from "./cards/FoodItemCard";

const RestaurantMenu = () => {
    const navigate = useNavigate();
    const { user } = useUserContext();
    const { id } = useParams();
    const [foodItems, setFoodItems] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }
    
        fetch(BASE_URL + 'food/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.token}`
            },
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setFoodItems(data);
        })
        .catch((error) => {
            toast.error('Failed to fetch menu details. Please retry.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.error('Error fetching menu items:', error);
        });
    }, []);
    

    return (
        <div>
            <div className="flex flex-wrap">
                {foodItems.map((data) => (
                    <FoodItemCard {...data} isAdded={true} num={4} key={data.ID} />
                ))}
                
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}


export default RestaurantMenu;
