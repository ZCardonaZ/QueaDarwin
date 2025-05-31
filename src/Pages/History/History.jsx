import { useEffect, useState } from "react";
import "./History.css";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [historial, setHistorial] = useState([]);

  const navigate = useNavigate();  
  const volverInicio = () => {
        navigate("/");
    };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("historialCompras")) || [];
    setHistorial(data);
  }, []);

  if (historial.length === 0) {
    return (
       <div className="vacio">
        <p className="historial-vacio">No hay compras registradas.</p>
        <button onClick={() => navigate("/")} id="empty-btn">
          Volver a la tienda
        </button>
       </div>
    );
  }

  return (
    <div className="historial">
      <h2>Historial de Compras</h2>
      {historial.map((compra, index) => (
        <div key={index} className="factura-item">
          <p><strong>Nombre:</strong> {compra.nombre}</p>
          <p><strong>Dirección:</strong> {compra.direccion}, {compra.ciudad}</p>
          <p><strong>Teléfono:</strong> {compra.telefono}</p>
          <p><strong>Fecha:</strong> {compra.fecha}</p>
          <ul>
            {compra.carrito.map((item) => (
              <li key={item.id}>
                {item.nombre} x {item.cantidad} = ${item.precio * item.cantidad}
              </li>
            ))}
          </ul>
          <p><strong>Subtotal:</strong> ${compra.subtotal.toFixed(2)}</p>
          <p><strong>IVA:</strong> ${compra.iva.toFixed(2)}</p>
          <p><strong>Total:</strong> ${compra.total.toFixed(2)}</p>
          <hr />
        </div>
      ))}
       <button onClick={volverInicio} className="volver-inicio">
          Volver a la tienda
       </button>
    </div>
  );
}
