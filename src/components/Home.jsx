import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

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
  const navigate = useNavigate();
  const theme = useThemeMode();
  const [logo, setLogo] = useState('/Images/LogoLight.png');

  useEffect(() => {
    setLogo(theme === 'dark' ? '/Images/LogoDark.png' : '/Images/LogoLight.png');
  }, [theme]);

  return (
    <div className="hidden md:flex flex-col items-center min-w-[768px] bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <div className="flex justify-between items-center p-1 w-4/5 bg-gray-100 dark:bg-gray-900">
        <div className="flex items-center w-1/4">
          <img
            src={logo}
            alt="Site Logo"
            className="w-full"
          />
        </div>
        <div className="mx-4 w-1/3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          />
        </div>
        <div className="flex items-center space-x-4">
        </div>
      </div>
    </div>
  );
}