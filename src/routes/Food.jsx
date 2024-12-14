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
    <div className="flex flex-col items-center pt-8 h-full bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <img 
          src={foodInfo.photo || 'http://localhost:3000/Images/no-image.png'} 
          alt={foodInfo.name} 
          className="w-full h-96 object-cover"
        />
        <div className="p-8">
          <h2 className="text-4xl font-bold mb-6 text-center">{foodInfo.name}</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{foodInfo.description}</p>
          <h3 className="text-3xl font-semibold mb-4">Składniki:</h3>
          <ul className="list-disc list-inside mb-6">
            {foodInfo.ingredients.map((ingredient, index) => (
              <li key={index} className="text-lg text-gray-700 dark:text-gray-300">{ingredient}</li>
            ))}
          </ul>
          <h3 className="text-3xl font-semibold mb-4">Metoda przygotowania:</h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{foodInfo.method}</p>
          <h3 className="text-3xl font-semibold mb-4">Kategoria:</h3>
          <p className="text-lg text-gray-700 dark:text-gray-300">{foodInfo.category}</p>
        </div>
      </div>
    </div>
  );
};

export default Food;