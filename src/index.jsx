import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FeedbackProvider } from './context/FeedbackContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FeedbackProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FeedbackProvider>
);
