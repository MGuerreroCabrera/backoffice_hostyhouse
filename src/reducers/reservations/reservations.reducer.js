export const INITIAL_RESERVATIONS_STATE = {
    // Estado para las reservas
    reservations: []
}

// Crear el reducer
export const reservationsReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_RESERVATIONS":
            return { ...state, reservations: action.payload };
        default:
            break;
    }
}