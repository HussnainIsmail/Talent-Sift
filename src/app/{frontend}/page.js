
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Header from './components/Header'; 
const App = () => {
  return (
    <Provider store={store}>
      <Header />
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
