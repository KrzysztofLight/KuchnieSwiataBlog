import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Food = () => {
  const { name } = useParams();
  const [foodInfo, setFoodInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/food')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const foodItem = data.find(food => food.name.toLowerCase() === name.toLowerCase());
        if (foodItem) {
          setFoodInfo(foodItem);
        } else {
          setError(new Error('Food item not found'));
        }
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, [name]);

  if (isLoading) {
    return <p className="text-gray-700">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  return (
    <div className="flex justify-center items-center pt-8 h-full">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden">
        <img 
          src={foodInfo.photo || '/images/blog/image-1.jpg'} 
          alt={foodInfo.name} 
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">{foodInfo.name}</h2>
          <p className="text-gray-700">{foodInfo.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Food;