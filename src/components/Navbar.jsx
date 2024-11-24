import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'flowbite-react';
import { DarkThemeToggle } from 'flowbite-react';

// Custom hook to detect theme mode
function useThemeMode() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const updateTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setTheme(isDarkMode ? 'light' : 'dark');
    };

    // Initial check
    updateTheme();

    // Create a MutationObserver to watch for changes to the class attribute on the html element
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      observer.disconnect(); // Cleanup observer on component unmount
    };
  }, []);

  return theme;
}

const NavigationBar = () => {
  const theme = useThemeMode();
  const [logo, setLogo] = useState('/Images/LogoLight.png');

  useEffect(() => {
    setLogo(theme === 'dark' ? '/Images/LogoDark.png' : '/Images/LogoLight.png');
  }, [theme]);

  return (
    <Navbar fluid className='bg-slate-100 mb-1'>
      <Navbar.Brand as={Link} to="/">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Site Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Strona Główna</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <DarkThemeToggle />
      <Navbar.Collapse>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;