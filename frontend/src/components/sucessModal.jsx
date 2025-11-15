import { useEffect } from "react";

export default function SuccessModal({ title, message, isOpen, onClose }) {
    if (!isOpen) return null;

    useEffect(() => {
        const timer = setTimeout(onClose, 2500);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center animate-fadeIn">
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
                <p className="text-gray-600 mb-4">{message}</p>

                <button
                    onClick={onClose}
                    className="bg-[#beaf87] text-white px-4 py-2 rounded-md "
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}
