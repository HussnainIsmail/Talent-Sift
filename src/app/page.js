'use client';
import React from 'react';
import { FilterProvider } from './{frontend}/sections/FilterContext';
import NavBar from './{frontend}/sections/NavBar';
import Header from './{frontend}/sections/Header';
import MainSection from './{frontend}/sections/MainSection';

const App = () => {
    return (
        <FilterProvider>
            <div>
                <NavBar />
                <Header />
                <MainSection />
            </div>
        </FilterProvider>
    );
};

export default App;
