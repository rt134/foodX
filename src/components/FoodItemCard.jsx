import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const FoodItemCard = ({ Name, Price, ImageUrl, ID, isAdded, num }) => {
  return (
    <div key={ID} className="w-56 p-2 m-2 shadow-lg bg-pink-100 h-70 relative">
      <img alt="image-x" src={ImageUrl} style={{ width: "250px", height: "150px" }} />
      <h2 className='font-bold text-2xl'>{Name}</h2>
      <h3>Price: {Price}</h3>
      {isAdded ?
        <div className='flex items-center'>
          <RemoveIcon /> {num} <AddIcon />
          <div className="absolute top-0 right-0 mt-2 mr-2">
            <DeleteIcon className='h-6 w-6' />
          </div>
        </div> :
        <button className="search-button p-2 hover:bg-purple-900 text-white bg-purple-700 rounded-lg">Add to cart</button>
      }
    </div>
  )
}

export default FoodItemCard;
