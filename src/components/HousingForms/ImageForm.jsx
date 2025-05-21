import "./HousingForms.css";
import { useForm } from "react-hook-form";
import { addImagesToHousing, deleteHousingImage } from "../../reducers/housings/housings.actions";
import { useState, useEffect } from "react";
import Alert from "../Alert/Alert";
import { closeAlert } from "../../utils/closeAlert";

const ImageForm = ({ housingsState, globalDispatch, closeModal, setIsDataComplete }) => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const [images, setImages] = useState([]);
  const [fileName, setFileName] = useState("Haz click aquí para seleccionar la imagen que quieres subir");
  const [fileError, setFileError] = useState(null);
  
  const housingId = housingsState.housings._id;

  const imageFile = watch("housingImages");

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      const validImageTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/jpg", "image/svg"];
      if (!validImageTypes.includes(file.type)) {
        setFileError("Formato de archivo no válido");
        globalDispatch({ type: "SHOW_ALERT" });
        setFileName("Haz click aquí para seleccionar la imagen que quieres subir");
      } else {
        setFileError(null);
        setFileName(file.name);
      }
    }
  }, [imageFile]);

  const onSubmit = async (data) => {
    const imageFile = data.housingImages[0];
    const altText = data.imgAlt;

    if (imageFile && altText && !fileError) {
      const imageUrl = await addImagesToHousing(housingId, imageFile, altText, globalDispatch);
      console.log("imageUrl: ", imageUrl.url);
      if (imageUrl) {
        const newImage = {
          url: imageUrl.url,
          alt: imageUrl.alt
        };
        setImages([...images, newImage]);
      }      
      // Limpiar el formulario
      reset();
      setFileName("Haz click aquí para seleccionar la imagen que quieres subir");
    }    
  };

  const handleCloseAlert = () => {
    setFileError(null);    
    errors.imgAlt = false;
    errors.housingImages = false;
    closeAlert(globalDispatch);
  }

  const handleFinish = () => {    
    setIsDataComplete(true);
    reset();
    closeModal();
  }

  const handleDeleteImage = async (imageUrl) => {
    await deleteHousingImage(housingId, imageUrl, globalDispatch);
    setImages(images.filter(image => image.url !== imageUrl));
  }

  return (
    <>
      { fileError && <Alert type={ "error" } onClose={ handleCloseAlert } >{ fileError }</Alert> }
      { errors.imgAlt && <Alert type={ "error" } onClose={ handleCloseAlert } >{ errors.imgAlt.message }</Alert> }
      { errors.housingImages && <Alert type={ "error" } onClose={ () => { closeAlert(globalDispatch) } }>{ errors.housingImages.message }</Alert> }
      <form name="housing-images" onSubmit={handleSubmit(onSubmit)} onClick={(e) => e.stopPropagation()}>
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
          <div className="upload-row">            
            <label htmlFor="imageAlt" className="input-label">Introduce un texto alternativo para la imagen</label> 
            <input 
              type="text" 
              {...register("imgAlt", { required: "El texto alternativo es requerido" })} 
              className="input-text" 
            />            
          </div>
        <div className="button-row">
          <button className="btn-1" onClick={ handleFinish }>Finalizar</button>
          <button type="submit" className="btn-1">Enviar</button>
        </div>
      </form>
      <div className="images-container" onClick={(e) => e.stopPropagation()}>
        {images.map((image, index) => (
          <div key={index} className="image-preview">
            <img src={image.url} alt={image.alt} className="housing-img" />
            <p>{image.alt}</p>
            <img src="/icons/delete-white.png" alt="Eliminar imagen" title="Eliminar imagen" className="delete-image-icon" onClick={ () => handleDeleteImage(image.url) } />
          </div>
        ))}
      </div>
    </>
  )
}

export default ImageForm