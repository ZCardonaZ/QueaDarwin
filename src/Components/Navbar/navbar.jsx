import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useState, useEffect} from "react";

export const Navbar = ({ carrito, favorito }) => {
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("currentUser")
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser(null);
    navigate("/login");
    setShowDropdown(false);
  };

  const goToCart = () => {
    navigate("/cart");
  };

  const goToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showDropdown && !e.target.closest(".user-dropdown")) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDropdown]);

  return (
   <header className="navbar">
    <div className="navbar-brand">
      <h1 onClick={goToHome} style={{ cursor: "pointer" }}>
        Tienda 3D
      </h1>
    </div>

    <button 
      className="hamburger-menu"
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    >
       ☰
    </button>

    <div className={`navbar-actions ${mobileMenuOpen ? "open" : "" }`}>
    
      <button className="icon-container" id="fav" onClick={() => {
        navigate("/favorite");
        setMobileMenuOpen(false);}}>
          <span className="fav-icon">🤍 Favoritos</span>
            {favorito.length > 0 && (
          <span className="badge">{favorito.length}</span>
          )}
      </button>

      <button className="icon-container" onClick={() => {
          goToCart(); 
          setMobileMenuOpen(false);
        }}>
          <span className="cart-icon">🛒 Mi carrito</span>
            {carrito.length > 0 && (
          <span className="badge">{carrito.length}</span>
          )}
      </button>

      <button className="history-button" onClick={() => {
        navigate("/history");
        setMobileMenuOpen(false);
        }}>
        📋 Historial
      </button>

      <div className="user-dropdown">
        <button
          className={`user-button ${showDropdown ? "active" : ""}`}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {currentUser} <span className="dropdown-icon">▼</span>
        </button>
        {showDropdown && (
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  </header>
  );
};

export default Navbar;
