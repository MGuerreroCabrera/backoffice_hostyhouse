import { API } from "../../utils/API/API";


// Función que trae todas las reservas realizadas
export const fetchBookings  = async (globalDispatch, bookingsDispatch, page) => {
    try {
        const limit = 10;

        const { error, response } = await API({ endpoint: `/bookings?page=${page}&limit=${limit}` });

        console.log("Response: ", response);

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