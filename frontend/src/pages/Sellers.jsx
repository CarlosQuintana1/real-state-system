// pages/Sellers.jsx
import { useEffect, useState } from "react";
import { getAllSellers } from "../services/sellerService.js";

export default function Sellers() {
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchSellers() {
            try {
                const data = await getAllSellers();
                setSellers(data);
            } catch (err) {
                setError("Hubo un error al cargar los vendedores.");
            } finally {
                setLoading(false);
            }
        }

        fetchSellers();
    }, []);

    if (loading)
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-600 text-lg animate-pulse">
                    Cargando vendedores...
                </p>
            </div>
        );

    if (error)
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );

    return (
        <div className="px-6 py-8">
            <h1 className="text-3xl font-semibold mb-6 text-gray-800">
                Lista de Vendedores
            </h1>
            <p className="text-xl text-gray-500 mb-2">
                Elige a tu vendedor favorito que te acompañara en esta Nueva Experiencia
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sellers.map((seller) => (
                    <div
                        key={seller.id}
                        className="bg-white shadow-md rounded-xl p-5 border border-[#beaf87] hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            {seller.name}
                        </h2>

                        <p className="text-gray-600 mb-4">{seller.email}</p>

                        <div className="mt-4 flex justify-end">
                            <button className="px-4 py-2 bg-black text-white font-bold text-sm rounded-lg">
                                Contactar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
