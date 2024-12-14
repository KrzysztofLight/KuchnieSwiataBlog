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
        <div className="mx-4 w-1/3 flex justify-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          />
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
      <div className='h-56 sm:h-64 xl:h-80 2xl:h-96 w-full'>
        <Carousel>
          <img src={logo} alt="Carousel 1" className="w-full" />
          <img src={logo} alt="Carousel 2" className="w-full" />
        </Carousel>
      </div>
      <div className='pt-40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        <h1 className="text-3xl font-bold text-center col-span-full">Kategorie jedzenia</h1>
        <p className="text-lg text-center col-span-full mb-8">Odkryj różnorodne, pyszne przepisy podzielone na kategorie dla Twojej wygody. Kliknij na dowolną kategorię, aby dowiedzieć się więcej!</p>
        {categories.map((category, index) => {
          const categoryFoods = foodData.filter(food => food.category === category);
          const randomFood = categoryFoods[Math.floor(Math.random() * categoryFoods.length)];
          return (
            <Card key={index} className="max-w-sm">
              <img 
                src={randomFood.photo  || '/images/blog/image-1.jpg'} 
                alt={category} 
                className="h-48 w-full object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {category}
                </h5>
                <Button as={Link} to={`/food/category/${category.toLowerCase()}`} className='mt-3'>
                  Sprawdz
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  );
}