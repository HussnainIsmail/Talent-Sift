// frontend/App.js
import React from 'react';
import { FilterProvider } from './components/FilterContext';
import Header from "../sections/Header";
import MainSection from '../sections/MainSection';

const App = () => {
  return (
    <FilterProvider>
      <div>
        <Header />
        <MainSection />
      </div>
    </FilterProvider>
  );
};

export default App;
