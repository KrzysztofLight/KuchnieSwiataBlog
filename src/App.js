import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
/*import Zadanie3 from './components/Zadanie3';
import Zadanie4 from './components/Zadanie4';
import Zadanie5 from './components/Zadanie5';
import Zadanie6 from './components/Zadanie6';
import Zadanie7 from './components/Zadanie7';
import Zadanie8 from './components/Zadanie8';
import Zadanie9 from './components/Zadanie9';*/
import NavigationBar from './components/Navbar';

const App = () => (
  <Router>
    <NavigationBar />
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>
);

export default App;