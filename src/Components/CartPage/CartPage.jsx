import { useNavigate } from "react-router-dom";
import { Carrito } from "./Carrito";
import "./CartPage.css";

const CartPage = ({ carrito, setCarrito }) => {
  const navigate = useNavigate();

  const volverInicio = () => {
    navigate("/");
  };

  return (
    <div className="cart-page">
      <h2>Tu Carrito de Compras</h2>
      <Carrito carrito={carrito} setCarrito={setCarrito} />
      <button onClick={volverInicio} className="volver-inicio">
        Volver a la tienda
      </button>
    </div>
  );
};

export default CartPage;
