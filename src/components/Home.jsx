import React from 'react';
import { useNavigate } from 'react-router';
import { Card, Carousel } from 'flowbite-react';

export default function MainSite() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="hidden md:flex flex-col items-center min-w-[768px]">
      <div className="flex justify-between items-center p-1 bg-gray-800 w-4/5">
        <div className="flex items-center">
          <img src="/Images/Logo.png" alt="Site Logo" className="h-16 w-16 mr-2" />
          <span className="text-xl font-semibold text-white">Kuchnie Świata</span>
        </div>
        <div className="mx-4 w-1/3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Login</button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={handleRegisterClick}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}