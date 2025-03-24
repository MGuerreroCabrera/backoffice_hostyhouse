import { API } from "./API/API";

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