import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainSite from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<MainSite />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;