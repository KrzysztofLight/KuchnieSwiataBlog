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
          <span className="text-gray-900 self-center whitespace-nowrap text-xl font-semibold dark:text-white" as={Link} to="/">Strona Główna</span>
        </Navbar.Brand>
        <div className="flex justify-center gap-6 flex-1">
          <Link to="/food" className='text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 self-center font-semibold'>
            Lista dań
          </Link>
          <Link to="/add-food" className='text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 self-center font-semibold'>
            Dodaj przepis
          </Link>
        </div>
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
            {user && user.isAdmin && (
              <Dropdown.Item>
                <Link to="/admin/delete-food">Admin Delete Food</Link>
              </Dropdown.Item>
            )}
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