import "./EditHousingForm.css";
import { addImagesToHousing, deleteHousingImage, putHousing } from "../../reducers/housings/housings.actions";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useEffect } from "react";
import Alert from "../Alert/Alert";
import { closeAlert } from "../../utils/closeAlert";
import Loading from "../Loading/Loading";
import { fetchHousing } from "../../utils/fetchHousing";

const EditHousingForm = ({ housingsState, housingsDispatch, globalDispatch, globalState, closeModal }) => {

    
    const housing = housingsState.housing;
    //console.log("Datos actualizados: ", housing);
    
    
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({ defaultValues: housing });
    
    useEffect(() => {
        reset();
        fetchHousing(housingsState.housingId, globalDispatch, housingsDispatch);
    }, []);

    const [fileName, setFileName] = useState("Haz click aquí para seleccionar la imagen que quieres subir");
    const [fileError, setFileError] = useState(null);
    const [images, setImages] = useState(housing.images);
    const [alert, setAlert] = useState(false);

    const imageFile = watch("housingImages");

    const onSubmit = async (data) => {
        if(data.housingImages[0]) {
            // Recoger los datos de la imagen
            const imageFile = data.housingImages[0];
            const altText = data.imgAlt;
            // Llamada a la función que sube la imagen
            const imageUrl = await addImagesToHousing(housing._id, imageFile, altText, globalDispatch);                        
            // Inicializar objeto con los datos de la imagen
            if(imageUrl) {
                const newImage = {
                    url: imageUrl,
                    alt: altText
                };
                // Actualizar el array images con la nueva imagen
                setImages([...images, newImage]);
                // Reseteo de los datos de las imágenes
                setFileName("Haz click aquí para seleccionar la imagen que quieres subir");
                reset({
                    housingImages: [],
                    imgAlt: ""
                });
            }
        } 
        // Construir objeto con los datos a actualizar
        const housingData = {
            name: data.name,
            location: data.location,
            description: data.description,
            features: housing.features.map((feature) => ({
                feature: feature.feature._id,
                value: data.features[feature.feature.name] || ""
            })),
            price: data.price
        };
        console.log("Envío esto: ", housingData);
        // Llamar a la función que actualiza los datos del registro
        await putHousing(housing._id, housingData, housingsDispatch, globalDispatch);            
        closeModal();
    };

    // useEffect para la subida de imágenes
    useEffect(() => {
        if (imageFile && imageFile.length > 0) {
          const file = imageFile[0];
          const validImageTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/jpg", "image/svg"];
          if (!validImageTypes.includes(file.type)) {
            setFileError("Formato de archivo no válido");
            globalDispatch( { type: "SET_ERROR", payload: fileError } );
            globalDispatch({ type: "SHOW_ALERT" });
            setFileName("Haz click aquí para seleccionar la imagen que quieres subir");
          } else {
            setFileError(null);
            setFileName(file.name);
          }
        }
      }, [imageFile]);

    // Función que maneja la opción de eliminar una imagen
    const handleDeleteImage = async (imageUrl) => {
        globalDispatch({ type: "LOADING" });
        // Eliminar la imagen de la BBDD
        await deleteHousingImage(housingsState.housingId, imageUrl, globalDispatch);
        // Filtrar la imagen eliminada del array de imágenes
        const updatedImages = images.filter(image => image.url !== imageUrl);  
        // Actualizar el array del estado imágenes
        setImages(updatedImages);
        globalDispatch({ type: "STOP_LOADING" });
        globalDispatch({ type: "OP_OK" });
        globalDispatch({ type: "SHOW_ALERT" });
        setAlert(true);
    }

    // Manejador para cerrar la Alerta
    const handleCloseAlert = () => {
        closeAlert(globalDispatch);
        setAlert(false);
      }

    return (
        <>
        { alert && <Alert type="success" onClose={ handleCloseAlert } globalDispatch = { globalDispatch }>Operación realizada correctamente</Alert> }      
        { globalState.loading && <Loading /> }     
        { globalState.error && <Alert type="error" onClose={ handleCloseAlert }>{ globalState.error }</Alert> }
        <section className="data-container" onClick={(e) => e.stopPropagation()}>            
            <header>
                <h1>Editar datos</h1>
                <img src="/icons/close.png" alt="Cerrar ventana" title="Cerrar" className="close-modal" onClick={ () => closeModal() } />
            </header>
            <main>
                <form onSubmit={ handleSubmit(onSubmit) }>
                    <div className="ehf-row">
                        <label htmlFor="name" className="input-label">Nombre</label>
                        <input { ...register("name", { required: true }) } className="input-text input-100" />
                    </div>
                    <div className="ehf-row">
                        <label htmlFor="description" className="input-label">Descripción</label>
                        <textarea { ...register("description", { required: true }) } className="description"></textarea>
                    </div>
                    <div className="ehf-row">
                        <label htmlFor="location"className="input-label">Ubicación</label>
                        <input { ...register("location", { required: true }) } className="input-text input-100" />
                    </div>
                    <div className="ehf-row">
                        <label htmlFor="price" className="input-label">Precio / noche</label>
                        <input { ...register("price", { required: true }) } className="input-text input-20" />
                    </div>
                    <div className="ehf-features-row">
                        { housing && housing.features && housing.features.length > 0 && housing.features.map((feature) => (
                        <div key={ feature._id } className="feature-row">
                            <label htmlFor={ feature.feature.name } className="input-label">
                                { feature.feature.name }
                            </label>
                            <div>
                                <img src={ feature.feature.icon } />
                                <input type="text" { ...register(`features.${feature.feature.name}`) } defaultValue={ feature.value } className="feature-input" />                                
                            </div>
                        </div>
                        )) }
                    </div>                    
                    <div className="images-container" onClick={ (e) => e.stopPropagation() }>
                        { images && images.length > 0 && images.map((image, index) =>(
                            <div key = { index } className="image-preview">
                                <img src={image.url} alt={image.alt} className="housing-img" />
                                <p>{image.alt}</p>                                
                                <img src="/icons/delete-white.png" alt="Eliminar imagen" title="Eliminar imagen" className="delete-image-icon" onClick={ (e) => { e.stopPropagation(); handleDeleteImage(image.url) } } />
                            </div>
                        )) }
                    </div>
                    <div className="upload-row">
                        <label htmlFor="housing-images" className="upload-label" style={{ textAlign: "center" }}>
                            <img src="/icons/upload.png" alt="Subir imagen" className="upload-img" />      
                            <span className="input-label">{ fileName }</span>             
                            <span className="input-label-s">Archivos soportados: .jpg .jpeg .gif .webp .svg</span>     
                        </label>                    
                        <input 
                        type="file" 
                        id="housing-images" 
                        accept="image/*"
                        {...register("housingImages")} 
                        style={{ display: "none" }} 
                        />
                    </div>
                    <div className="upload-row">            
                        <label htmlFor="imageAlt" className="input-label">Introduce un texto alternativo para la imagen</label> 
                        <input 
                        type="text" 
                        {...register("imgAlt")} 
                        className="input-text" 
                        />            
                    </div>
                    <div className="ehf-row">
                        <button type="submit" className="btn-1">Actualizar</button>
                    </div>
                </form>
            </main>
        </section>
        </>
    )
}

export default EditHousingForm