export default function Services() {
    // Servicios mockeados
    const services = [
        {
            id: 1,
            icon: "🏠",
            title: "Compra",
            description: "Te ayudamos a encontrar la propiedad de tus sueños. Contamos con un amplio portafolio de casas y departamentos en las mejores zonas."
        },
        {
            id: 2,
            icon: "💼",
            title: "Venta",
            description: "Vendemos tu propiedad al mejor precio del mercado. Estrategias de marketing personalizadas y red de compradores calificados."
        },
        {
            id: 3,
            icon: "🔑",
            title: "Renta",
            description: "Facilita el proceso de arrendamiento de tu inmueble. Selección rigurosa de inquilinos y gestión completa del contrato."
        },
        {
            id: 4,
            icon: "📈",
            title: "Asesoría",
            description: "Consultoría especializada en inversión inmobiliaria. Análisis de mercado, valoración de propiedades y estrategias financieras."
        },
        {
            id: 5,
            icon: "🏗️",
            title: "Desarrollos",
            description: "Proyectos inmobiliarios en preventa con las mejores opciones de financiamiento. Inversión segura con alto retorno."
        },
        {
            id: 6,
            icon: "⚖️",
            title: "Legal",
            description: "Asesoría jurídica integral en transacciones inmobiliarias. Revisión de documentos, contratos y trámites notariales."
        }
    ];

    return (
        <div className="min-h-screen bg-[#f9f6ef]">
            {/* Hero Section */}
            <div className="bg-[#252525] text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
                        Nuestros Servicios
                    </h1>
                    <p className="text-center text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        En Century 21 ofrecemos soluciones integrales para todas tus necesidades inmobiliarias. 
                        Con más de 50 años de experiencia en el mercado, somos tu mejor aliado para comprar, vender o rentar.
                    </p>
                </div>
            </div>

            {/* Servicios Grid */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="bg-white rounded-xl p-8 shadow-md border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                        >
                            {/* Icono */}
                            <div className="flex justify-center mb-6">
                                <div className="w-20 h-20 bg-[#D4AF37] bg-opacity-10 rounded-full flex items-center justify-center text-5xl">
                                    {service.icon}
                                </div>
                            </div>

                            {/* Contenido */}
                            <h3 className="text-2xl font-bold text-[#D4AF37] text-center mb-4">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 text-center leading-relaxed">
                                {service.description}
                            </p>

                            {/* Botón de acción */}
                            <div className="mt-6 flex justify-center">
                                <button className="text-[#252525] font-semibold hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-2">
                                    Más información
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sección CTA */}
            <div className="bg-[#252525] text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        ¿Listo para comenzar?
                    </h2>
                    <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                        Contáctanos hoy y descubre cómo podemos ayudarte a alcanzar tus objetivos inmobiliarios.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-[#D4AF37] hover:bg-[#B8941F] text-white font-bold py-4 px-8 rounded-lg transition-colors duration-300 shadow-lg">
                            Solicitar Asesoría
                        </button>
                        <button className="bg-transparent border-2 border-white hover:bg-white hover:text-[#252525] text-white font-bold py-4 px-8 rounded-lg transition-all duration-all duration-300">
                            Ver Propiedades
                        </button>
                    </div>
                </div>
            </div>

            {/* Sección de Valores */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#252525] mb-4">
                        ¿Por qué elegirnos?
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Somos líderes en el mercado inmobiliario con un compromiso firme hacia la excelencia.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Valor 1 */}
                    <div className="text-center p-6">
                        <div className="text-5xl mb-4">🏆</div>
                        <h3 className="text-xl font-bold text-[#252525] mb-3">Experiencia</h3>
                        <p className="text-gray-600">
                            Más de 50 años siendo líderes en el sector inmobiliario mundial.
                        </p>
                    </div>

                    {/* Valor 2 */}
                    <div className="text-center p-6">
                        <div className="text-5xl mb-4">🤝</div>
                        <h3 className="text-xl font-bold text-[#252525] mb-3">Confianza</h3>
                        <p className="text-gray-600">
                            Miles de clientes satisfechos que han logrado sus metas con nosotros.
                        </p>
                    </div>

                    {/* Valor 3 */}
                    <div className="text-center p-6">
                        <div className="text-5xl mb-4">🌟</div>
                        <h3 className="text-xl font-bold text-[#252525] mb-3">Calidad</h3>
                        <p className="text-gray-600">
                            Atención personalizada y profesional en cada etapa del proceso.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}