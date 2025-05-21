import { fetchFeatures } from "../../reducers/features/features.actions";
import "./Paginator.css";

const Paginator = ({ page, totalPages, globalDispatch }) => {    

    // Función para pasar a la siguiente página
    const handleNextPage = (page, globalDispatch) => {
        if (page < totalPages) {
            globalDispatch({ type: "SUM_PAGE" });   
        }
    };

    // Función para pasar a la página anterior
    const handlePreviousPage = (page, globalDispatch) => {
        if (page > 1) {
            globalDispatch({ type: "SUBSTRACT_PAGE" });
        }
    };

    return (
        <div className="pagination-row">
            <img src="icons/arrow.png" className="arrow prev" alt="anterior" onClick={() => handlePreviousPage(page, globalDispatch)} disabled={page === 1} />
            <span>Página {page} de {totalPages}</span>
            <img src="icons/arrow.png" className="arrow" alt="siguiente" onClick={() => handleNextPage(page, globalDispatch)} disabled={page === totalPages} />
        </div>
    )
}

export default Paginator