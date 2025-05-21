import { API } from "../../utils/API/API";
import { checkBookingDate } from "../../utils/checkBookingDate";


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

// Función que obtiene los datos de un registro por su id
export const fetchBookingById = async (globalDispatch, bookingDispatch, bookingId) => {

    globalDispatch({ type: "LOADING" });
    try {
        // Sacar el objeto error y response de la respuesta de la llamada a la API
        const { error, response } = await API ({ endpoint: `/bookings/${bookingId}` });

        if(error) {
            globalDispatch({ type: "STOP_LOADING" });
            globalDispatch({ type: "SET_ERROR", payload: "Error al obtener los datos de la reserva" });
            globalDispatch({ type: "SHOW_ALERT" });
            return;
        }      
        globalDispatch({ type: "STOP_LOADING" });
        bookingDispatch({ type: "SET_SELECTED_BOOKING", payload: response.data });
    } catch (error) {
        globalDispatch({ type: "STOP_LOADING" });
        globalDispatch({ type: "SET_ERROR", payload: error.message });
        globalDispatch({ type: "SHOW_ALERT" });
    }
}

// Nueva función para actualizar una reserva
export const updateBooking = async (globalDispatch, bookingsDispatch, bookingId, data, bookings) => {

    // Validar las fechas antes de proceder
    const { checkIn, checkOut } = data;

    // Encontrar la reserva correspondiente
    const booking = bookings.find(booking => booking._id === bookingId);

    // Obtener el housingId
    const housingId = booking ? booking.housingId._id : null;

    const validation = await checkBookingDate(checkIn, checkOut, housingId);

    if(!validation.isValid) {
        globalDispatch({ type: "SET_ERROR", payload: validation.message });
        globalDispatch({ type: "SHOW_ALERT" });
        return;
    }

    // Validar la disponibilidad para esas fechas en esa vivienda

    globalDispatch({ type: "LOADING" });
    try {
        const { error, response } = await API({
            method: "PUT",
            endpoint: `/bookings/${bookingId}`,
            body: data,
            content_type: true
        });

        if (error) {
            globalDispatch({ type: "SET_ERROR", payload: "Error al actualizar la reserva" });
            globalDispatch({ type: "STOP_LOADING" });
            globalDispatch({ type: "SHOW_ALERT" });
            return;
        }
        globalDispatch({ type: "STOP_LOADING" });
        globalDispatch({ type: "OP_OK" });
        globalDispatch({ type: "SHOW_ALERT" });        
        bookingsDispatch({ type: "SET_SELECTED_BOOKING", payload: null });
        if(bookingId) {
            const updatedBookings = bookings.map(booking => booking._id === bookingId ? { ...booking, ...data } : booking);
            bookingsDispatch({ type: "FETCH_BOOKINGS", payload: updatedBookings });
        } else if (bookings.length < 10) {
            const newBooking = { _id: response.data._id, checkIn: response.data.checkIn, checkOut: response.data.checkOut, adults: response.data.adults, children: response.data.children, amount: response.data.amount, housingId: response.data.housingId, customerId: response.data.customerId, customerWishes: response.data.custormerWishes };
            const updatedBookings = [ ...bookings, newBooking ];
            bookingsDispatch({ type: "FETCH_BOOKINGS", payload: updatedBookings });
        }
    } catch (error) {
        globalDispatch({ type: "STOP_LOADING" });
        globalDispatch({ type: "SET_ERROR", payload: error.message });
        globalDispatch({ type: "SHOW_ALERT" });
    }
}

// Función que elimina una reserva
export const deleteBooking = async (closeModal, globalDispatch, bookingDispatch, bookingId, bookings) => {
    globalDispatch({ type: "LOADING" });

    try {
        const { error } = await API({ endpoint: `/bookings/${bookingId}`, method: "DELETE", content_type: true });

        if (error) {
            globalDispatch({ type: "STOP_LOADING" });
            globalDispatch({ type: "SHOW_ALERT" });
            globalDispatch({ type: "SET_ERROR", payload: "Error al eliminar el regisgtro" });
            return;
        }

        globalDispatch({ type: "STOP_LOADING" });
        globalDispatch({ type: "OP_OK" });
        globalDispatch({ type: "SHOW_ALERT" });

        // Actualizar el array de registros
        const updatedBookings = bookings.filter(booking => booking._id !== bookingId);
        bookingDispatch({ type: "FETCH_BOOKINGS", payload: updatedBookings });

        // Cerrar el modal
        closeModal();

    } catch (error) {
        globalDispatch({ type: "STOP_LOADING" });
        globalDispatch({ type: "SET_ERROR", payload: error.message });
        globalDispatch({ type: "SHOW_ALERT" });
    }
}