import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Bill.css";

export default function Bill({ datos }) {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  if (!datos) return <p>No hay datos para mostrar.</p>;

  const finalizarCompra = () => {
    const historial = JSON.parse(localStorage.getItem("historialCompras")) || [];
    historial.push(datos);
    localStorage.setItem("historialCompras", JSON.stringify(historial));
    
    setShowSuccess(true);
    
    // 2000 = 2s
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }

  return (
    <div className="factura">
      <h2>Factura de compra</h2>
      <p><strong>Nombre:</strong> {datos.nombre}</p>
      <p><strong>Dirección:</strong> {datos.direccion}, {datos.ciudad}</p>
      <p><strong>Teléfono:</strong> {datos.telefono}</p>
      <p><strong>Fecha:</strong> {datos.fecha}</p>

      <ul>
        {datos.carrito.map((item) => (
          <li key={item.id}>
            {item.nombre} x {item.cantidad} : ${item.precio * item.cantidad}
          </li>
        ))}
      </ul>

      <h3>Subtotal: ${datos.subtotal.toFixed(2)}</h3>
      <h3>IVA: ${datos.iva.toFixed(2)}</h3>
      <h2>Total: ${datos.total.toFixed(2)}</h2>

      <button className="finalizar-btn" onClick={finalizarCompra}>
        Finalizar compra
      </button>

      {/* pop up */}
      {showSuccess && (
        <div className="success-popup">
          <div className="success-content">
            <h3>¡Compra exitosa!</h3>
            <p>Gracias por tu compra</p>
          </div>
        </div>
      )}
    </div>
  );
}