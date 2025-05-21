import "./FeaturesList.css";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Alert from "../Alert/Alert";
import Loading from "../Loading/Loading";
import Paginator from "../Paginator/Paginator";
import { closeAlert } from "../../utils/closeAlert";
import { useReducer } from "react";
import { closeModal, handleFileChange, openModal, fetchFeatures, onSubmit, deleteFeature } from "../../reducers/features/features.actions";
import { globalReducer, INITIAL_GLOBAL_STATE } from "../../reducers/global/global.reducer";
import { featuresReducer, INITIAL_FEATURES_STATE } from "../../reducers/features/features.reducer";
import useModal from "../../Hooks/useModal";

const FeaturesList = () => {
  // Uso del hook useReducer globalReducer
  const [globalState, globalDispatch] = useReducer(globalReducer, INITIAL_GLOBAL_STATE);

  // Desestructurizar estados globales
  const { loading, error, opOk, showAlert, page, totalPages } = globalState;

  // Uso del hook useReducer para manejar estados de las caracterísiticas.
  const [state, dispatch] = useReducer(featuresReducer, INITIAL_FEATURES_STATE);

  // Desestructurización de las propiedades del INITIAL_FEATURES_STATE
  const { features, iconName } = state;

  // Uso del custom hook useModal para manejar la apertura y el cierre del modal
  const { isModalOpen, openModal, closeModal } = useModal();

  // Configuración de react-hook-form
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();

  const iconValue = watch("icon");

  useEffect(() => {
    if(iconValue?.[0]) {
      handleFileChange(iconValue[0], dispatch, globalDispatch)
    }
  }, [iconValue])

  const handleFormSubmit = (data) => {
    onSubmit(data, globalDispatch, dispatch, features, closeModal, reset);
  }

  // useEffect para llamar a la API
  useEffect(() => {    
    fetchFeatures(page, globalDispatch, dispatch);
  }, [page]);

  // Función que maneja el botón de Cancelar
  const handleCancel = () => {
    closeModal();
    reset();
  }
  
  return (
    <>
      {isModalOpen && (
        <div className="modal-overlay" onClick={ () => closeModal() }>
          <div className="modal-content" onClick={ (e) => e.stopPropagation() }>
            <h3 className="form-title">Nuevo registro</h3>
            <form onSubmit={ handleSubmit(handleFormSubmit) } className="new-feature-form">
              <label htmlFor="name">
                Nombre de la característica
              </label>
              <input type="text" { ...register("name", {required: "El campo nombre es obligatorio"}) } placeholder={ errors.name ? errors.name.message : "" } className="input-text" />
              {errors.name && <Alert type="error" onClose={ () => { closeAlert(globalDispatch) } }>{ errors.name.message }</Alert>}
              <label htmlFor="icon" className="upload-row">
                <img src="/icons/upload.png" alt="Subir icono" />
                <span>{iconName || "Subir icono"}</span>
              </label>
              <input
                type="file"
                id="icon"
                {...register("icon", { required: "Icono obligatorio" })}
                className="input-text"
                style={{ display: "none" }}
              />
              {errors.icon && <Alert type="error" onClose={ () => { closeAlert(globalDispatch) } }>{ errors.icon.message }</Alert>}
              <div className="buttons-row">
                <button type="button" className="btn-1" onClick={ handleCancel }>Cancelar</button>
                <button type="submit" className="btn-1">Enviar</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {loading && <Loading />}
      {showAlert && error && <Alert type="error" onClose={ () => { closeAlert(globalDispatch) } }>{ error }</Alert>}
      {showAlert && opOk && <Alert type="success" onClose={ () => { closeAlert(globalDispatch) } }>Operación reralizada correctamente</Alert>}
      <div className="data-container">
        <div className="ttle-btn-add-row">
          <h2 className="section-title">Características de las viviendas</h2>
          <button className="btn-add-record" onClick={ () => { openModal() } }>+ Nuevo registro</button>
        </div>
        <div className="features-header">
            <div className="l-column">
            <span>Icono</span>
            <span>Nombre</span>
          </div>
          <div className="actions">
            <span>Acciones</span>
          </div>        
        </div>
          {features.map((feature) => (
            <div className="features-row" key={feature._id}>
              <div className="l-column">
                <img src={ feature.icon } alt={ feature.name } title={ feature.name } className="icon" />
                <span>{ feature.name }</span>
              </div>
              <div className="actions">
                <img src="icons/delete.png" alt="Eliminar registro" className="action-button" onClick={() => deleteFeature(feature._id, globalDispatch, features, dispatch)} />
              </div>
            </div>
          ))}
          <Paginator page={ page } totalPages={ totalPages } globalDispatch={ globalDispatch } />
      </div>
    </>
  )
}

export default FeaturesList