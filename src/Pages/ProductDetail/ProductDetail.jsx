import { useParams } from "react-router-dom";
import { productos } from "../../data";
import { useNavigate } from "react-router-dom";
import "./ProductDetail.css";

function ProductDetail({agregarAlCarrito, agregarFavoritos}){
    const { id } = useParams();
    const product = productos.find((p) => p.id === parseInt(id));
    const navigate = useNavigate();
    
    const volverInicio = () => {
        navigate("/");
    };

    if (!product) return <h2> Product not found</h2>

    return (
        <div className="detalle-container">
            <div className="detalle-card">
                <model-viewer
                    src={product.modelo}
                    alt={product.nombre}
                    auto-rotate
                    camera-controls
                    ar
                    className="detalle-model"
                />
                <div className="detalle-info">
                    <h2>{product.nombre}</h2>
                        <p className="detalle-precio">${product.precio}</p>
                        <p className="detalle-descripcion">
                            Este es un excelente producto para tu hogar u oficina.
                        </p>
                    <div className="btn-container">
                        <button 
                            className = "detalle-btn"
                            onClick={() => agregarAlCarrito(product)}
                        > 
                            🛒 Agregar al carrito
                        </button>
                        <button 
                        className="detalle-btn" id="fav"
                        onClick={() => agregarFavoritos(product)}
                        >
                            🤍 Añadir a favoritos
                        </button>
                    </div>
                    <div className="volver-container">
                        <button onClick={volverInicio} className="volver-inicio">
                            Volver a la tienda
                        </button>
                  </div>
                </div>
            </div>
        </div>
    );

}

export default ProductDetail;