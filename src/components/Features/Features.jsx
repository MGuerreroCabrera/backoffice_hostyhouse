import "./Features.css"
import { useState } from "react"
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { API } from "../../utils/API/API";
import Alert from "../Alert/Alert";
import Loading from "../Loading/Loading";
import Paginator from "../Paginator/Paginator";

const Features = () => {
  // Estado para almacenar las características de las viviendas
  const [features, setFeatures] = useState([]);

  // Estado para el loading
  const [loading, setLoading] = useState(true);

  // Estado para controlar las páginas de resultados
  const [page, setPage] = useState(1);

  // Estado para controlar el total de páginas
  const [totalPages, setTotalPages] = useState(1);

  // Estado para controlar el error de la consulta
  const [error, setError] = useState(null);

  // Estado para mensaje resultado OK
  const [opOk, setOpOK] = useState(false);

  // Estado para controlar la visibilidad del Alert
  const [showAlert, setShowAlert] = useState(false);

  // Estado que controla la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función que cambia el estado del modal a true
  const openModal = () => { setIsModalOpen(true) };

  // Función que cambia el estado del modal a false
  const closeModal = () => { setIsModalOpen(false) };

  // Configuración de react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

   // Función para cerrar el Alert
   const closeAlert = () => {
       setShowAlert(false);
       setError(null);
   }

  // Función para manejar el envío del formulario
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("icon", data.icon[0]);      

      const { error } = await API ({ endpoint: "/features", method: "POST", body: formData, content_type: false});

      if(error) {
        setLoading(false);
        setError(error.message);
        setShowAlert(true);
      } else {
        setLoading(false);
        closeModal();
        setError(null);
        setOpOK(true);
        setShowAlert(true);
        fetchFeatures();
      }
    } catch (error) {
      setLoading(false);
      setError(error);
      setShowAlert(true);
    }
    
  };

  // Límite de registros
  const limit = 10;

  // Función que llama a la API para listar los registros
  const fetchFeatures = async () => {
    try {
      setLoading(true);

      const { error, response } = await API({ endpoint: `/features?page=${page}&limit${limit}` });

      if(error) {
        setError(error.message);
        setLoading(false);
      } 

      const data = response.records;
      
      setFeatures(data);
      setLoading(false);
      setTotalPages(Math.ceil(response.totalRecords / limit));        
      } catch (err) {
          setLoading(false);
          setError(err.message);
      }
  }

  // useEffect para llamar a la API
  useEffect(() => {    
    fetchFeatures();
  }, [page]);

  const deleteFeature = async (id) => {
    try {
      setLoading(true);
      const { error } = await API({ endpoint: `/features/${id}`, method: "DELETE" });
      if(error) {
        setLoading(false);
        setError(error.message);        
      } else {
        setLoading(false);
        setFeatures(features.filter(feature => feature._id !== id));        
      }
    } catch (err) {
      setLoading(false);
      setError(err.message)
    }
  }

  return (
    <>
      {isModalOpen && (
        <div className="modal-overlay" onClick={ closeModal }>
          <div className="modal-content" onClick={ (e) => e.stopPropagation() }>
            <h3 className="form-title">Nuevo registro</h3>
            <form onSubmit={ handleSubmit(onSubmit) } className="new-feature-form">
              <label htmlFor="name">
                Nombre de la característica
              </label>
              <input type="text" { ...register("name", {required: "El campo nombre es obligatorio"}) } placeholder={ errors.name ? errors.name.message : "" } className="input-text" />
              {errors.name && <Alert type="error" onClose={ closeAlert }>{ errors.name.message }</Alert>}
              <label htmlFor="icon" className="upload-row">
                <img src="/icons/upload.png" alt="Subir icono" />
                <span>Subir icono</span>
              </label>
              <input type="file" id="icon" { ...register("icon", { required: "Debes seleccionar un icono para este registro"}) } className="input-text" style={{ display: "none" }}/>
              {errors.icon && <Alert type="error" onClose={ closeAlert }>{ errors.icon.message }</Alert>}
              <div className="buttons-row">
                <button type="button" onClick={ closeModal }>Cancelar</button>
                <button type="submit">Enviar</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {loading && <Loading />}
      {showAlert && error && <Alert type="error" onClose={ closeAlert }>{error}</Alert>}
      {showAlert && opOk && <Alert type="success" onClose={ closeAlert }>Registro creado con éxito</Alert>}
      <div className="data-container">
        <div className="ttle-btn-add-row">
          <h2 className="section-title">Características de las viviendas</h2>
          <button className="btn-add-record" onClick={ openModal }>+ Nuevo registro</button>
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
                <img src={ feature.icon } alt={ feature.name } title="Eliminar registro" />
                <span>{ feature.name }</span>
              </div>
              <div className="actions">
                <img src="icons/delete.png" alt="Eliminar registro" className="action-button" onClick={() => deleteFeature(feature._id)} />
              </div>
            </div>
          ))}
          <Paginator page={ page } totalPages={ totalPages } setPage={ setPage } />
      </div>
    </>
  )
}

export default Features