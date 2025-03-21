import "./BookingModal.css";
import { useState } from "react";

const BookingModal = ({ booking, onClose, onEdit }) => {
    const [checkIn, setCheckIn] = useState(booking?.checkIn);
    const [checkOut, setCheckOut] = useState(booking?.checkOut);
    const [adults, setAdults] = useState(booking?.adults);
    const [children, setChildren] = useState(booking?.children);
    const [amount, setAmount] = useState(booking?.amount);

    if (!booking) return null;

    const handleEdit = () => {
        const updatedBooking = {
            checkIn,
            checkOut,
            adults,
            children,
            amount,
        };
        onEdit(updatedBooking);
    };

    const handleOverlayClick = (e) => {
        if (e.target.className === 'modal-overlay') {
            onClose();
        }
    };

    return (
        <div className="modal-booking-overlay" onClick={handleOverlayClick}>
            <div className="modal-booking-content">
                <img src="/icons/close.png" alt="Cerrar" title="Cerrar" className="close-icon" onClick={onClose} />
                <h2>Detalles de la Reserva</h2>
                <div className="data-booking-content">
                    <p>Fecha de entrada:{new Date(booking.checkIn).toLocaleDateString()}</p>
                    <p>Fecha de salida: {new Date(booking.checkOut).toLocaleDateString()}</p>
                    <p>Número de adultos: {booking.adults}</p>
                    <p>Número de niños: {booking.children}</p>
                    <p>Importe: {booking.amount}€</p>
                </div>
                <h2>Modificar Reserva</h2>
                <form name="update-booking" className="update-booking-form">
                    <div className="data-booking-row">
                        <label htmlFor="checkIn">
                            Nueva Fecha de Entrada
                        </label>
                        <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                    </div>
                    <div className="data-booking-row">
                        <label htmlFor="chechOut">
                            Nueva Fecha de Salida
                        </label>
                        <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                    </div>
                    <div className="data-booking-row">
                        <label htmlFor="adults">
                            Número de Adultos
                        </label>
                        <input type="number" className="input-booking-form" value={adults} onChange={(e) => setAdults(e.target.value)} min="1" />
                    </div>
                    <div className="data-booking-row">
                        <label htmlFor="children">
                            Número de Niños
                        </label>
                        <input type="number" className="input-booking-form" value={children} onChange={(e) => setChildren(e.target.value)} min="0" />
                    </div>
                    <div className="data-booking-row">
                        <label htmlFor="amount">
                            Importe
                        </label>
                        <input type="number" className="input-booking-form" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    <button className="btn-1" onClick={handleEdit}>Modificar Reserva</button>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;