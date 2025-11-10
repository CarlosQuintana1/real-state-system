import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    
    // Estados para el formulario de búsqueda (solo 2 campos)
    const [location, setLocation] = useState("");
    const [type, setType] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Estados para el modal de contacto
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });
    const [modalError, setModalError] = useState("");
    const [modalSuccess, setModalSuccess] = useState(false);

    // Verificar si ambos campos están vacíos
    const allFieldsEmpty = !location && !type;

    // Función para manejar la búsqueda
    const handleSearch = (e) => {
        e.preventDefault();

        // No hacer nada si está cargando o ambos campos vacíos
        if (isLoading || allFieldsEmpty) return;

        // Iniciar estado de carga
        setIsLoading(true);

        // Simular búsqueda breve antes de redirigir
        setTimeout(() => {
            // Redirigir a /properties con query params
            navigate(`/properties?type=${encodeURIComponent(type)}&location=${encodeURIComponent(location)}`);
        }, 500);
    };

    // Funciones para el modal
    const openModal = () => {
        setIsModalOpen(true);
        setModalError("");
        setModalSuccess(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setContactForm({ name: "", email: "", phone: "", message: "" });
        setModalError("");
        setModalSuccess(false);
    };

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setContactForm(prev => ({
            ...prev,
            [name]: value
        }));
        setModalError("");
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();

        // Validar campos
        if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.phone.trim() || !contactForm.message.trim()) {
            setModalError("Por favor, completa todos los campos.");
            return;
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(contactForm.email)) {
            setModalError("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        // Simular envío exitoso
        setModalSuccess(true);
        setModalError("");
        
        // Cerrar modal después de 2 segundos
        setTimeout(() => {
            closeModal();
        }, 2000);
    };

    // Prevenir scroll cuando el modal está abierto
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    // Cleanup al desmontar (seguridad)
    useEffect(() => {
        return () => {
            setIsLoading(false);
        };
    }, []);

    return (
        <>
            {/* Sección Hero - Bienvenida y Buscador (Mismo color que el Header) */}
            <section className="bg-[#252525] text-white py-16 md:py-20 flex flex-col items-center justify-center">
                <div className="container mx-auto px-8">
                    {/* Título de Bienvenida */}
                    <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-10 text-white tracking-wide">
                        ¡Bienvenido!
                    </h1>

                    {/* Card del Buscador */}
                    <div className="bg-[#fdfdfd] text-gray-900 rounded-xl shadow-xl p-6 max-w-3xl mx-auto flex flex-col items-center gap-4">
                        {/* Título del buscador */}
                        <h2 className="text-2xl font-bold text-[#38383a] text-center">
                            Encuentra tu propiedad ideal
                        </h2>

                        {/* Formulario de búsqueda */}
                        <form onSubmit={handleSearch} className="w-full">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Input - Ubicación */}
                                <div>
                                    <label htmlFor="location" className="sr-only">
                                        Ubicación o ciudad
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="Ubicación o ciudad"
                                        aria-label="Ubicación o ciudad"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#beaf87] focus:outline-none transition-all"
                                    />
                                </div>

                                {/* Select - Tipo de propiedad */}
                                <div>
                                    <label htmlFor="type" className="sr-only">
                                        Tipo de propiedad
                                    </label>
                                    <select
                                        id="type"
                                        name="type"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        aria-label="Tipo de propiedad"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#beaf87] focus:outline-none transition-all"
                                    >
                                        {/* Placeholder no seleccionable */}
                                        <option value="" disabled hidden>
                                            Tipo de propiedad
                                        </option>
                                        <option value="Casa">Casa</option>
                                        <option value="Departamento">Departamento</option>
                                        <option value="Terreno">Terreno</option>
                                        <option value="Oficina">Oficina</option>
                                    </select>
                                </div>

                                {/* Botón Buscar */}
                                <div>
                                    <button
                                        type="submit"
                                        disabled={isLoading || allFieldsEmpty}
                                        aria-label="Buscar propiedades"
                                        className="w-full bg-[#beaf87] text-white font-semibold rounded-md px-4 py-2 disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 transition-all duration-300 shadow-md"
                                    >
                                        {isLoading ? "Buscando..." : "Buscar"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Sección Crema - Información Institucional */}
            <section className="bg-[#fdf8ec] py-12 px-8">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    {/* Título principal */}
                    <h2 className="font-bold text-2xl md:text-3xl text-[#38383a] leading-tight">
                        CENTURY 21®: Tu Agencia de Bienes Raíces de Confianza en México
                    </h2>
                    
                    {/* Subtítulo */}
                    <p className="font-semibold text-lg md:text-xl text-[#beaf87]">
                        Otorgando el 121%
                    </p>
                    
                    {/* Párrafo descriptivo */}
                    <p className="font-light text-lg md:text-xl text-gray-700 leading-relaxed pt-4 px-4 md:px-8">
                        Solo la marca CENTURY 21® tiene la escala y la reputación para liderar la
                        industria de bienes raíces hacia el futuro. Mientras que otros se enfocan
                        simplemente en facilitar una transacción, los asesores de CENTURY 21® creen
                        en el valor de brindar experiencias extraordinarias desafiando la mediocridad
                        y siempre otorgando el 121%.
                    </p>
                </div>
            </section>

            {/* Sección BLANCA - Mapa y Red Global */}
            <section className="bg-white py-12 px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Contenedor del mapa con fondo oscuro */}
                    <div className="bg-[#38383a] rounded-lg shadow-lg overflow-hidden">
                        {/* Título sobre el mapa */}
                        <div className="text-white text-center py-8 px-6">
                            <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                                SOMOS UNA RED GLOBAL
                                <br />
                                DE ESPECIALISTAS LOCALES.
                            </h3>
                        </div>
                        
                        {/* Imagen del mapa */}
                        <div className="bg-white p-8 flex justify-center">
                            <img 
                                src="https://century21mexico.com/img/c21mx/index/mapac21.png" 
                                alt="Mapa de Century 21 México" 
                                className="w-full max-w-lg h-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección Crema - Encuentra un Asesor */}
            <section className="bg-[#fff9e6] py-12 px-8">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    {/* Título */}
                    <h2 className="font-bold text-3xl md:text-4xl text-[#38383a]">
                        Encuentra un Asesor
                    </h2>
                    
                    {/* Párrafo de invitación */}
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed px-4">
                        Nuestros expertos están listos para ayudarte a encontrar la propiedad ideal 
                        o vender tu inmueble al mejor precio. Contamos con profesionales capacitados 
                        en toda la República Mexicana.
                    </p>
                    
                    {/* Botón de acción */}
                    <div className="pt-4">
                        <button 
                            onClick={openModal}
                            className="bg-[#beaf87] text-white font-semibold text-lg px-10 py-4 rounded-md shadow-md hover:opacity-90 transition-opacity duration-300"
                        >
                            Contactar Asesor
                        </button>
                    </div>
                </div>
            </section>

            {/* Modal de Contacto - Versión Mejorada con Blur y Animaciones */}
            {isModalOpen && (
                <div
                    onClick={(e) => {
                        if (e.target === e.currentTarget) closeModal();
                    }}
                    className="fixed inset-0 bg-[#252525]/40 backdrop-blur-md flex justify-center items-center z-50 animate-fadeIn p-4"
                >
                    <div className="relative bg-white/95 rounded-2xl shadow-2xl w-full max-w-2xl border border-[#beaf87]/60 overflow-hidden animate-modalIn">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[#1b1b1b] to-[#2b2b2b] text-white px-6 py-5 flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-extrabold mb-1">Contactar Asesor</h2>
                                <p className="text-sm text-gray-300">Estamos aquí para ayudarte con tu próxima inversión</p>
                            </div>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-white text-3xl leading-none transition-colors hover:rotate-90 transform duration-200"
                                aria-label="Cerrar modal"
                            >
                                ×
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-8 text-gray-800 overflow-y-auto max-h-[75vh]">
                            {!modalSuccess ? (
                                <>
                                    {/* Info Box */}
                                    <div className="bg-[#fdf8ef] border-l-4 border-[#beaf87] p-4 mb-6 rounded-r-lg text-sm text-gray-700 flex items-start gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#beaf87] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p>
                                            <strong>💡 Completa el formulario</strong> y uno de nuestros <b className="text-[#252525]">asesores expertos</b> se pondrá en contacto contigo en menos de 24 horas.
                                        </p>
                                    </div>

                                    <form onSubmit={handleContactSubmit} className="space-y-5">
                                        {/* Grid para Nombre y Email */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label htmlFor="modal-name" className="block text-sm font-bold text-gray-700 mb-2">
                                                    Nombre completo <span className="text-[#beaf87]">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="modal-name"
                                                    name="name"
                                                    value={contactForm.name}
                                                    onChange={handleContactChange}
                                                    placeholder="Ej. Juan Pérez"
                                                    required
                                                    className="border-2 border-gray-200 rounded-lg p-3 w-full focus:ring-2 focus:ring-[#beaf87] focus:border-transparent outline-none transition-all bg-white"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="modal-email" className="block text-sm font-bold text-gray-700 mb-2">
                                                    Correo electrónico <span className="text-[#beaf87]">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    id="modal-email"
                                                    name="email"
                                                    value={contactForm.email}
                                                    onChange={handleContactChange}
                                                    placeholder="tu@correo.com"
                                                    required
                                                    className="border-2 border-gray-200 rounded-lg p-3 w-full focus:ring-2 focus:ring-[#beaf87] focus:border-transparent outline-none transition-all bg-white"
                                                />
                                            </div>
                                        </div>

                                        {/* Teléfono */}
                                        <div>
                                            <label htmlFor="modal-phone" className="block text-sm font-bold text-gray-700 mb-2">
                                                Teléfono <span className="text-[#beaf87]">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                id="modal-phone"
                                                name="phone"
                                                value={contactForm.phone}
                                                onChange={handleContactChange}
                                                placeholder="55 1234 5678"
                                                required
                                                className="border-2 border-gray-200 rounded-lg p-3 w-full focus:ring-2 focus:ring-[#beaf87] focus:border-transparent outline-none transition-all bg-white"
                                            />
                                        </div>

                                        {/* Mensaje */}
                                        <div>
                                            <label htmlFor="modal-message" className="block text-sm font-bold text-gray-700 mb-2">
                                                Mensaje <span className="text-[#beaf87]">*</span>
                                            </label>
                                            <textarea
                                                id="modal-message"
                                                name="message"
                                                value={contactForm.message}
                                                onChange={handleContactChange}
                                                placeholder="Cuéntanos cómo podemos ayudarte..."
                                                rows="4"
                                                required
                                                className="border-2 border-gray-200 rounded-lg p-3 w-full focus:ring-2 focus:ring-[#beaf87] focus:border-transparent outline-none transition-all resize-none bg-white"
                                            ></textarea>
                                        </div>

                                        {/* Mensaje de Error */}
                                        {modalError && (
                                            <div className="bg-red-50 border-2 border-red-300 text-red-800 px-4 py-3 rounded-lg flex items-start gap-3 shadow-sm animate-fadeIn">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-sm font-medium">{modalError}</span>
                                            </div>
                                        )}

                                        {/* Botones */}
                                        <div className="flex justify-end gap-4 pt-6 border-t-2 border-gray-100">
                                            <button
                                                type="button"
                                                onClick={closeModal}
                                                className="px-6 py-3 rounded-lg border-2 border-gray-300 hover:bg-gray-100 transition-all font-semibold text-gray-700"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-8 py-3 bg-gradient-to-r from-[#beaf87] to-[#a89668] hover:from-[#a89668] hover:to-[#beaf87] text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                            >
                                                Enviar Solicitud
                                            </button>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                // Mensaje de éxito con animación
                                <div className="text-center py-12 animate-fadeIn">
                                    <div className="mb-6 relative">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-24 h-24 bg-green-100 rounded-full animate-ping opacity-25"></div>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-500 mx-auto relative animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-3xl font-extrabold text-gray-800 mb-3">
                                        ¡Mensaje enviado exitosamente!
                                    </h4>
                                    <p className="text-gray-600 text-lg mb-2">
                                        Nos pondremos en contacto contigo pronto.
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Revisaremos tu solicitud en las próximas 24 horas.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}