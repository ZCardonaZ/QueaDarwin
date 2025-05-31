import { useEffect, useState } from "react";
import "@google/model-viewer";
import { productos } from "./data";
import { Navbar } from "./Components/Navbar/navbar";
import "./App.css";
import { useNavigate, Routes, Route } from "react-router-dom";
import CartPage from "./Components/CartPage/CartPage";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import CheckoutForm from "./Pages/Form/CheckoutForm";
import Bill from "./Pages/Bill/Bill"
import History from "./Pages/History/History";
import Favorite from "./Pages/Favorite/Favorite"

function App() {
    const navigate = useNavigate();
    const [carrito, setCarrito] = useState([]);
    const [datosCompra, setDatosCompra] = useState(null);
    const [favoritos, setFavoritos] = useState(() => {
      const guardados = localStorage.getItem("favoritos");
      return guardados ? JSON.parse(guardados) : [];
    });

    useEffect(() => {
        if (!localStorage.getItem("currentUser")) {
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }, [favoritos]);

    const agregarAlCarrito = (producto) => {
        setCarrito((prev) => {
            const existe = prev.find((item) => item.id === producto.id);
            if (existe) {
                return prev.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                    );
                } else {
                  return [...prev, { ...producto, cantidad: 1 }];
            }
        });
    };
    
    const agregarFavoritos = (producto) => {
      setFavoritos((prev) => {
        const existe = prev.find((p) => p.id === producto.id);
        if (existe) {
          return prev.map((p) =>
            p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
          );
        } else {
          return [...prev, { ...producto, cantidad: 1 }];
        }
      });
    };

    const eliminarFavoritos = (id) => {
      const nuevosFavoritos = favoritos.filter((p) => p.id !== id);
      setFavoritos(nuevosFavoritos);
      localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
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
                                  onClick={() => navigate(`/producto/${item.id}`)}
                                  style={{ cursor: "pointer" }}
                                >
                                    <model-viewer
                                        src={item.modelo}
                                        alt={item.nombre}
                                        auto-rotate
                                        camera-controls
                                        ar
                                        style={{ width: "250px", height: "250px" }}
                                    />
                                    <h2>{item.nombre}</h2>
                                    <p>${item.precio}</p>
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        agregarAlCarrito(item);
                                      }}
                                    > 🛒 Agregar al carrito
                                    </button>
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
                  {<ProductDetail agregarFavoritos={agregarFavoritos} agregarAlCarrito={agregarAlCarrito}  />}
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
      </div>
    );
  }

export default App;
