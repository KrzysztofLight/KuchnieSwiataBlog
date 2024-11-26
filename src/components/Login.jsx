// src/components/Login.jsx
import React, { useState, useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

async function loginUser(credentials) {
  try {
    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to login.');
      } else {
        const errorText = await response.text();
        console.error('Server response:', errorText);
        throw new Error('Failed to login. Server returned an unexpected response.');
      }
    }

    return response.json();
  } catch (error) {
    throw new Error(error.message || 'Failed to login.');
  }
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      alert('User logged in successfully!');
      login(data.user);
      setEmail('');
      setPassword('');
      navigate('/');
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-1/3">
        <h2 className="text-2xl mb-4 text-gray-900 dark:text-gray-100">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>
        <div className="mt-4 mb-4 text-center">
          <span className="text-blue-800 dark:text-blue-100">Don't have an account? </span>
          <Link to="/register" className="text-red-400 dark:text-red-600">Register</Link>
        </div>
        <button type="submit" className="w-full bg-blue-500 dark:bg-blue-900 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}