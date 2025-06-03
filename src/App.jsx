import { useEffect, useState } from "react";
import "@google/model-viewer"; // Importa el visualizador de modelos 3D
import { productos } from "./data"; // Importa los datos de los productos
import { Navbar } from "./Components/Navbar/navbar"; // Importa el componente Navbar
import "./App.css"; // Importa los estilos principales de la aplicación
import { useNavigate, Routes, Route } from "react-router-dom"; // Importa utilidades de React Router
import CartPage from "./Components/CartPage/CartPage"; // Importa la página del carrito
import ProductDetail from "./Pages/ProductDetail/ProductDetail"; // Importa la página de detalle del producto
import CheckoutForm from "./Pages/Form/CheckoutForm"; // Importa el formulario de compra
import Bill from "./Pages/Bill/Bill"; // Importa la página de la factura
import History from "./Pages/History/History"; // Importa la página del historial
import Favorite from "./Pages/Favorite/Favorite"; // Importa la página de favoritos
import DarkModeToggle from "./Components/DarkModeToggle/DarkModeToggle"; // Importa el componente para cambiar el modo oscuro

function App() {
    const navigate = useNavigate(); // Hook para la navegación programática
    // Estado para el carrito de compras, inicializado como un array vacío
    const [carrito, setCarrito] = useState([]);
    // Estado para los datos de la compra, inicializado como null
    const [datosCompra, setDatosCompra] = useState(null);
    // Estado para los productos favoritos, se inicializa desde localStorage o como array vacío
    const [favoritos, setFavoritos] = useState(() => {
      const guardados = localStorage.getItem("favoritos");
      return guardados ? JSON.parse(guardados) : [];
    });

    // Estado para el modo oscuro, se inicializa desde localStorage o como 'light'
    const [isDarkMode, setIsDarkMode] = useState(() => {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark'; // Devuelve true si el tema guardado es 'dark'
    });

    // Efecto para aplicar la clase del tema al HTML y guardar en localStorage
    useEffect(() => {
      if (isDarkMode) {
        document.documentElement.classList.add('dark-theme'); // Añade clase para tema oscuro
        localStorage.setItem('theme', 'dark'); // Guarda 'dark' en localStorage
      } else {
        document.documentElement.classList.remove('dark-theme'); // Remueve clase para tema claro
        localStorage.setItem('theme', 'light'); // Guarda 'light' en localStorage
      }
    }, [isDarkMode]); // Se ejecuta cada vez que isDarkMode cambia

    // Función para cambiar el estado del modo oscuro
    const toggleDarkMode = () => {
      setIsDarkMode(prevMode => !prevMode); // Invierte el valor actual de isDarkMode
    };

    // Efecto para redirigir al login si no hay un usuario actual en localStorage
    useEffect(() => {
        if (!localStorage.getItem("currentUser")) {
            navigate("/login"); // Redirige a la página de login
        }
    }, [navigate]); // Se ejecuta cuando el componente se monta o navigate cambia

    // Efecto para guardar los favoritos en localStorage cada vez que cambian
    useEffect(() => {
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }, [favoritos]); // Se ejecuta cada vez que el estado 'favoritos' cambia

    // Función para agregar un producto al carrito
    const agregarAlCarrito = (producto) => {
        setCarrito((prevCarrito) => {
            const existe = prevCarrito.find((item) => item.id === producto.id);
            if (existe) {
                // Si el producto ya está en el carrito, incrementa su cantidad
                return prevCarrito.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            } else {
                // Si el producto no está, lo añade con cantidad 1
                return [...prevCarrito, { ...producto, cantidad: 1 }];
            }
        });
    };
    
    // Función para agregar un producto a favoritos
    const agregarFavoritos = (producto) => {
      setFavoritos((prevFavoritos) => {
        const existe = prevFavoritos.find((p) => p.id === producto.id);
        if (existe) {
          // Si ya es favorito, no se duplica (o podrías implementar lógica para quitarlo)
          return prevFavoritos;
        } else {
          // Añade el producto a favoritos
          return [...prevFavoritos, producto]; // No es necesario cantidad para favoritos generalmente
        }
      });
    };

    // Función para eliminar un producto de favoritos por su ID
    const eliminarFavoritos = (id) => {
      const nuevosFavoritos = favoritos.filter((p) => p.id !== id);
      setFavoritos(nuevosFavoritos);
    };

    return (
      <div className="app">
          {/* Renderiza la barra de navegación, pasando el carrito y favoritos como props */}
          <Navbar carrito={carrito} favorito={favoritos}/>
          <main className="main-content">
              {/* Define las rutas de la aplicación */}
              <Routes>
                  <Route
                    path="/" // Ruta principal
                    element={
                        <div className="galeria">
                            {/* Mapea los productos para mostrarlos en la galería */}
                            {productos.map((item) => (
                                <div 
                                  key={item.id} 
                                  className="producto"
                                  // Navega al detalle del producto al hacer clic
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
                                        e.stopPropagation(); // Evita que el clic se propague al div padre
                                        agregarAlCarrito(item); // Agrega al carrito
                                      }}
                                    > 🛒 Agregar al carrito
                                    </button>
                                </div>
                            ))}
                        </div>
                        }
                  />
                  {/* Ruta para la página del carrito */}
                  <Route
                    path="/cart"
                    element={<CartPage carrito={carrito} setCarrito={setCarrito} />}
                  />
                  {/* Ruta para la página de detalle del producto, con ID dinámico */}
                  <Route path="/producto/:id" element=
                    {<ProductDetail 
                        agregarFavoritos={agregarFavoritos} 
                        agregarAlCarrito={agregarAlCarrito} 
                    />}
                   />
                  {/* Ruta para el formulario de compra */}
                  <Route path="/form"
                    element = {
                      <CheckoutForm
                        carrito={carrito}
                        setCarrito={setCarrito}
                        setDatosCompra={setDatosCompra}
                      />
                    }
                  />
                  {/* Ruta para la página de la factura */}
                  <Route path="/bill" element={<Bill datos={datosCompra} /> } />
                  {/* Ruta para la página del historial de compras */}
                  <Route path="/history" element={<History />} />
                  {/* Ruta para la página de favoritos */}
                  <Route path="/favorite" element={<Favorite 
                    favoritos={favoritos}  
                    eliminarFavoritos={eliminarFavoritos}
                  />} />
              </Routes>
          </main>
          {/* Renderiza el botón para cambiar el modo oscuro */}
          <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </div>
    );
  }

export default App;