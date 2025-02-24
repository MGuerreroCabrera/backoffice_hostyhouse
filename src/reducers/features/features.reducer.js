export const INITIAL_FEATURES_STATE = {
    // Propiedad (estado) para almacenar las características de las viviendas
    features: [],
    // Propiedad para controlar el estado de loading
    loaging: false,
    // Propiedad para controlar el número de página
    page: 1,
    // Propiedad para controlar el total de las páginas
    totalPages: 1,
    // Propiedad para controlar posibles errores y pasarlos a Alert
    error: null,
    // Propiedad para controlar el resultado de la operación
    opOk: false,
    // Propiedad para controlar la visualización del Alert
    showAlert: false,
    // Propiedad para controlar si el modal está abierto
    isModalOpen: false,
    // Propiedad para controlar el nombre del archivo (icono) que se sube
    iconName: null
}

export const featuresReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { ...state, loading: true };
        case "ERROR":
            return { ...state, error: action.payload };
        case "HANDLE_FILE_CHANGE":
            return { ...state, iconName: action.payload }
        case "OPEN_MODAL":
            return { ...state, isModalOpen: true }
        default:
            break;
    }
}