import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Avatar, Dropdown } from 'flowbite-react';
import { DarkThemeToggle } from 'flowbite-react';
import { AuthContext } from '../contexts/AuthContext';

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

const NavigationBar = () => {
  const theme = useThemeMode();
  const [logo, setLogo] = useState('/Images/LogoLight.png');
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    setLogo(theme === 'dark' ? '/Images/LogoDark.png' : '/Images/LogoLight.png');
  }, [theme]);

  return (
    <>
      <Navbar fluid className='bg-slate-300 mb-1'>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} className="mr-3 h-6 sm:h-9" alt="Site Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white" as={Link} to="/">Strona Główna</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar icon="" alt="avatar" className='' rounded />
            }
          >
            <Dropdown.Header>
              {user ? (
                <div>
                  <span>{user.name || 'No Name'}</span> 
                  <br></br>
                  <span>{user.email || 'No Email'}</span>
                </div>
              ) : (
                <div>Placeholder Name | Placeholder Email</div>
              )}
            </Dropdown.Header>
            {user.isAdmin && <Dropdown.Item>Skibidi</Dropdown.Item>}
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            {user ? (
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            ) : (
              <Dropdown.Item as={Link} to="/login">Sign in</Dropdown.Item>
            )}
          </Dropdown>
          <DarkThemeToggle />
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavigationBar;