import Search from "../components/Search.tsx";
import {useState, useEffect} from "react";
import {getAllProperties} from "../services/propertyService.js";

export default function Properties() {
    const [properties, setProperties] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const data = await getAllProperties();
                setProperties(data);
            } catch (err) {
                setError(err.detail);
            } finally {
                setLoading(false);
            }
        };
        fetchProperties().then();
    }, []);

    if (loading) return <p>Cargando Propiedades...</p>
    if (error) return <p>{error}</p>

    return (
      <div className="flex h-[1270px]">
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
                        <h2>{property.name}</h2>
                        <p>${property.price}</p>
                        <p>{property.address}</p>
                        <p>{property.model_type}</p>
                        <p>{property.status}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    );
}