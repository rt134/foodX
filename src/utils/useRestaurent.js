// Custom Hook
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants";


const useRestaurant = (resId) => {
    const [restaurent, setRestaurent] = useState(null)

    useEffect(() => {
        getRestaurentInfo();
    }, [])

    async function getRestaurentInfo(){
        const data = await fetch(BASE_URL + 'food/' +resId);
        const json = await data.json();
        setRestaurent(json.data);
    }

    return restaurent
}

export default useRestaurant; 