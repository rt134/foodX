import { useEffect, useState } from "react"
import RestaurentCard from './RestaurentCard'
import Shimmer from "./Shimmer"
import { BASE_URL } from '../constants'
import { Link } from "react-router-dom"


const Body = () => {
  const [searchText, setSearchText] = useState("")
  const [restaurents, setRestaurents] = useState([])
  const [filteredRestaurants, setFilteredRestaurants] = useState()

  useEffect(() => {
    getRestaurentData()
  }, [])

  async function getRestaurentData(){
    const data = await fetch(BASE_URL+"restaurents/");
    const json = await data.json();
    console.log(json)
    setRestaurents(json);
    setFilteredRestaurants(json);
  }

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
          onClick={() => {setFilteredRestaurants(restaurents.filter((restaurent) => restaurent?.info?.name.toLocaleLowerCase().includes(searchText?.toLocaleLowerCase())))}}
        >Search</button>
      </div>
      <div className="flex flex-wrap">
        {
          filteredRestaurants.map((data) => <Link to={"/restaurent/"+data.ID}><RestaurentCard {...data} key={data.ID}/> </Link>)
        }
      </div>
    </>
  ) 
}
export default Body;