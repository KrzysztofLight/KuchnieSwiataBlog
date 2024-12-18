import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Carousel } from 'flowbite-react';
import { Button, Card } from "flowbite-react";
import { Link } from 'react-router-dom';

function useThemeMode() {
  const [theme, setTheme] = useState('light');


  useEffect(() => {
    const updateTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setTheme(isDarkMode ? 'light' : 'dark');
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      observer.disconnect();
    };
  }, []);

  return theme;
}

export default function MainSite() {
  const theme = useThemeMode();
  const [logo, setLogo] = useState('/Images/LogoLight.png');

  useEffect(() => {
    setLogo(theme === 'dark' ? '/Images/LogoDark.png' : '/Images/LogoLight.png');
  }, [theme]);

  const [foodData, setFoodData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredFoodData = foodData.filter(food =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(foodData.map(food => food.category))];

  return (
    <div className="md:flex flex-col items-center min-w-[768px] bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <div className="flex justify-between items-center p-1 w-3/4 bg-gray-100 dark:bg-gray-900">
        <div className="flex items-center w-1/4">
          <img
            src={logo}
            alt="Site Logo"
            className="w-4/5"
          />
        </div>
        <div className="relative mx-4 w-1/3 flex justify-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          />
          {searchQuery && (
            <ul className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded mt-1 z-10">
              {filteredFoodData.length > 0 ? (
                filteredFoodData.map(food => (
                  <li key={food.id} 
                  className="p-2 border-b border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={() => window.location.href = `http://localhost:3000/food/${food.name}`}
                  >
                    <h2 className="text-xl font-semibold">{food.name}</h2>
                    <p>{food.description}</p>
                  </li>
                ))
              ) : (
                <li className="p-2">No food items found</li>
              )}
            </ul>
          )}
        </div>
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-lg font-semibold">Check our social media</h1>
          <div className="flex items-center space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-2xl" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-2xl" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
      <hr className="w-full my-8" />
      <div className='pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-4/5'>
        <h1 className="text-3xl font-bold text-center col-span-full">Kategorie jedzenia</h1>
        <p className="text-lg text-center col-span-full mb-8">Odkryj różnorodne, pyszne przepisy podzielone na kategorie dla Twojej wygody. Kliknij na dowolną kategorię, aby dowiedzieć się więcej!</p>
        {categories.map((category, index) => {
          const categoryFoods = foodData.filter(food => food.category === category);
          const randomFood = categoryFoods[Math.floor(Math.random() * categoryFoods.length)];
          return (
            <Card key={index} className="w-full max-w-xs m-auto">
              <div className="relative h-48 w-full">
                <img 
                  src={randomFood.photo || '/images/blog/image-1.jpg'} 
                  alt={category} 
                  className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {category}
                </h5>
                <Button as={Link} to={`/food/category/${category.toLowerCase()}`} className='mt-3'>
                  Sprawdz
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
      <hr className="w-full my-8" />
      <div className='pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-4/5'>
        <h1 className="text-3xl font-bold text-center col-span-full">Dodaj nowe jedzenie</h1>
        <p className="text-lg text-center col-span-full mb-5">Masz przepis, którym chcesz się podzielić? Dodaj nowe jedzenie do naszej kolekcji!</p>
        <div className="col-span-full flex justify-center">
          <Button as={Link} to="/addFood" className='text-white p-4 rounded'>
            Dodaj jedzenie
          </Button>
        </div>
      </div>
    </div>
  );
}