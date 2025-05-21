import { getHousingById } from "../reducers/housings/housings.actions";

export const fetchHousing = async (housingId, globalDispatch, housingsDispatch) => {
    globalDispatch({ type: "LOADING" });
    try {        
        await getHousingById(housingId, globalDispatch, housingsDispatch);        
     
    } catch (error) {
        globalDispatch({ type: "SET_ERROR", payload: error.message });
        globalDispatch({ type: "SHOW_ALERT" });
    }
    globalDispatch({ type: "STOP_LOADING" });
};