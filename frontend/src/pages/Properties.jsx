import Search from "../components/Search.tsx";
import {useState, useEffect, useCallback} from "react";
import {getAllProperties} from "../services/propertyService.js";

export default function Properties() {
    const [properties, setProperties] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const limit = 10;

    const fetchProperties = useCallback(async () => {
        setLoading(true);
            try {
                const data = await getAllProperties(page, limit);
                setProperties(data);
                setHasMore(data.length === limit);
            } catch (err) {
                setError(err.detail);
            } finally {
                setLoading(false);
            }
    }, [page, limit]);

    useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);

    if (loading) return <p>Cargando Propiedades...</p>
    if (error) return <p>{error}</p>

    return (
      <div className="flex h-[1920px]">
        <div className="w-[330px] bg-zinc-50 text-center p-2">
            <h3 className="font-bold text-xl">Filtros</h3>
            <div className="">
                <input type="checkbox" id="Casa" name="typeProperty" value="Casa"/>
                <label htmlFor="Casa">Casa</label>
                <input type="checkbox" id="Departamento" name="typeProperty" value="Departamento"/>
                <label htmlFor="Departamento">Departamento</label>
                <input type="checkbox" id="Otro" name="typeProperty" value="Otro"/>
                <label htmlFor="Otro">Otro</label>
            </div>
        </div>
        <div className="w-full">
            <Search/>
            <div className="grid grid-cols-2 gap-6 p-4">
                {properties.map((property) => (
                    <div key={property.id}>
                        <img src={property.image} alt={property.name} className="w-full h-48 object-cover"/>
                        <h2>{property.name}</h2>
                        <p>${property.price.toLocaleString("es-MX")}</p>
                        <p>{property.address}</p>
                        <p>Type: {property.model_type}</p>
                        <p>{property.status}</p>
                    </div>
                ))}
            </div>
            <div>
                <button onClick={() => setPage((p) => Math.max( p - 1, 1))}
                    disabled={page === 1}
                    className=""
                >
                    Anterior
                </button>
                <span className="">Página {page}</span>
                <button onClick={() => setPage((p) => (hasMore ? p + 1 : p))}
                    disabled={!hasMore}
                    className=""
                >
                    Siguiente
                </button>
            </div>
        </div>
      </div>
    );
}