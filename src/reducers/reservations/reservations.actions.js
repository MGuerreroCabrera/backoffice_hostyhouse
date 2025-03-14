import { API } from "../../utils/API/API";


// Función que trae todas las reservas realizadas
//export const fetchReservations  = async (setLoading, setError, setReservations, setTotalPages, page) => {
export const fetchReservations  = async (globalDispatch, reservationsDispatch, page) => {
    try {
        const limit = 10;

        const { error, response } = await API({ endpoint: `/reservations?page=${page}&limit=${limit}` });
        if(error) {
            globalDispatch({ type: "STOP_LOADING" });
            globalDispatch({ type: "SET_ERROR", payload: "Ha ocurrido un error en la petición" });
        }
        reservationsDispatch({ type: "FETCH_RESERVATIONS", payload: response.records });
        globalDispatch({ type: "STOP_LOADING" });
        const totalPages = Math.ceil(response.totalRecords / limit);
        globalDispatch({ type: "SET_TOTAL_PAGES", payload: totalPages });
    } catch (error) {
        globalDispatch({ type: "STOP_LOADING" });
        globalDispatch({ type: "SET_ERROR", payload: error.message });
    }
}