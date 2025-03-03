import "./Reservations.css";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import Alert from "../Alert/Alert";
import Paginator from "../Paginator/Paginator";
import { fetchReservations } from "../../reducers/reservations/reservations.actions";
import { useReducer } from "react";
import { globalReducer, INITIAL_GLOBAL_STATE } from "../../reducers/gobal/gloabal.reducer";
import { INITIAL_RESERVATIONS_STATE, reservationsReducer } from "../../reducers/reservations/reservations.reducer";

const Reservations = () => {

    // Uso del hook useReducers (globalReducer y reservationsReducer)
    const [globalState, globalDispatch] = useReducer(globalReducer, INITIAL_GLOBAL_STATE);
    const [reservationsState, reservationsDispatch] = useReducer(reservationsReducer, INITIAL_RESERVATIONS_STATE);

    // Desestructurizar propiedades de los reducers
    const { loading, page, totalPages, error } = globalState;
    const { reservations } = reservationsState;

    // useEffect para llamar a la API
    useEffect(() => {
        fetchReservations(globalDispatch, reservationsDispatch, page);
    }, [page]);

    return (
        <>
            {loading && <Loading />}
            {error && <Alert>{ error }</Alert>}
            <div className="data-container">
                <h2>Próximas reservas</h2>
                <div className="reservations-header">
                    <span>Fecha de entrada</span>
                    <span>Fecha de salida</span>
                    <span>Nombre vivienda</span>
                    <span>Número de huéspedes</span>
                    <span>Importe de la reserva</span>
                </div>
                {reservations.map((reservation) => (
                    <div key={reservation._id} className="data-row">
                        <span>{new Date(reservation.checkIn).toLocaleDateString()}</span>
                        <span>{new Date(reservation.checkOut).toLocaleDateString()}</span>
                        <span>{reservation.housingId.name}</span>
                        <span>{reservation.adults + reservation.children}</span>
                        <span>{reservation.amount}€</span>
                    </div> 
                ))}
                <Paginator page={ page } totalPages={ totalPages } globalDispatch={ globalDispatch } />
            </div>            
        </>
    )
}

export default Reservations