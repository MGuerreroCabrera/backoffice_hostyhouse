import { useState } from "react";

const useModal  = () => {
    
    // Estados de apertura y cierre del modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Poner el modal true para abrirlo
    const openModal = () => setIsModalOpen(true);
    // Poner el modal a false para cerrarlo
    const closeModal = () => setIsModalOpen(false);

    // Devolver las funciones y el estado
    return {
        isModalOpen,
        openModal,
        closeModal
    }

};

export default useModal;