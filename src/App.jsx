import { useEffect, useState } from "react";
import "@google/model-viewer";
import { productos } from "./data";
import { Navbar } from "./Components/Navbar/navbar";
import "./App.css";
import { useNavigate, Routes, Route } from "react-router-dom";
import CartPage from "./Components/CartPage/CartPage";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import CheckoutForm from "./Pages/Form/CheckoutForm";
import Bill from "./Pages/Bill/Bill";
import History from "./Pages/History/History";
import Favorite from "./Pages/Favorite/Favorite";
import DarkModeToggle from "./Components/DarkModeToggle/DarkModeToggle";

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
        setCarrito((prevCarrito) => {
            const existe = prevCarrito.find((item) => item.id === producto.id);
            if (existe) {
                return prevCarrito.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                    );
                } else {
                  return [...prevCarrito, { ...producto, cantidad: 1 }];
            }
        });
    };
    
    const agregarFavoritos = (producto) => {
      setFavoritos((prevFavoritos) => {
        const existe = prevFavoritos.find((p) => p.id === producto.id);
        if (existe) {
          
          console.log("Producto ya en favoritos");
          return prevFavoritos.filter(p => p.id !== producto.id); 
        } else {
          console.log("Producto añadido a favoritos");
          return [...prevFavoritos, producto];
        }
      });
    };

    const eliminarFavoritos = (id) => {
      const nuevosFavoritos = favoritos.filter((p) => p.id !== id);
      setFavoritos(nuevosFavoritos);
    };

    
    const esFavorito = (productoId) => {
        return favoritos.some(fav => fav.id === productoId);
    };

    return (
      <div className="app">
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
                                    <div className="producto-botones-container"> {/* Nuevo contenedor para botones */}
                                        <button className="btn-agregar-carrito" onClick={(e) => {
                                            e.stopPropagation(); 
                                            agregarAlCarrito(item);
                                          }}
                                        > Agregar al carro
                                        </button>
                                        <button 
                                          className={`btn-agregar-favoritos ${esFavorito(item.id) ? 'favorito-activo' : ''}`}
                                          onClick={(e) => {
                                            e.stopPropagation(); 
                                            agregarFavoritos(item);
                                          }}
                                          aria-label="Agregar a favoritos"
                                        >
                                          
                                          {esFavorito(item.id) ? '❤️' : '🤍'} {/* Corazón relleno o vacío */}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        }
                  />
                  <Route
                    path="/cart"
                    element={<CartPage carrito={carrito} setCarrito={setCarrito} />}
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
                  <Route path="/bill" element={<Bill datos={datosCompra} /> } />
                  <Route path="/history" element={<History />} />
                  <Route path="/favorite" element={<Favorite 
                    favoritos={favoritos}  
                    eliminarFavoritos={eliminarFavoritos}
                  />} />
              </Routes>
          </main>
          <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </div>
    );
  }

export default App;