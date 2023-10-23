import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from '../constants';
import { useUserContext } from "../utils/UserContext";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FoodItemCard from "./FoodItemCard";

const RestaurantMenu = () => {
    const navigate = useNavigate();
    const { user } = useUserContext();
    const { id } = useParams();
    const [cartItems, setCartItems] = useState([])
    const [foodItems, setFoodItems] = useState([
        {
            "ID": 1,
            "CreatedAt": "2023-10-23T16:42:06.12+05:30",
            "UpdatedAt": "2023-10-23T16:42:06.12+05:30",
            "DeletedAt": null,
            "Name": "Rajma Chawal",
            "Price": 140,
            "Description": "RC",
            "RestaurantID": 1,
            "ImageUrl": "https://images.squarespace-cdn.com/content/v1/5b55b377b27e39707a59aed1/1596731934305-AO690UGNTE6U83PAZML6/04++Rajma+Chawal+Bowl+Company+4burner+Studio+Food+Photography+Bangalore+India.jpg"
        },
        {
            "ID": 1,
            "CreatedAt": "2023-10-23T16:42:06.12+05:30",
            "UpdatedAt": "2023-10-23T16:42:06.12+05:30",
            "DeletedAt": null,
            "Name": "Rajma Chawal",
            "Price": 140,
            "Description": "RC",
            "RestaurantID": 1,
            "ImageUrl": "https://images.squarespace-cdn.com/content/v1/5b55b377b27e39707a59aed1/1596731934305-AO690UGNTE6U83PAZML6/04++Rajma+Chawal+Bowl+Company+4burner+Studio+Food+Photography+Bangalore+India.jpg"
        }

    ]);

    // useEffect(() => {
    //     if (!user) {
    //         navigate('/');
    //         return;
    //     }

    //     fetch(BASE_URL + 'food/' + id + '/', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${user?.token}`
    //         },
    //     })
    //     .then((response) => {
    //         response.json();
    //     })
    //     .then((data) => {
    //         setFoodItems(data);
    //     })
    //     .catch((error) => {
    //         toast.error('Failed to fetch menu details. Please retry.', {
    //             position: "top-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //         });
    //         console.error('Error fetching menu items:', error);
    //     });
    // }, [id, user]);

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
