// Función para manejar el cambio del input del icono
export const handleFileChange = (event, dispatch) => {
    
    const file = event.target.files[0];
    console.log(file);

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
        //setIconName(file.name);
        dispatch({ type: "HANDLE_FILE_CHANGE", payload: file.name });
      } else {
        //setIconName("");
        dispatch({ type: "HANDLE_FILE_CHANGE", payload: "" });
        setError("Debes subir un archivo de imagen válido (JPEG, PNG, GIF, BMP, ICO, SVG)");
        setShowAlert(true);
      }

    }

  };


  export const openModal = (dispatch) => { dispatch({ type: "OPEN_MODAL" }) };
