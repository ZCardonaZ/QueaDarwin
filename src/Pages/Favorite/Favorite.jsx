import "./Favorite.css";
import { useNavigate } from "react-router-dom";

export default function Favoritos({ favoritos, eliminarFavoritos }) {

    const navigate = useNavigate();

    if (favoritos.length === 0) {
        return (
            <div className="vacio">
                <p className="favoritos-vacio">No tienes productos favoritos.</p>
                <button onClick={() => navigate("/")} id="empty-btn">
                Volver a la tienda
                </button>
            </div>
        );
    }

    return (
    <div className="favoritos">
        <h2>❤️ Tus productos favoritos</h2>
        <div className="favoritos-lista">
            {favoritos.map((p) => (
                <div key={p.id} className="favorito-card">
                    <model-viewer
                        src={p.modelo}
                        alt={p.nombre}
                        auto-rotate
                        camera-controls
                        ar
                        className="detalle-model"
                        style={{ width: "250px", height: "250px" }}
                    />
                    <h3>{p.nombre}</h3>
                    <p>Precio: ${p.precio}</p>
                 <div className="btn-container">
                       <button
                           className="quitar-favorito"
                           onClick={() => eliminarFavoritos(p.id)}
                       >
                           ❌ Quitar
                       </button>
                    
                       <button
                           className="quitar-favorito"
                           onClick={() => navigate(`/producto/${p.id}`)}
                       >
                           Detalles
                       </button>
                 </div>
                </div>
                
            ))}
          
        </div>
        <button onClick={() => navigate("/")}>
            Volver a la tienda
        </button>
    </div>
    
  );
}
