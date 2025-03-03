import { API } from "../../utils/API/API";


// Función que trae todas las reservas realizadas
//export const fetchReservations  = async (setLoading, setError, setReservations, setTotalPages, page) => {
export const fetchReservations  = async (globalDispatch, reservationsDispatch, page) => {
    try {
        const limit = 10;

        const { error, response } = await API({ endpoint: `/reservations?page=${page}&limit=${limit}` });
        if(error) {
            //setLoading(false);
            globalDispatch({ type: "STOP_LOADING" });
            //setError("Ha ocurrido un error en la petición");
            globalDispatch({ type: "SET_ERROR", payload: "Ha ocurrido un error en la petición" });
        }

        //const data = response.records;
        //setReservations(data);
        reservationsDispatch({ type: "FETCH_RESERVATIONS", payload: response.records });
        //setLoading(false);
        globalDispatch({ type: "STOP_LOADING" });
        //setTotalPages(Math.ceil(response.totalRecords / limit));
        const totalPages = Math.ceil(response.totalRecords / limit);
        globalDispatch({ type: "SET_TOTAL_PAGES", payload: totalPages });
    } catch (err) {
        // setLoading(false);
        // setError(err.message);
        globalDispatch({ type: "STOP_LOADING" });
        globalDispatch({ type: "SET_ERROR", payload: err.message });
    }
}