import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

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

  const mutation = useMutation( {
    mutationFn: registerUser,
    onSuccess: () => {
      alert('User registered successfully!');
      setName('');
      setEmail('');
      setPassword('');
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
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-1/3">
        <h2 className="text-2xl mb-4">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}