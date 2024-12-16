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
      navigate('/');
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
 
  const handleAddIngredient = () => {
    if (ingredientsCount < 10) {
      setIngredientsCount(ingredientsCount + 1);
      setIngredients([...ingredients, '']);
    }
  };
 
  const handleRemoveIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
    setIngredientsCount(newIngredients.length);
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
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-2/3 lg:w-1/3">
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
            <option value="Deser">Deser</option>
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
 
      {/* Ingredients Section */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded w-1/3 lg:w-1/4 p-4 ml-6">
        <h3 className="text-xl mb-4 text-gray-900 dark:text-gray-100">Składniki</h3>
        <div>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center mb-3">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientsChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder={`Składnik ${index + 1}`}
                required
              />
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          <button
            type="button"
            onClick={handleAddIngredient}
            disabled={ingredientsCount >= 10}
            className={`w-3/4 p-2 border rounded ${ingredientsCount >= 10 ? 'bg-gray-400 text-gray-600' : 'bg-blue-500 text-white'}`}
          >
            {ingredientsCount >= 10 ? 'Maksymalna liczba składników' : 'Dodaj składnik'}
          </button>
          <button
            type="button"
            onClick={() => handleRemoveIngredient(ingredientsCount - 1)}
            disabled={ingredientsCount === 0}
            className={`w-1/4 p-2 border rounded ${ingredientsCount === 0 ? 'bg-gray-400 text-gray-600' : 'bg-red-500 text-white'}`}
          >
            Usuń składnik
          </button>
        </div>
      </div>
    </div>
  );
}
 