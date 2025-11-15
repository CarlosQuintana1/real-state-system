import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPropertyById } from "../services/propertyService.js";
import { mapPropertyStatus } from "../utils/statusMapper.js";
import { getStatusColor } from "../utils/statusColor.js";
import { mapTypeProperty } from "../utils/typeProperty.js";
import {getAllSellers} from "../services/sellerService.js";

export default function PropertyDetail() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [sellers, setSellers] = useState([]);
    const [sellerName, setSellerName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Cargar propiedad
    useEffect(() => {
        async function fetchProperty() {
            try {
                const data = await getPropertyById(id);
                setProperty(data);
            } catch (err) {
                setError("No se pudo cargar la propiedad.");
            }
        }
        fetchProperty();
    }, [id]);

    // Cargar sellers
    useEffect(() => {
        async function fetchSellers() {
            try {
                const data = await getAllSellers();
                setSellers(data);
            } catch (err) {
                console.error("Error al cargar sellers:", err);
            }
        }
        fetchSellers();
    }, []);

    // Actualizar sellerName cuando property y sellers estén disponibles
    useEffect(() => {
        if (property && sellers.length) {
            const seller = sellers.find(s => s.id === property.seller_id);
            setSellerName(seller?.name || "Vendedor no encontrado");
            setLoading(false);
        }
    }, [property, sellers]);

    if (loading) return <p>Cargando propiedad...</p>;
    if (error) return <p>{error}</p>;
    if (!property) return <p>No se encontró la propiedad.</p>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                    src={property.img_url}
                    alt={property.name}
                    className="w-full h-96 object-cover"
                />
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-[#252525] mb-4">
                        {property.name}
                    </h1>

                    <p className="text-xl text-gray-700 mb-2">
                        Precio: ${property.price.toLocaleString("es-MX")}
                    </p>
                    <p className="text-gray-600 mb-2">{property.address}</p>
                    <p>Asesor: {sellerName}</p>

                    <span className={`inline-block px-3 py-1 mt-2 rounded-full text-sm font-light ${getStatusColor(property.status)}`}>
                        {mapPropertyStatus(property.status)}
                    </span>

                    <div className="mt-6">
                        <p className="text-lg font-semibold">
                            Tipo de propiedad: {mapTypeProperty(property.model_type)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
