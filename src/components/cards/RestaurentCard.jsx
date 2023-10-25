const RestaurentCard = ({ Name, Rating, Type, ImageUrl, Contact}) => {
    return (
      <div className="w-56 p-2 m-2 shadow-lg bg-pink-100 h-80">
        <img alt="image-x" src={ImageUrl} style={{ width: "250px", height: "150px" }} />
        <h2 className='font-bold text-2xl'>{Name}</h2>
        <h3>{Type} Cuisine</h3>
        <h3>Contact: {Contact}</h3>
        <h4 className='font-bold'>{Rating} Stars</h4>
      </div>
    )
}

export default RestaurentCard;