export const INITIAL_BOOKINGS_STATE = {
    // Estado para las reservas
    bookings: []
}

// Crear el reducer
export const bookingsReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_BOOKINGS":
            return { ...state, bookings: action.payload };
        default:
            return { ...state };
    }
}