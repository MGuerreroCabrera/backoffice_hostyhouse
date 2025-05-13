import "./BookingModal.css";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { deleteBooking, fetchBookingById, updateBooking } from "../../reducers/bookings/bookings.actions";

const BookingModal = ({ booking = {}, closeModal, globalDispatch, bookingDispatch, bookings }) => {

    if (!booking) return null;

    // Inicializar useForm
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        // Llamar a la acción para actualizar la reserva
        updateBooking(globalDispatch, bookingDispatch, booking._id, data, bookings);
    };

    // Llamar a la API para obtener los datos de la reserva
    useEffect(() => {
        if (booking?._id && !booking.dataLoaded) {
            fetchBookingById(globalDispatch, bookingDispatch, booking._id);
        }
    }, [booking._id]);

    // Manejar el evento click de Eliminar reserva
    const handleDelete = (closeModal) => {
        deleteBooking(closeModal, globalDispatch, bookingDispatch, booking._id, bookings);
    }

    return (
        // <div className="modal-booking-overlay" onClick={handleOverlayClick}>
        <div className="modal-booking-overlay" onClick={() => closeModal()}>
            <div className="modal-booking-content">
                <img src="/icons/close.png" alt="Cerrar" title="Cerrar" className="close-icon" onClick={() => closeModal()} />
                <h2>Detalles de la Reserva</h2>
                <div className="data-booking-content">
                    <p>Fecha de entrada:{new Date(booking.checkIn).toLocaleDateString()}</p>
                    <p>Fecha de salida: {new Date(booking.checkOut).toLocaleDateString()}</p>
                    <p>Número de adultos: {booking.adults}</p>
                    <p>Número de niños: {booking.children}</p>
                    <p>Importe: {booking.amount}€</p>
                </div>
                <h2>Modificar Reserva</h2>
                <form name="update-booking" className="update-booking-form" onSubmit={ handleSubmit(onSubmit) }>
                    <div className="data-booking-row">
                        <label htmlFor="checkIn">
                            Nueva Fecha de Entrada
                        </label>
                        <input type="date" { ...register("checkIn") } />
                    </div>
                    <div className="data-booking-row">
                        <label htmlFor="chechOut">
                            Nueva Fecha de Salida
                        </label>
                        <input type="date" { ...register("checkOut") } />
                    </div>
                    <div className="data-booking-row">
                        <label htmlFor="adults">
                            Número de Adultos
                        </label>
                        <input type="number" className="input-booking-form" { ...register("adults", { min:1 }) } />
                    </div>
                    <div className="data-booking-row">
                        <label htmlFor="children">
                            Número de Niños
                        </label>
                        <input type="number" className="input-booking-form" { ...register("children", { min:0 }) } />
                    </div>
                    <div className="data-booking-row">
                        <label htmlFor="amount">
                            Importe
                        </label>
                        <input type="number" className="input-booking-form" { ...register("amount") } />
                    </div>
                    <div className="booking-buttons-container">
                        <div>
                            <button className="btn-1-delete" onClick={ () => handleDelete(closeModal) }>Eliminar Reserva</button>
                        </div>
                        <div>
                            <button type="submit" className="btn-1">Modificar Reserva</button>
                        </div>                        
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;