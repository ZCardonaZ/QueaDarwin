import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CheckoutForm.css";

export default function FormularioCompra({ carrito, setCarrito, setDatosCompra }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    barrio: "", 
    ciudad: "",
    pais: "",   
    telefono: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fecha = new Date().toLocaleString();
    const resumen = {
      ...form,
      carrito,
      fecha,
      subtotal: carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0),
    };
    resumen.iva = resumen.subtotal * 0.19;
    resumen.total = resumen.subtotal + resumen.iva;

    setDatosCompra(resumen); 
    setCarrito([]);
    navigate("/bill");
  };

  return (
    <form className="formulario-compra" onSubmit={handleSubmit}>
      <h2>Finalizar Compra</h2>
      
      <div className="form-group">
        <label htmlFor="nombre">Nombre completo</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          value={form.nombre}
          onChange={handleChange}
          placeholder="Ej: Ana García"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="pais">País</label>
        <input
          id="pais"
          name="pais"
          type="text"
          required
          value={form.pais}
          onChange={handleChange}
          placeholder="Example: Colombia" 
        />
      </div>

      <div className="form-group">
        <label htmlFor="ciudad">Ciudad</label>
        <input
          id="ciudad"
          name="ciudad"
          type="text"
          required
          value={form.ciudad}
          onChange={handleChange}
          placeholder="Example: Medellín" 
        />
      </div>

      <div className="form-group">
        <label htmlFor="barrio">Barrio</label>
        <input
          id="barrio"
          name="barrio"
          type="text"
          required
          value={form.barrio}
          onChange={handleChange}
          placeholder="Example: Laureles" 
        />
      </div>

      <div className="form-group">
        <label htmlFor="direccion">Dirección de envío</label>
        <input
          id="direccion"
          name="direccion"
          type="text"
          required
          value={form.direccion}
          onChange={handleChange}
          placeholder="Ej: Carrera 5 # 10-20"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="telefono">Teléfono de contacto</label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          required
          value={form.telefono}
          onChange={handleChange}
          placeholder="Ej: 3219876543"
        />
      </div>
      
      <button type="submit">
        Confirmar y Generar Factura
      </button>
    </form>
  );
}