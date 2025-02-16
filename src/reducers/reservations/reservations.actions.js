import { API } from "../../utils/API/API";


// Función que trae todas las reservas realizadas
export const fetchReservations  = async (setLoading, setError, setReservations, setTotalPages, page) => {
    try {
        const limit = 10;

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