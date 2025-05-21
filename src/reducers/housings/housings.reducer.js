export const INITIAL_HOUSINGS_STATE = {
    // Propiedad ( estado ) para almacenar las viviendas
    housings: [],
    housingId: null,
    housing: []
}

export const housingsReducer = (state, action) => {
    switch (action.type) {
        case "SET_HOUSINGS":
            return { ...state, housings: action.payload };
        case "SET_HOUSING_ID":
            return { ...state, housingId: action.payload };
        case "SET_HOUSING":
            return { ...state, housing: action.payload, isModalOpen: true };       
        default:
            return { ...state };
    }
}