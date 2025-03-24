export const INITIAL_BOOKINGS_STATE = {
    // Estado para las reservas
    bookings: [],
    selectedBooking: null
}

// Crear el reducer
export const bookingsReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_BOOKINGS":
            return { ...state, bookings: action.payload };
        case "SET_SELECTED_BOOKING":
            return { ...state, selectedBooking: action.payload }
        default:
            return { ...state };
    }
}