const Shimmer = () => {
    return (
      <div className="restaurent-list" data-testid="shimmer">
        {Array(20)
          .fill("")
          .map((e, index) => (
            <div key={index} className="shimmer-card"></div>
          ))}
      </div>
    );
  };
  
  export default Shimmer;