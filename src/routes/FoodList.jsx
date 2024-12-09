import React, { useEffect, useState } from 'react';

const FoodList = () => {
  const [foodData, setFoodData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/food') // Ensure the URL matches your server's URL
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setFoodData(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p className="text-gray-700">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {foodData.length > 0 ? (
        foodData.map((food, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden m-4 p-4">
            <img className="w-full h-48 object-cover" src={food.photo} alt={food.name} />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{food.name}</h2>
              <p className="text-gray-700 mb-4">{food.description}</p>
              <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
              <ul className="list-disc list-inside mb-4">
                {food.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <h3 className="text-lg font-semibold mb-2">Method of Preparation:</h3>
              <p className="text-gray-700">{food.method}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-700">No food items available.</p>
      )}
    </div>
  );
};

export default FoodList;