import { API } from "../../utils/API/API";

// Función para manejar el cambio del input del icono
export const handleFileChange = (event, dispatch, globalDispatch, setValue) => {
    
    const file = event.target.files[0];

    dispatch({ type: "HANDLE_FILE_CHANGE", payload: file.name });// borrar

    if(file){
      // Tipos de archivos de imagen permitidos
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/bmp",
        "image/ico",
        "image/svg+xml"
      ];
      // Comprobar formato de archivo
      if (validImageTypes.includes(file.type)) {
        setValue("icon", [file]);        
        dispatch({ type: "HANDLE_FILE_CHANGE", payload: file.name });
      } else {
        dispatch({ type: "HANDLE_FILE_CHANGE", payload: "" });
        globalDispatch({ type: "SET_ERROR", payload: "Debes subir un archivo de imagen válido (JPEG, PNG, GIF, BMP, ICO, SVG)" });
        globalDispatch({ type: "SHOW_ALERT" });
      }
    }

};

// Función que abre el modal
export const openModal = (dispatch) => { dispatch({ type: "OPEN_MODAL" }); };

// Función que cierra el modal
export const closeModal = (dispatch) => { dispatch({ type: "CLOSE_MODAL" }) };

// Función que llama a la API para listar los registros
export const fetchFeatures = async (page, globalDispatch, dispatch) => {

  const limit = 10;

  console.log("Entro en el features");

  try {
    globalDispatch({ type: "LOADING" });
    const { error, response } = await API({ endpoint: `/features?page=${page}&limit${limit}` });

    if(error) {
      globalDispatch({ type: "STOP_LOADING" });
      globalDispatch({ type: "SET_ERROR", payload: error.message });
    } 
    
    //setFeatures(data);
    dispatch({ type: "SET_FEATURES", payload: response.records });
    globalDispatch({ type: "STOP_LOADING" });
    const totalPages = Math.ceil(response.totalRecords / limit);
    globalDispatch({ type: "SET_TOTAL_PAGES", payload: totalPages });
    } catch (error) {
        globalDispatch({ type: "STOP_LOADING" });
        globalDispatch({ type: "SET_ERROR", payload: error.message });
    }
}

// Función que elimina un registro
export const deleteFeature = async (id, globalDispatch, features, dispatch) => {
  globalDispatch({ type: "LOADING" });
  try {
    const { error } = await API({ endpoint: `/features/${id}`, method: "DELETE" });
    if(error) {
      globalDispatch({ type: "STOP_LOADING" });
      globalDispatch({ type: "SET_ERROR", payload: error.message });
    } else {
      globalDispatch({ type: "STOP_LOADING" });    
      // Definición del nuevo array de características.
      const newFeatures = features.filter(feature => feature._id !== id);
      dispatch({ type: "SET_FEATURES", payload: newFeatures });
      globalDispatch({ type: "OP_OK" });
      globalDispatch({ type: "SHOW_ALERT" });
    }
  } catch (error) {
    globalDispatch({ type: "STOP_LOADING" });
    globalDispatch({ type: "SET_ERROR", payload: error.message });      
  }
}

// Función para manejar el envío del formulario
export const onSubmit = async (data, globalDispatch, dispatch, features) => {
  try {
    globalDispatch({ type: "LOADING" });
    
    // Verifica que data.icon sea un array y contenga el archivo
    if (!data.icon || !Array.isArray(data.icon) || data.icon.length === 0) {
      globalDispatch({ type: "STOP_LOADING" });
      globalDispatch({ type: "SET_ERROR", payload: "No se ha seleccionado ningún archivo de imagen." });
      globalDispatch({ type: "SHOW_ALERT" });
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("icon", data.icon[0]); 

    const { error, response } = await API({
      endpoint: "/features",
      method: "POST",
      body: formData,
      content_type: false
    });

    if (error) {
      globalDispatch({ type: "STOP_LOADING" });
      globalDispatch({ type: "SET_ERROR", payload: error.message });
      globalDispatch({ type: "SHOW_ALERT" });
    } else {
      globalDispatch({ type: "STOP_LOADING" });
      closeModal(dispatch);
      globalDispatch({ type: "SET_ERROR", payload: null });
      globalDispatch({ type: "OP_OK" });
      globalDispatch({ type: "SHOW_ALERT" });
      fetchFeatures(page, globalDispatch, dispatch);  
    }
  } catch (error) {
    globalDispatch({ type: "STOP_LOADING" });
    globalDispatch({ type: "SET_ERROR", payload: error.message });
    globalDispatch({ type: "SHOW_ALERT" });
  }
};