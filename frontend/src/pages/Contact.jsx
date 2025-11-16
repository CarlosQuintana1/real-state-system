import { useState } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        seller: "",
        message: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError("");
        setSuccess("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setError("Por favor, completa todos los campos antes de enviar.");
            setSuccess("");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("Por favor, ingresa un correo electrónico válido.");
            setSuccess("");
            return;
        }

        setSuccess("¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.");
        setError("");

        setFormData({
            name: "",
            email: "",
            seller: "",
            message: ""
        });
    };

    return (
        <div className="min-h-screen bg-[#f9f6ef]">
            <div className="bg-[#252525] text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
                        Contáctanos
                    </h1>
                    <p className="text-center text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        ¿Tienes dudas o comentarios? Estamos aquí para ayudarte. Completa el formulario
                        y nos pondremos en contacto contigo lo antes posible.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                    <h2 className="text-2xl font-bold text-[#252525] mb-6 text-center">
                        Envíanos un mensaje
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Nombre completo
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Juan Pérez"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="tu@correo.com"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="seller"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Nombre del Vendedor
                            </label>
                            <input
                                type="text"
                                id="seller"
                                name="seller"
                                value={formData.seller}
                                onChange={handleChange}
                                placeholder="Andrea Rivera"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Mensaje
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Escribe tu mensaje aquí..."
                                rows="6"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all resize-none"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm">{error}</span>
                            </div>
                        )}

                        {success && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-start gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm">{success}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-[#beaf87] hover:bg-[#B8941F] text-white font-bold py-4 px-6 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
                        >
                            Enviar Mensaje
                        </button>
                    </form>
                </div>

                <div className="max-w-lg mx-auto mt-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="text-3xl mb-3">📞</div>
                            <h3 className="font-bold text-[#252525] mb-2">Teléfono</h3>
                            <p className="text-gray-600 text-sm">55 1234 5678</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="text-3xl mb-3">📧</div>
                            <h3 className="font-bold text-[#252525] mb-2">Email</h3>
                            <p className="text-gray-600 text-sm">info@century21.com</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="text-3xl mb-3">📍</div>
                            <h3 className="font-bold text-[#252525] mb-2">Oficina</h3>
                            <p className="text-gray-600 text-sm">CDMX, México</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}