import "./Bookings.css";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import Alert from "../Alert/Alert";
import Paginator from "../Paginator/Paginator";
import { fetchBookings, fetchBookingById, updateBooking } from "../../reducers/bookings/bookings.actions";
import { useReducer } from "react";
import { globalReducer, INITIAL_GLOBAL_STATE } from "../../reducers/global/global.reducer";
import { INITIAL_BOOKINGS_STATE, bookingsReducer } from "../../reducers/bookings/bookings.reducer";
import BookingModal from "../BookingModal/BookingModal";

const Bookings = () => {

    // Uso del hook useReducers (globalReducer y bookingsReducer)
    const [globalState, globalDispatch] = useReducer(globalReducer, INITIAL_GLOBAL_STATE);
    const [bookingsState, bookingsDispatch] = useReducer(bookingsReducer, INITIAL_BOOKINGS_STATE);

    // Desestructurizar propiedades de los reducers
    const { loading, page, totalPages, error } = globalState;
    const { bookings, selectedBooking } = bookingsState;

    // useEffect para llamar a la API
    useEffect(() => {
        fetchBookings(globalDispatch, bookingsDispatch, page);
    }, [page]);

    const handleRowClick = (bookingId) => {
        fetchBookingById(globalDispatch, bookingsDispatch, bookingId);
    };

    const closeModal = () => {
        bookingsDispatch({ type: "SET_SELECTED_BOOKING", payload: null });
    };

    const handleEdit = async (updatedBooking) => {
        const isAvailable = true; // Simulación de comprobación de disponibilidad
        if (isAvailable) {
            await updateBooking(globalDispatch, bookingsDispatch, selectedBooking._id, updatedBooking);
            closeModal();
        } else {
            globalDispatch({ type: "SET_ERROR", payload: "La nueva fecha no está disponible." });
        }
    };

    return (
        <>
            {loading && <Loading />}
            {error && <Alert>{ error }</Alert>}
            <div className="data-container">
                <h2>Próximas reservas</h2>
                <div className="bookings-header">
                    <span>Fecha de entrada</span>
                    <span>Fecha de salida</span>
                    <span>Nombre vivienda</span>
                    <span>Número de huéspedes</span>
                    <span>Importe de la reserva</span>
                </div>
                {bookings.map((booking) => (
                    <div key={booking._id} className="data-row" onClick={() => handleRowClick(booking._id)}>
                        <span>{new Date(booking.checkIn).toLocaleDateString()}</span>
                        <span>{new Date(booking.checkOut).toLocaleDateString()}</span>
                        <span>{booking.housingId.name}</span>
                        <span>{booking.adults + booking.children}</span>
                        <span>{booking.amount}€</span>
                    </div> 
                ))}
                <Paginator page={ page } totalPages={ totalPages } globalDispatch={ globalDispatch } />
            </div>
            <BookingModal booking={selectedBooking} onClose={closeModal} onEdit={handleEdit} />
        </>
    )
}

export default Bookings