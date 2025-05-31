import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"; 
import Login from './Pages/Login/Login.jsx'; 

import './index.css';


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
        {/* 4. Usa el componente LoginPage en la ruta de login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  </StrictMode>
);