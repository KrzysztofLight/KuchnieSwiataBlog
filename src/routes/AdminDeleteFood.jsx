import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Card, Button } from 'flowbite-react';

function AdminDeleteFood() {
  const [foodData, setFoodData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/food')
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

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/api/food/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setFoodData(foodData.filter(food => food.id !== id));
      })
      .catch(error => {
        setError(error);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user && user.isAdmin) {
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
                  <div className="flex justify-between mt-3">
                    <Button as={Link} to={`/food/${food.name}`} className='w-2/4'>
                      Sprawdz
                    </Button>
                    <Button onClick={() => handleDelete(food.id)} className='w-1/4 bg-red-500 text-white'>
                      Usuń
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p>You need to be an admin to access this page.</p>
      </div>
    </div>
  );
}

export default AdminDeleteFood;