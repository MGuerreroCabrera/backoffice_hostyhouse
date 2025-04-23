export const INITIAL_HOUSINGS_STATE = {
    // Propiedad ( estado ) para almacenar las viviendas
    housings: [],
    housingId: null,
    housing: [],
    // Propiedad para controlar si el modal está abierto
    isModalOpen: false,
}

export const housingsReducer = (state, action) => {
    switch (action.type) {
        case "SET_HOUSINGS":
            return { ...state, housings: action.payload };
        case "SET_HOUSING_ID":
            return { ...state, housingId: action.payload };
        case "SET_HOUSING":
            return { housing: action.payload };
        case "OPEN_MODAL":
            return { ...state, isModalOpen: true };
        case "CLOSE_MODAL":
            return { ...state, isModalOpen: false, housings: [] };
        default:
            return { ...state };
    }
}