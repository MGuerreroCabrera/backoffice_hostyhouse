import "./Paginator.css";

const Paginator = ({ page, totalPages, setPage }) => {

    // Función para pasar a la siguiente página
    const handleNextPage = () => {
        if(page < totalPages) {
            setPage(page + 1);
        }
    };

    // Función para pasar a la página anterior
    const handlePreviusPage = () => {
        if(page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div className="pagination-row">
            <img src="icons/arrow.png" className="arrow prev" alt="anterior" onClick={handlePreviusPage} disabled={ page === 1 } />
            <span>Página { page } de { totalPages }</span>
            <img src="icons/arrow.png" className="arrow" alt="siguiente" onClick={handleNextPage} disabled={ page === totalPages } />
        </div>
    )
}

export default Paginator