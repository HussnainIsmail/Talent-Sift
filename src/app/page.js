'use client';
import React from 'react';
import { FilterProvider } from './{frontend}/sections/FilterContext';
import NavBar from './{frontend}/sections/NavBar';
import Header from './{frontend}/sections/Header';
import MainSection from './{frontend}/sections/MainSection';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '68d431386799dc1b76cd',
    cluster: 'ap2',
    forceTLS: true,
});

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
