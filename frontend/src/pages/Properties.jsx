import { useState } from "react";

export default function Properties() {
    const mockProperties = [
        {
            id: 1,
            title: "Casa Moderna en Zona Residencial",
            description: "Hermosa casa de 3 recámaras con amplio jardín y cochera para 2 autos.",
            price: 3500000,
            type: "Casa",
            location: "Polanco, CDMX",
            image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=350&fit=crop"
        },
        {
            id: 2,
            title: "Departamento Luxury en Torre Premium",
            description: "Departamento de 2 recámaras en piso 15 con vista panorámica y amenidades de lujo.",
            price: 4200000,
            type: "Departamento",
            location: "Santa Fe, CDMX",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=350&fit=crop"
        },
        {
            id: 3,
            title: "Casa con Alberca y Jardín",
            description: "Espaciosa casa de 4 recámaras con alberca, jardín amplio y área de asador.",
            price: 5800000,
            type: "Casa",
            location: "Cuernavaca, Morelos",
            image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500&h=350&fit=crop"
        },
        {
            id: 4,
            title: "Departamento Céntrico Amueblado",
            description: "Departamento de 1 recámara totalmente amueblado en zona céntrica con estacionamiento.",
            price: 2100000,
            type: "Departamento",
            location: "Roma Norte, CDMX",
            image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=350&fit=crop"
        },
        {
            id: 5,
            title: "Casa Colonial Restaurada",
            description: "Casa estilo colonial de 3 recámaras completamente restaurada con acabados de lujo.",
            price: 6500000,
            type: "Casa",
            location: "San Ángel, CDMX",
            image: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=500&h=350&fit=crop"
        },
        {
            id: 6,
            title: "Penthouse con Terraza Privada",
            description: "Exclusivo penthouse de 3 recámaras con terraza privada de 100m² y jacuzzi.",
            price: 8900000,
            type: "Departamento",
            location: "Interlomas, Estado de México",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=350&fit=crop"
        },
        {
            id: 7,
            title: "Casa Minimalista Nueva",
            description: "Casa de estreno con diseño minimalista, 3 recámaras, sistema domótico completo.",
            price: 4800000,
            type: "Casa",
            location: "Querétaro, Querétaro",
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=350&fit=crop"
        },
        {
            id: 8,
            title: "Departamento Familiar con Balcón",
            description: "Departamento de 2 recámaras con balcón, cocina integral y 2 baños completos.",
            price: 3200000,
            type: "Departamento",
            location: "Narvarte, CDMX",
            image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=500&h=350&fit=crop"
        },
        {
            id: 9,
            title: "Casa Campestre con Vista",
            description: "Casa de 5 recámaras en zona boscosa con vista espectacular y chimenea.",
            price: 7200000,
            type: "Casa",
            location: "Valle de Bravo, Estado de México",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=350&fit=crop"
        }
    ];

    // Estados para filtros
    const [filters, setFilters] = useState({
        type: "",
        minPrice: "",
        maxPrice: "",
        location: ""
    });

    const [filteredProperties, setFilteredProperties] = useState(mockProperties);

    // Manejar cambios en los filtros
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Aplicar filtros
    const applyFilters = () => {
        let filtered = mockProperties;

        // Filtrar por tipo
        if (filters.type) {
            filtered = filtered.filter(prop => prop.type === filters.type);
        }

        // Filtrar por precio mínimo
        if (filters.minPrice) {
            filtered = filtered.filter(prop => prop.price >= Number(filters.minPrice));
        }

        // Filtrar por precio máximo
        if (filters.maxPrice) {
            filtered = filtered.filter(prop => prop.price <= Number(filters.maxPrice));
        }

        // Filtrar por ubicación
        if (filters.location) {
            filtered = filtered.filter(prop => 
                prop.location.toLowerCase().includes(filters.location.toLowerCase())
            );
        }

        setFilteredProperties(filtered);
    };

    // Formatear precio a pesos mexicanos
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Título principal */}
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
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-t-4 border-[#D4AF37]">
                    <h2 className="text-2xl font-bold text-[#252525] mb-6">Filtrar Propiedades</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Filtro por tipo */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Tipo de Propiedad
                            </label>
                            <select
                                name="type"
                                value={filters.type}
                                onChange={handleFilterChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                            >
                                <option value="">Todos</option>
                                <option value="Casa">Casa</option>
                                <option value="Departamento">Departamento</option>
                            </select>
                        </div>

                        {/* Filtro precio mínimo */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Precio Mínimo
                            </label>
                            <input
                                type="number"
                                name="minPrice"
                                value={filters.minPrice}
                                onChange={handleFilterChange}
                                placeholder="$ 0"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                            />
                        </div>

                        {/* Filtro precio máximo */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Precio Máximo
                            </label>
                            <input
                                type="number"
                                name="maxPrice"
                                value={filters.maxPrice}
                                onChange={handleFilterChange}
                                placeholder="$ 10,000,000"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
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
                                value={filters.location}
                                onChange={handleFilterChange}
                                placeholder="Ej. Polanco, CDMX"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Botón filtrar */}
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={applyFilters}
                            className="bg-[#D4AF37] hover:bg-[#B8941F] text-white font-bold py-3 px-8 rounded-md transition-colors duration-300 shadow-md"
                        >
                            Filtrar Propiedades
                        </button>
                    </div>
                </div>

                {/* Resultados */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Mostrando <span className="font-bold text-[#252525]">{filteredProperties.length}</span> {filteredProperties.length === 1 ? 'propiedad' : 'propiedades'}
                    </p>
                </div>

                {/* Cuadrícula de propiedades */}
                {filteredProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProperties.map((property) => (
                            <div
                                key={property.id}
                                className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                            >
                                {/* Imagen */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={property.image}
                                        alt={property.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 right-4 bg-[#D4AF37] text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        {property.type}
                                    </div>
                                </div>

                                {/* Contenido */}
                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-[#252525] mb-2 line-clamp-1">
                                        {property.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                        {property.description}
                                    </p>
                                    <div className="flex items-center text-gray-500 text-sm mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {property.location}
                                    </div>
                                    <div className="border-t border-gray-200 pt-4 mt-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-sm text-gray-500">Precio</p>
                                                <p className="text-2xl font-bold text-[#D4AF37]">
                                                    {formatPrice(property.price)}
                                                </p>
                                            </div>
                                            <button className="bg-[#252525] hover:bg-[#3a3a3a] text-white font-semibold py-2 px-6 rounded-md transition-colors duration-300">
                                                Ver más
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🏠</div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">
                            No se encontraron propiedades
                        </h3>
                        <p className="text-gray-500">
                            Intenta ajustar los filtros para ver más resultados
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}