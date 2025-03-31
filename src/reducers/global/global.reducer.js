export const INITIAL_GLOBAL_STATE = {
     // Propiedad para controlar el estado de loading
     loading: false,
     // Propiedad para controlar el número de página
     page: 1,
     // Propiedad para controlar el total de las páginas
     totalPages: 1,
     // Propiedad para controlar posibles errores y pasarlos a Alert
     error: null,
     // Propiedad para controlar el resultado de la operación
     opOk: false,
     // Propiedad para controlar la visualización del Alert
     showAlert: false
}

export const globalReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { ...state, loading: true };
        case "STOP_LOADING":
            return { ...state, loading: false };
        case "SET_ERROR":
            return { ...state, error: action.payload };
        case "DELETE_ERROR":
            return { ...state, error: null };
        case "OP_OK":
            return { ...state, opOk: true };
        case "SHOW_ALERT":
            return { ...state, showAlert: true };
        case "CLOSE_ALERT":
            return { ...state, showAlert: false, error: null };
        case "SUM_PAGE":
            return { ...state, page: state.page + 1 };
        case "SUBSTRACT_PAGE":
            return { ...state, page: state.page - 1 };
        case "SET_TOTAL_PAGES":
            return { ...state, totalPages: action.payload };
        case "RESET_STATES":
            return { ...state, opOk: false, showAlert: false }
        default:
            return { ...state };
    }
}