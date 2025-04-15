import { API } from "../../utils/API/API";

// Función que abre el modal
export const openModal = (housingsDispatch) => { housingsDispatch({ type: "OPEN_MODAL" }); }

// Función que cierra el modal
export const closeModal = (housingsDispatch) => { housingsDispatch({ type: "CLOSE_MODAL" }); }

// Función que crea una vivienda nueva
export const createHousing = async (housingData, housingsDispatch, globalDispatch) => {
        globalDispatch({ type: "LOADING" });

        const { error, response } = await API({ 
            endpoint: "/housings",  
            method: "POST",
            body: housingData,
            content_type: true
        });

        if (error) {
            globalDispatch({ type: "SET_ERROR", payload: error.message });
            globalDispatch({ type: "STOP_LOADING" });
            globalDispatch({ type: "SHOW_ALERT" });
        }

        // Cargar los datos de nuevo registro
        housingsDispatch({ type: "SET_HOUSINGS", payload: response.data });
        globalDispatch({ type: "STOP_LOADING" });
}

// Función para añadir imágenes a una vivienda
export const addImagesToHousing = async (housingId, image, altText, globalDispatch) => {
    globalDispatch({ type: "LOADING" });

    const imageFormData = new FormData();
    imageFormData.append("url", image);
    imageFormData.append("alt", altText);

    const { error, response } = await API ({ 
        endpoint: `/housings/addImage/${housingId}`, 
        method: "POST", 
        body: imageFormData
    });

    globalDispatch({ type: "STOP_LOADING" });

    if (error) {       
        globalDispatch({ type: "SET_ERROR", payload: error.message });
        globalDispatch({ type: "SHOW_ALERT" });
    } else {
        return response.data.images[0].url;
    }
}

// Función que elimina una imagen de una vivienda
export const deleteHousingImage = async (housingId, imageUrl, globalDispatch) => {
    globalDispatch({ type: "LOADING" });
    
    const { error } = await API ({ 
        endpoint: `/housings/deleteHousingImage/${housingId}`,
        method: "DELETE",
        body: { imageUrl: imageUrl },
        content_type: true
    });    

    globalDispatch({ type: "STOP_LOADING" })

    if (error) {
        globalDispatch({ type: "SET_ERROR", payload: error.message });
        globalDispatch({ type: "SHOW_ALERT" });
    }
}

// Función que devuelve el listado de viviendas
export const fetchHousings = async (globalDispatch, housingsDispatch) => {
    // Activar el loading
    globalDispatch({ type: "LOADING" });

    try {
        // Llamar a la API para la obtención de registros
        const { error, response } = await API({ endpoint:"/housings" });

        if(error) {
            globalDispatch({ type: "STOP_LOADING" });
            globalDispatch({ type: "SET_ERROR", payload: error.message });
            globalDispatch({ type: "SHOW_ALERT" });
        } else {
            if(response.records) {
                housingsDispatch({ type: "SET_HOUSINGS", payload: response.records });
            } else {
                housingsDispatch({ type: "SET_HOUSINGS", payload: [] })
            }
            globalDispatch({ type: "STOP_LOADING" });
        }
    } catch (error) {
        globalDispatch({ type: "STOP_LOADING" });
        globalDispatch({ type: "SET_ERROR", payload: error.message });
        globalDispatch({ type: "SHOW_ALERT" });
    }


}