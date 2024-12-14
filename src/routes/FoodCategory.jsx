import React, { useEffect, useState } from 'react';
import { Button, Card } from "flowbite-react";
import { Link, useParams } from 'react-router-dom';

const FoodCategory = () => {
  const { category } = useParams();
  const [foodData, setFoodData] = useState([]);
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
        const filteredData = data.filter(food => food.category.toLowerCase() === category.toLowerCase());
        setFoodData(filteredData);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, [category]);

  if (isLoading) {
    return <p className="text-gray-700">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  return (
    <div className="flex justify-center items-center pt-8 h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-8 w-4/5">
        {foodData.map((food, index) => (
          <Card key={index} className="w-full max-w-xs m-auto">
            <div className="relative h-48 w-full">
              <img 
                src={food.photo || '/images/blog/image-1.jpg'} 
                alt={food.category} 
                className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h5 className="text-2xl font-bold tracking-tight justify-center text-gray-900 dark:text-white">
                {food.name}
              </h5>
              <Button as={Link} to={`/food/${food.name}`} className='mt-3'>
                Sprawdz
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FoodCategory;