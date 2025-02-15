'use client';
import React, { createContext, useState } from 'react';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filter, setFilter] = useState(''); // Initial filter state

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};
