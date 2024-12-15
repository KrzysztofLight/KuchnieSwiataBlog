import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

async function addFoodItem(formData) {
  const response = await fetch('http://localhost:8000/api/food', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to add food item.');
  }

  return response.json();
}

export default function AddFood() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredientsCount, setIngredientsCount] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [method, setMethod] = useState('');
  const [category, setCategory] = useState('Śniadanie');
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: addFoodItem,
    onSuccess: () => {
      alert('Food item added successfully!');
      setName('');
      setDescription('');
      setIngredientsCount(0);
      setIngredients([]);
      setMethod('');
      setCategory('Śniadanie');
      setPhoto(null);
      navigate('/'); // Redirect to home or another page after adding food
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleIngredientsChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('ingredients', JSON.stringify(ingredients));
    formData.append('method', method);
    formData.append('category', category);
    if (photo) {
      formData.append('photo', photo);
    }
    mutation.mutate(formData);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-1/3">
        <h2 className="text-2xl mb-4 text-gray-900 dark:text-gray-100">Dodaj nowe jedzenie</h2>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Nazwa</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Opis</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Ile chcesz składników?</label>
          <input
            type="number"
            value={ingredientsCount}
            onChange={(e) => {
              const count = parseInt(e.target.value, 10);
              if (!isNaN(count) && count >= 0) {
                setIngredientsCount(count);
                setIngredients(Array(count).fill(''));
              } else {
                setIngredientsCount(0);
                setIngredients([]);
              }
            }}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>
        {Array.from({ length: ingredientsCount }).map((_, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Składnik {index + 1}</label>
            <input
              type="text"
              value={ingredients[index] || ''}
              onChange={(e) => handleIngredientsChange(index, e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              required
            />
          </div>
        ))}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Metoda</label>
          <textarea
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Kategoria</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          >
            <option value="Śniadanie">Śniadanie</option>
            <option value="Obiad">Obiad</option>
            <option value="Kolacja">Kolacja</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Zdjęcie</label>
          <input
            type="file"
            accept="image/png"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 dark:bg-blue-900 text-white p-2 rounded">Dodaj jedzenie</button>
      </form>
    </div>
  );
}