import {useState, useEffect, useCallback} from "react";
import {getAllProperties} from "../services/propertyService.js";
import {mapPropertyStatus} from "../utils/statusMapper.js";
import {getStatusColor} from "../utils/statusColor.js";

export default function Properties() {
    const [properties, setProperties] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState("");

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const limit = 10;

    // Filtros reales
    const [filters, setFilters] = useState({
        type_f: "",
        min_price: "",
        max_price: "",
        location: ""
    });

    // Filtros temporales (mientras el usuario escribe)
    const [draftFilters, setDraftFilters] = useState({
        type_f: "",
        min_price: "",
        max_price: "",
        location: ""
    });

    // Manejar cambios en inputs
    const handleDraftChange = (e) => {
        setDraftFilters({
            ...draftFilters,
            [e.target.name]: e.target.value
        });
    };

    // Aplicar los filtros SOLO cuando presionan el botón
    const applyFilters = () => {
        setFilters(draftFilters);
        setPage(1);
    };


    const fetchProperties = useCallback(async () => {
        setLoading(true);
            try {
                const data = await getAllProperties({
                    page,
                    limit,
                    ...filters
                });
                setProperties(data);
                setHasMore(data.length === limit);
            } catch (err) {
                setError(err.detail);
            } finally {
                setLoading(false);
            }
    }, [page, filters]);

    useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);

    if (loading) return <p>Cargando Propiedades...</p>
    if (error) return <p>{error}</p>

    return (
      <div className="min-h-screen bg-gray-50">
          <div className="bg-[#252525] text-white py-12">
              <div className="container mx-auto px-4">
                  <h1 className="text-4xl md:text-5xl font-bold text-center">
                      Propiedades Disponibles
                  </h1>
                  <p className="text-center mt-4 text-gray-300">
                      Encuentra tu hogar ideal con Century 21
                  </p>
              </div>
          </div>
          {/* Panel de filtros */}
          <div className="container mx-auto px-4 py-8">
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-t-4 border-[#beaf87]">
                  <h2 className="text-2xl font-bold text-[#252525] mb-6">Filtrar Propiedades</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Filtro por tipo */}
                      <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Tipo de Propiedad
                          </label>
                          <select
                              name="type_f"
                              value={draftFilters.type_f}
                              onChange={handleDraftChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#beaf87] focus:border-transparent"
                          >
                              <option value="">Todos</option>
                              <option value="house">Casa</option>
                              <option value="department">Departamento</option>
                          </select>
                      </div>
                      {/* Filtro precio mínimo */}
                      <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Precio Mínimo
                          </label>
                          <input
                              type="number"
                              name="min_price"
                              value={draftFilters.min_price}
                              onChange={handleDraftChange}
                              placeholder="Ej: 0"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#beaf87] focus:border-transparent"
                          />
                      </div>

                      {/* Filtro precio máximo */}
                      <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Precio Máximo
                          </label>
                          <input
                              type="number"
                              name="max_price"
                              value={draftFilters.max_price}
                              onChange={handleDraftChange}
                              placeholder="Ej: 10,000,000"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#beaf87] focus:border-transparent"
                          />
                      </div>

                      {/* Filtro por ubicación */}
                      <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Ubicación
                          </label>
                          <input
                              type="text"
                              name="location"
                              value={draftFilters.location}
                              onChange={handleDraftChange}
                              placeholder="Ej: Polanco, CDMX"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#beaf87] focus:border-transparent"
                          />
                      </div>
                  </div>
                  {/* Botón filtrar */}
                  <div className="mt-6 flex justify-end">
                      <button
                          onClick={applyFilters}
                          className="bg-[#beaf87] hover:bg-[#B8941F] text-white font-bold py-3 px-8 rounded-md transition-colors duration-300 shadow-md"
                      >
                          Filtrar Propiedades
                      </button>
                  </div>
              </div>
              <div className="grid grid-cols-3 gap-6 p-4">
                    {properties.map((property) => (
                        <div
                            key={property.id}
                            className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={property.img_url}
                                    alt={property.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4 bg-[#beaf87] text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    {property.model_type}
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-bold text-[#252525] mb-2 line-clamp-1">{property.name}</h3>
                                <p>${property.price.toLocaleString("es-MX")}</p>
                                <p>{property.address}</p>
                                <p className={`px-2 py-1 rounded-full font-extralight w-24 text-center ${getStatusColor(property.status)}`}>
                                    {mapPropertyStatus(property.status)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            <div className="w-full flex justify-center gap-6  items-center">
                <button onClick={() => setPage((p) => Math.max( p - 1, 1))}
                    disabled={page === 1}
                        className={`text-sm p-2 rounded-md transition-all duration-200
                            ${hasMore
                                ? "border-1 text-gray-400 cursor-not-allowed"
                                : "bg-black text-white hover:bg-gray-700 cursor-pointer"
                        }`}

                >
                    Anterior
                </button>
                <span className="underline">Página {page}</span>
                <button onClick={() => setPage((p) => (hasMore ? p + 1 : p))}
                    disabled={!hasMore}
                    className={`text-sm p-2 rounded-md transition-all duration-200
                        ${hasMore 
                            ? "bg-black text-white  hover:bg-gray-700 cursor-pointer"
                            : "border-1 text-gray-400 cursor-not-allowed"    
                    }`}
                >
                    Siguiente
                </button>
            </div>
        </div>
      </div>
    );
}