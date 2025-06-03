import React from 'react';
import './DarkModeToggle.css'; // Asegúrate de crear este archivo para los estilos

function DarkModeToggle({ isDarkMode, toggleDarkMode }) {
  return (
    <button
      onClick={toggleDarkMode}
      className={`dark-mode-toggle-button ${isDarkMode ? 'dark' : 'light'}`}
      aria-label="Toggle dark mode"
      title={isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
}

export default DarkModeToggle;


