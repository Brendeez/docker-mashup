import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import KeywordPage from './pages/KeywordPage';
import SearchPage from './pages/SearchPage';
import NegativePage from './pages/NegativePage';
import TwitterPage from './pages/TwitterPage';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/positiveSearch' element={< SearchPage/>} />
      <Route path='/negativeSearch' element={< NegativePage/>} />
      <Route path='/twitter' element={< TwitterPage/>} />
      <Route path='/keyword' element={< KeywordPage/>} />


    </Routes>
  );
};

export default App;
