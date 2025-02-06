import "./Reservations.css";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import Alert from "../Alert/Alert";
import { API } from "../../utils/API/API";
import Paginator from "../Paginator/Paginator";

const Reservations = () => {
    // Estado para almacenar las reservas
    const [reservations, setReservations] = useState([]);

    // Estado para el loading
    const [loading, setLoading] = useState(true);

    // Estado para controlar las páginas de resultados
    const [page, setPage] = useState(1);

    // Estado para controlar el total de páginas
    const [totalPages, setTotalPages] = useState(1);

    // Estado para controlar si ha habido error en la consulta
    const [error, setError] = useState(null);
    
    // Límite de registros por página
    const limit = 10;    

    // useEffect para llamar a la API
    useEffect(() => {
        const fetchReservations  = async () => {
            try {
                const { error, response } = await API({ endpoint: `/reservations?page=${page}&limit=${limit}` });
                if(error) {
                    setLoading(false);
                    setError("Ha ocurrido un error en la petición");
                }
                const data = response.records;
                setReservations(data);
                setLoading(false);
                setTotalPages(Math.ceil(response.totalRecords / limit));
            } catch (err) {
                setLoading(false);
                setError(err.message);
            }
        }

        fetchReservations();
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
                <Paginator page={ page } totalPages={ totalPages } setPage={ setPage } />
            </div>            
        </>
    )
}

export default Reservations