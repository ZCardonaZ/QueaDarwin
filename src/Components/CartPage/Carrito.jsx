import { useNavigate } from "react-router-dom";

export function Carrito({ carrito, setCarrito }) {
  const navigate = useNavigate();

  const sub_total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const iva = sub_total * 0.19;
  const total = sub_total + iva;

  const remover = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  return (
    <div className="carrito">
      <h2>🛒 Carrito</h2>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <ul>
            {carrito.map((item) => (
              <li key={item.id}>
                {item.nombre} x {item.cantidad} = ${item.precio * item.cantidad}
                <button onClick={() => remover(item.id)}>×</button>
              </li>
            ))}
          </ul>
          <h3>Sub total: ${sub_total.toFixed(2)}</h3>
          <h3>IVA (19%): ${iva.toFixed(2)}</h3>
          <h3>Total: ${total.toFixed(2)}</h3>
          <button id="fin" onClick={() => navigate("/form")}>
            Finalizar compra
          </button>
        </>
      )}
    </div>
  );
}
