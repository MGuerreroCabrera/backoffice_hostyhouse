import "./EditHousingForm.css";
import { closeModal, deleteHousingImage } from "../../reducers/housings/housings.actions";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useEffect } from "react";

const EditHousingForm = ({ housingsState, housingsDispatch, globalDispatch }) => {

    // console.log("housingsState: ", housingsState);
    // console.log("Id: ", housingsState.housingId);

    const housing = housingsState.housings.find(h => h._id === housingsState.housingId);

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({ defaultValues: housing });

    const [fileName, setFileName] = useState("Haz click aquí para seleccionar la imagen que quieres subir");
    const [fileError, setFileError] = useState(null);
    const [images, setImages] = useState(housing.images);

    const imageFile = watch("housingImages");

    const onSubmit = async (data) => {
        console.log(data);
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
        // Eliminar la imagen de la BBDD
        await deleteHousingImage(housingsState.housingId, imageUrl, globalDispatch);
        // Filtrar la imagen eliminada del array de imágenes
        const updatedImages = images.filter(image => image.url !== imageUrl);  

        setImages(updatedImages);
    }

    return (
        <section className="data-container" onClick={(e) => e.stopPropagation()}>
            <header>
                <h1>Editar datos</h1>
                <img src="/icons/close.png" alt="Cerrar ventana" title="Cerrar" className="close-modal" onClick={ () => closeModal(housingsDispatch) } />
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
                                <img src={ feature.feature.icon } className="feature-icon" alt={ feature.feature.name } />
                                <input type="text" { ...register(`features.${feature.feature.name}`, { required: true }) } defaultValue={ feature.value } className="feature-input" />
                            </div>
                        </div>
                        )) }
                    </div>                    
                    <div className="images-container" onClick={ (e) => e.stopPropagation() }>
                        {/* { housing && housing.images && housing.images.length > 0 && housing.images.map((image) => ( */}
                        { images && images.length > 0 && images.map((image) =>(
                            <div key = { image._id } className="image-preview">
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
                        {...register("housingImages", { required: "La imagen es requerida" })} 
                        style={{ display: "none" }} 
                        />
                    </div>
                    <div className="ehf-row">
                        <button className="btn-1">Actualizar</button>
                    </div>
                </form>
            </main>
        </section>
    )
}

export default EditHousingForm