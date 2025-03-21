import { API } from "../../utils/API/API";


// Función que trae todas las reservas realizadas
export const fetchBookings  = async (globalDispatch, bookingsDispatch, page) => {
    try {
        const limit = 10;

        const { error, response } = await API({ endpoint: `/bookings?page=${page}&limit=${limit}` });

        if(error) {
            globalDispatch({ type: "STOP_LOADING" });
            globalDispatch({ type: "SET_ERROR", payload: "Ha ocurrido un error en la petición" });
        }
        bookingsDispatch({ type: "FETCH_BOOKINGS", payload: response.records });
        globalDispatch({ type: "STOP_LOADING" });
        const totalPages = Math.ceil(response.totalRecords / limit);
        globalDispatch({ type: "SET_TOTAL_PAGES", payload: totalPages });
    } catch (error) {
        globalDispatch({ type: "STOP_LOADING" });
        globalDispatch({ type: "SET_ERROR", payload: error.message });
    }
}

// Nueva función para obtener una reserva por ID
export const fetchBookingById = async (globalDispatch, bookingsDispatch, bookingId) => {
    try {
        const { error, response } = await API({ endpoint: `/bookings/${bookingId}` });

        if (error) {
            globalDispatch({ type: "SET_ERROR", payload: "Error al obtener la reserva" });
            return;
        }
        bookingsDispatch({ type: "SET_SELECTED_BOOKING", payload: response });
    } catch (error) {
        globalDispatch({ type: "SET_ERROR", payload: error.message });
    }
}

// Nueva función para actualizar una reserva
export const updateBooking = async (globalDispatch, bookingsDispatch, bookingId, updatedBooking) => {
    try {
        const { error, response } = await API({
            method: 'PUT',
            endpoint: `/bookings/${bookingId}`,
            body: updatedBooking,
        });

        if (error) {
            globalDispatch({ type: "SET_ERROR", payload: "Error al actualizar la reserva" });
            return;
        }
        bookingsDispatch({ type: "SET_SELECTED_BOOKING", payload: response });
    } catch (error) {
        globalDispatch({ type: "SET_ERROR", payload: error.message });
    }
}

export const putBooking = async (globalDispatch, bookingDispatch) => {
    
}