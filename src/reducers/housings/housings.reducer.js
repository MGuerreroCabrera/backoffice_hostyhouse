export const INITIAL_HOUSINGS_STATE = {
    // Propiedad ( estado ) para almacenar las viviendas
    housings: [],
    // Propiedad para controlar si el modal está abierto
    isModalOpen: false,
}

export const housingsReducer = (state, action) => {
    switch (action.type) {
        case "SET_HOUSINGS":
            return { ...state, housings: action.payload };
        case "OPEN_MODAL":
            return { ...state, isModalOpen: true };
        case "CLOSE_MODAL":
            return { ...state, isModalOpen: false, housings: [] };
        default:
            return { ...state };
    }
}