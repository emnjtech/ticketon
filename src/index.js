import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TicketonState from './context/ticketon-state';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TicketonState>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TicketonState>
);