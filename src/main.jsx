import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './auth';
import { CartProvider } from './CartContext';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <CartProvider>
      <Router>
        <Toaster position="top-center" reverseOrder={false} />
        <App />
      </Router>
    </CartProvider>
  </AuthProvider>
);
