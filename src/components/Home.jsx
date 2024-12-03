import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Carousel } from 'flowbite-react';

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
    </div>
  );
}