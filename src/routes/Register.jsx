import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

async function registerUser(newUser) {
  const response = await fetch('http://localhost:8000/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    throw new Error('Failed to register user.');
  }

  return response.json();
}

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      alert('User registered successfully!');
      localStorage.setItem('user', JSON.stringify(data));
      setName('');
      setEmail('');
      setPassword('');
      navigate('/');
    },
    onError: () => {
      alert('Failed to register user.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ name, email, password });
  };

  return (
    <div className={`flex justify-center items-center h-screen ${darkMode ? 'dark' : ''}`}>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded shadow-md w-1/3">
        <h2 className="text-2xl mb-4">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
            required
          />
        </div>
        <div className="mt-4 mb-4 text-center">
            <span className="text-blue-800 dark:text-blue-100">Already have an account? </span>
            <Link to="/login" className="text-red-400 dark:text-red-600">Login</Link>
        </div>
        <button type="submit" className="w-full bg-blue-500 dark:bg-blue-900 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}