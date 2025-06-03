import { StrictMode, useEffect } from 'react'; // Importa useEffect
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from './Pages/Login/Login.jsx';

import './index.css'; // Importa tus estilos globales

// Función para aplicar el tema
const applyTheme = (theme) => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark-theme');
  } else {
    document.documentElement.classList.remove('dark-theme');
  }
};

// Aplica el tema guardado al inicio
const initialTheme = localStorage.getItem('theme') || 'light'; // 'light' como fallback
applyTheme(initialTheme);

function LoginPage() {
  const navigate = useNavigate();
  const handleLoginSuccess = () => {
    navigate('/');
  };
  return <Login onLogin={handleLoginSuccess} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  </StrictMode>
);