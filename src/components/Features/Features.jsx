import "./Features.css"
import { useState } from "react"
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { API } from "../../utils/API/API";
import Alert from "../Alert/Alert";
import Loading from "../Loading/Loading";

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

  // Estado que controla la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función que cambia el estado del modal a true
  const openModal = () => { setIsModalOpen(true) };

  // Función que cambia el estado del modal a false
  const closeModal = () => { setIsModalOpen(false) };

  // Configuración de react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Función para manejar el envío del formulario
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("icon", data.icon);

      console.log(formData);

      const { response, error } = await API ({ endpoint: "/features", method: "POST", body: formData, content_type: false});

      if(error) {
        setError(error.message);
      } else {
        closeModal();
        setError(null);
      }
    } catch (error) {
      setError(error);
    }
    
  };

  // Límite de registros
  const limit = 10;

  // useEffect para llamar a la API
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const { error, response } = await API({ endpoint: `/features?page=${page}&limit${limit}` });

        if(error) {
          setError(error.message);
          setLoading(false);
        } 
        const data = response.records;
        console.log("Data: ", data);
        setFeatures(data);
        setLoading(false);
        setTotalPages(Math.ceil(response.totalRecords / limit));        
        } catch (err) {
            setLoading(false);
            setError(err.message);
        }
    }
    fetchFeatures();
  }, [page]);

// Función para pasar a la siguiente página
const handleNextPage = () => {
  if(page < totalPages) {
      setPage(page + 1);
  }
};

// Función para pasar a la página anterior
const handlePreviusPage = () => {
  if(page > 1) {
      setPage(page - 1);
  }
};

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
              <input type="text" { ...register("name", {required: "Campo obligatorio"}) } placeholder={ errors.name ? errors.name.message : "" } className="input-text" />
              <label htmlFor="icon">
                Subir icono
              </label>
              <input type="file" { ...register("icon", { required: "Campo obligatorio"}) } className="input-text" />
              {errors.icon && (
                <span>{errors.icon.message}</span>
              )}
              <div className="buttons-row">
                <button type="button" onClick={ closeModal }>Cancelar</button>
                <button type="submit">Enviar</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {error && <Alert type="error">{error}</Alert>}
      {loading && <Loading />}
      <div className="data-container">
        <div className="ttle-btn-add-row">
          <h2 className="section-title">Características de las viviendas</h2>
          <button className="btn-add-record" onClick={ openModal }>+ Nuevo registro</button>
        </div>
          <div className="features-header">
              <div className="l-columns">
                <span>Icono</span>
                <span>Nombre</span>
              </div>
              <div className="actions">
                <span>Acciones</span>
              </div>
          </div>
          {features.map((feature) => (
            <div className="features-row" key={feature._id}>
              <span>{feature.name}</span>
            </div>
          ))}
          <div className="pagination-row">
            <img src="icons/arrow.png" className="arrow prev" alt="anterior" onClick={handlePreviusPage} disabled={page === 1} />
            <span>Página { page } de { totalPages }</span>
            <img src="icons/arrow.png" className="arrow" alt="siguiente" onClick={handleNextPage} disabled={page === totalPages} />
          </div>
      </div>
    </>
  )
}

export default Features