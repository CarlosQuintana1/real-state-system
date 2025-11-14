import { useState } from "react";

export function useSuccessModal() {
    const [modalInfo, setModalInfo] = useState({
        isOpen: false,
        title: "",
        message: "",
    });

    const showSuccess = (title, message) => {
        setModalInfo({ isOpen: true, title, message });
    };

    const closeModal = () => {
        setModalInfo({ ...modalInfo, isOpen: false });
    };

    return {
        modalInfo,
        showSuccess,
        closeModal,
    };
}
