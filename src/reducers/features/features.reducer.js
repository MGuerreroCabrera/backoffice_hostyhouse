export const INITIAL_FEATURES_STATE = {
    // Propiedad (estado) para almacenar las características de las viviendas
    features: [],
    // Propiedad para controlar si el modal está abierto
    isModalOpen: false,
    // Propiedad para controlar el nombre del archivo ( icono ) que se sube
    iconName: ""
}

export const featuresReducer = (state, action) => {
    switch (action.type) {
        case "HANDLE_FILE_CHANGE":
            return { ...state, iconName: action.payload };
        case "OPEN_MODAL":
            return { ...state, isModalOpen: true };
        case "CLOSE_MODAL":
            return { ...state, isModalOpen: false, iconName: "" };
        case "SET_FEATURES":
            return { ...state, features: action.payload };
        default:
            return { ...state };
    }
}