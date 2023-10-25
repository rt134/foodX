import { Link } from "react-router-dom";
import {useUserContext} from '../utils/UserContext'

const Header = () => {
    const {user,logout} = useUserContext()
    return (
      <div className="flex justify-between bg-pink-100 my-1 shadow-lg">
        <img className="h-28 p-2" alt="logo" src="https://www.foodx.co.in/assets/images/logo1.png" />
        <div className="nav-items p-2">
          <ul className="flex py-10 justify-center">
            <Link to='/'><li className="px-2">Home</li></Link>
            <Link to ='/orders'><li className="px-2">Orders</li></Link>
            <Link to='/cart'><li className="px-2">Cart</li></Link>
            {
              user ? 
              <Link onClick={logout}><li className="px-2">Signout</li></Link> 
              : 
              <Link to='/signin'><li className="px-2">Signin</li></Link>}
          </ul>
        </div>
      </div>
    )
  }

export default Header;