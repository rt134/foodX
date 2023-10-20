import { useParams } from "react-router-dom";
import {FETCH_MENU_URL } from '../constants'

const RestaurentMenu = () => {
    const {id} = useParams();

    return (
        <>
        <h1>Restaurent Details page : {id}</h1>
        </>
    )
}

export default RestaurentMenu;