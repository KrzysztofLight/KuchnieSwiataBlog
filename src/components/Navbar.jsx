import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar } from 'flowbite-react';

const NavigationBar = () => (
  <Navbar fluid className='bg-slate-100 mb-1'>
    <Navbar.Brand as={Link} to="/">
      <img src="https://cataas.com/cat" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Strona Główna</span>
    </Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse>
      
      <NavLink to="/zadanie2">
        <Navbar.Link as={Link} to="/Gallery">
          Galeria
        </Navbar.Link>
      </NavLink>

    </Navbar.Collapse>
  </Navbar>
);

export default NavigationBar;