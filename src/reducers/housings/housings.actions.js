import { API } from "../../utils/API/API";

// Función que abre el modal
export const openModal = (housingsDispatch) => { housingsDispatch({ type: "OPEN_MODAL" }) }

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
            globalDispatch({ type: "SHOW_ALERT" });
        } else {
            // Cargar los datos de nuevo registro
            housingsDispatch({ type: "SET_HOUSINGS", payload: response.data });
        }

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
        const lastImage = response.data.images[response.data.images.length -1];
        return lastImage;
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

// Función que devuelve los datos de una vivienda por su id
export const getHousingById = async (id, globalDispatch, housingsDispatch) => {
    globalDispatch({ type: "LOADING" });

    const { error, response } = await API ({ endpoint: `/housings/${id}` });

    if(error) {
        globalDispatch({ type: "SET_ERROR", payload: error.message });
        globalDispatch({ type: "SHOW_ALERT" });
    } else {
        housingsDispatch({ type: "SET_HOUSING", payload: response.data });
    }
    
    globalDispatch({ type: "STOP_LOADING" });
};

// Función que actualiza los datos de una vivienda
export const putHousing = async (housingId, housingData, housingsDispatch, globalDispatch) => {
    globalDispatch({ type: "LOADING" });
    // Llamada a la API para actualizar los datos del registro
    const { error, response } = await API({ 
        endpoint: `/housings/${housingId}`,
        method: "PUT",
        body: housingData,
        content_type: true
     });

     if(error) {
        globalDispatch({ type: "SET_ERROR", payload: error.message });
        globalDispatch({ type: "SHOW_ALERT" });
     } else {
        // Cargar los datos actualizados
        housingsDispatch({ type: "SET_HOUSING", payload: response.data });
        globalDispatch({ type: "OP_OK" });
     }

    globalDispatch({ type: "STOP_LOADING" });
}

// Función que elimina una vivienda
export const deleteHousing = async (id, globalDispatch, housings, housingsDispatch) => {
    console.log("Entro en deleteHousing");
    // Activar el loading
    globalDispatch({ type: "LOADING" });

    // Llamar a la API para eliminar el registro
    try {
        const { error } = await API({ endpoint: `/housings/${id}`, method: "DELETE" });

        // Comprobar si hay error en la respuesta
        if (error) {
            globalDispatch({ type: "SET_ERROR", payload: error.message });
            globalDispatch({ type: "SHOW_ALERT" });
        } else {
            // Eliminar el registro del estado housings[]
            const newHousings = housings.filter(housing => housing._id !== id);
            housingsDispatch({ type: "SET_HOUSINGS", payload: newHousings });
            globalDispatch({ type: "OP_OK" });
            globalDispatch({ type: "SHOW_ALERT" });
        }
        globalDispatch({ type: "STOP_LOADING" });
    } catch (error) {
        globalDispatch({ type: "STOP_LOADING" });
        globalDispatch({ type: "SET_ERROR", payload: error.message });
        globalDispatch({ type: "SHOW_ALERT" });
    }
}