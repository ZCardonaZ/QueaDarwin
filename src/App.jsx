import React, { useEffect, useState, useCallback } from "react"; // Añadido useCallback
import "@google/model-viewer";
import { productos } from "./data";
import { Navbar } from "./Components/Navbar/navbar";
import "./App.css"; // Asegúrate que App.css no tenga estilos para .toast-container que puedan chocar
import { useNavigate, Routes, Route } from "react-router-dom";
import CartPage from "./Components/CartPage/CartPage";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import CheckoutForm from "./Pages/Form/CheckoutForm";
import Bill from "./Pages/Bill/Bill";
import History from "./Pages/History/History";
import Favorite from "./Pages/Favorite/Favorite";
import DarkModeToggle from "./Components/DarkModeToggle/DarkModeToggle";
import Toast from "./Components/Toast/Toast"; // Importar el componente Toast
import './Components/Toast/Toast.css'; // Importar los estilos del Toast Container aquí o en index.css

function App() {
    const navigate = useNavigate();
    const [carrito, setCarrito] = useState([]);
    const [datosCompra, setDatosCompra] = useState(null);
    const [favoritos, setFavoritos] = useState(() => {
      const guardados = localStorage.getItem("favoritos");
      return guardados ? JSON.parse(guardados) : [];
    });

    const [isDarkMode, setIsDarkMode] = useState(() => {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark';
    });

    // Estado para las notificaciones
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info') => {
        const id = Date.now() + Math.random(); // ID único para el toast
        setToasts(prevToasts => [...prevToasts, { id, message, type }]);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
    }, []);


    useEffect(() => {
      if (isDarkMode) {
        document.documentElement.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
      }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
      setIsDarkMode(prevMode => !prevMode);
    };

    useEffect(() => {
        if (!localStorage.getItem("currentUser")) {
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }, [favoritos]);

    const agregarAlCarrito = (producto) => {
        let added = false;
        setCarrito((prevCarrito) => {
            const existe = prevCarrito.find((item) => item.id === producto.id);
            if (existe) {
                return prevCarrito.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                    );
            } else {
                  added = true;
                  return [...prevCarrito, { ...producto, cantidad: 1 }];
            }
        });
        addToast(`${producto.nombre} añadido al carrito`, 'success');
    };
    
    const agregarFavoritos = (producto) => {
      let alreadyFavorite = false;
      setFavoritos((prevFavoritos) => {
        const existe = prevFavoritos.find((p) => p.id === producto.id);
        if (existe) {
          alreadyFavorite = true;
          return prevFavoritos.filter(p => p.id !== producto.id); 
        } else {
          return [...prevFavoritos, producto];
        }
      });

      if (alreadyFavorite) {
        addToast(`${producto.nombre} eliminado de favoritos`, 'info');
      } else {
        addToast(`${producto.nombre} añadido a favoritos`, 'info');
      }
    };

    const eliminarFavoritos = (id) => {
      const productoEliminado = favoritos.find(p => p.id === id);
      const nuevosFavoritos = favoritos.filter((p) => p.id !== id);
      setFavoritos(nuevosFavoritos);
      if (productoEliminado) {
        addToast(`${productoEliminado.nombre} eliminado de favoritos`, 'info');
      }
    };

    const esFavorito = (productoId) => {
        return favoritos.some(fav => fav.id === productoId);
    };

    return (
      <div className="app">
          {/* Contenedor para las notificaciones */}
          <div className="toast-container">
            {toasts.map(toast => (
              <Toast 
                key={toast.id} 
                message={toast.message} 
                type={toast.type} 
                onRemove={() => removeToast(toast.id)} 
              />
            ))}
          </div>

          <Navbar carrito={carrito} favorito={favoritos}/>
          <main className="main-content">
              <Routes>
                  <Route
                    path="/"
                    element={
                        <div className="galeria">
                            {productos.map((item) => (
                                <div 
                                  key={item.id} 
                                  className="producto"
                                >
                                    <div onClick={() => navigate(`/producto/${item.id}`)} style={{ cursor: "pointer", width: '100%'}}>
                                        <model-viewer
                                            src={item.modelo}
                                            alt={item.nombre}
                                            auto-rotate
                                            camera-controls
                                            ar
                                        />
                                        <h2>{item.nombre}</h2>
                                        <p>${item.precio}</p>
                                    </div>
                                    <div className="producto-botones-container">
                                        <button className="btn-agregar-carrito" onClick={(e) => {
                                            e.stopPropagation();
                                            agregarAlCarrito(item);
                                          }}
                                        > 🛒 Agregar al carrito
                                        </button>
                                        <button 
                                          className={`btn-agregar-favoritos ${esFavorito(item.id) ? 'favorito-activo' : ''}`}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            agregarFavoritos(item);
                                          }}
                                          aria-label="Agregar a favoritos"
                                        >
                                          {esFavorito(item.id) ? '❤️' : '🤍'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        }
                  />
                  <Route
                    path="/cart"
                    element={<CartPage carrito={carrito} setCarrito={setCarrito} addToast={addToast} />}
                  />
                  <Route path="/producto/:id" element=
                  {<ProductDetail 
                      agregarFavoritos={agregarFavoritos} 
                      agregarAlCarrito={agregarAlCarrito} 
                  />}
                   />
                  <Route path="/form"
                    element = {
                      <CheckoutForm
                        carrito={carrito}
                        setCarrito={setCarrito}
                        setDatosCompra={setDatosCompra}
                      />
                    }
                  />
                  <Route path="/bill" element={<Bill datos={datosCompra} addToast={addToast} /> } />
                  <Route path="/history" element={<History />} />
                  <Route path="/favorite" element={<Favorite 
                    favoritos={favoritos}  
                    eliminarFavoritos={eliminarFavoritos} /* Pasamos la función modificada */
                  />} />
              </Routes>
          </main>
          <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </div>
    );
  }

export default App;
