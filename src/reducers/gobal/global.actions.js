// Función para pasar a la siguiente página
export const handleNextPage = () => {
    if(page < totalPages) {
        setPage(page + 1);
    }
};

// Función para pasar a la página anterior
export const handlePreviusPage = () => {
    if(page > 1) {
        setPage(page - 1);
    }
};