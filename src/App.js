import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainSite from './routes/Home';
import Register from './routes/Register';
import Login from './routes/Login';
import Navbar from './routes/Navbar';
import FoodList from './routes/FoodList';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Food from './routes/Food';
import FoodCategory from './routes/FoodCategory';
import AddFood from './routes/AddFood';
import Footer from './routes/Footer';
import AdminDeleteFood from './routes/AdminDeleteFood';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route exact path="/" element={<MainSite />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/food" element={<FoodList />} />
              <Route path="/food/:name" element={<Food />} />
              <Route path="/food/category/:category" element={<FoodCategory />} />
              <Route path="/add-food" element={<AddFood />} />
              <Route path="/admin/delete-food" element={<AdminDeleteFood />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;