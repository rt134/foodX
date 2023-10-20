// Custom Hook
import { useEffect, useState } from "react";


const useRestaurant = (resId) => {
    const [restaurent, setRestaurent] = useState(null)

    useEffect(() => {
        getRestaurentInfo();
    }, [])

    async function getRestaurentInfo(){
        const data = await fetch(FETCH_MENU_URL+resId);
        const json = await data.json();
        setRestaurent(json.data);
    }

    return restaurent
}

export default useRestaurant; 