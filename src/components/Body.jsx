import { useEffect, useState } from "react"
import RestaurentCard from './cards/RestaurentCard'
import Shimmer from "./Shimmer"
import { BASE_URL } from '../constants'
import { Link } from "react-router-dom"
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Body = () => {
  const [searchText, setSearchText] = useState("")
  const [restaurents, setRestaurents] = useState([])
  const [filteredRestaurants, setFilteredRestaurants] = useState()

  useEffect(() => {
    fetch(BASE_URL+"restaurents/")
    .then((res) => res.json())
    .then((data) => {
      setRestaurents(data);
      setFilteredRestaurants(data);
    })
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

  return restaurents?.length === 0 ? <Shimmer /> : (
    <>
      <div className="search-container p-3 bg-pink-100 ms-2 shadow-md ">
        <input 
          type="text" 
          className="focus:bg-green-50" 
          placeholder="Search" 
          value={searchText} 
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button 
          className="search-button p-2 m-2 hover:bg-purple-900 text-white bg-purple-700 rounded-lg" 
          onClick={() => {setFilteredRestaurants(restaurents.filter((restaurent) => restaurent?.Name.toLocaleLowerCase().includes(searchText?.toLocaleLowerCase())))}}
        >Search</button>
      </div>
      <div className="flex flex-wrap">
        {
          filteredRestaurants.map((data) => <Link to={"/restaurent/"+data.ID}><RestaurentCard {...data} key={data.ID}/> </Link>)
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
export default Body;