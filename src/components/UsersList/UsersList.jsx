import "./UsersList.css";
import { useReducer } from "react";
import { globalReducer, INITIAL_GLOBAL_STATE } from "../../reducers/global/global.reducer";
import { INITIAL_USERS_STATE, usersReducer } from "../../reducers/users/users.reducer";
import { fetchUsers, openModal, closeModal, postUser, deleteUser, findUserById } from "../../reducers/users/users.actions";
import { useEffect } from "react";
import Paginator from "../Paginator/Paginator";
import { useForm } from "react-hook-form";
import Alert from "../Alert/Alert";
import { closeAlert } from "../../utils/closeAlert";
import Loading from "../Loading/Loading";
import { useState } from "react";

const UsersList = () => {
  // Uso del hook useReducer para ( globalReducer y usersReducers )
  const [globalState, globalDispatch] = useReducer(globalReducer, INITIAL_GLOBAL_STATE);
  const [usersState, usersDispatch] = useReducer(usersReducer, INITIAL_USERS_STATE);

  // Desestructurizar propiedades de los reducers
  const { loading, page, totalPages, error, showAlert, opOk, rol } = globalState;
  const { users, isModalOpen } = usersState;

  // useEffect para llamar a la API y traer los registros.
  useEffect(() => {
    fetchUsers(globalDispatch, usersDispatch, page);
  }, [page]);

  // Configuración de react-hook-form
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  // Estado para almacenar el id del usuario
  const [editingUserId, setEditingUserId] = useState(null);

  const handleFormSubmit = (data) => {
    // Añadirle al objeto la propiedad rol
    data.rol = "user";
    postUser(data, globalDispatch, usersDispatch, users, editingUserId);
  }

  // Función que maneja el botón Cancelar
  const handleCancel = () => {
    closeModal(usersDispatch);
    reset();
  }  

  // Función para manejar la apertura del modal con los datos del usuario
  const handleEditUser = async (userId) => {
    // Obtener los datos del usaurio
    const userData = await findUserById(userId, globalDispatch);
    // Resetear el formulario con los datos del usuario
    reset(userData);
    // Establecer el rol del usuario
    globalDispatch({ type: "SET_ROL", payload: userData.rol });
    // Poner el id del usuario en el estado
    setEditingUserId(userId);
    // Abrir modal
    openModal(usersDispatch, reset);
  };

  return (
    <>
      {isModalOpen && (
        <div className="users-modal-overlay" onClick={ handleCancel }>
          <div className="users-modal-content" onClick={ (e) => e.stopPropagation() }>
            <h3 className="users-form-title">Nuevo registro</h3>
            <form onSubmit={ handleSubmit(handleFormSubmit) } className="new-user-form">
              <label htmlFor="name" className="input-label">
                Nombre de usuario
              </label>
              <input type="text" { ...register("name", {required: "El campo nombre es obligatorio"}) } placeholder={ errors.name ? errors.name.message : "" } className="input-text" />
              {errors.name && <Alert type="error" onClose={ () => { closeAlert(globalDispatch) } }>{ errors.name.message }</Alert>}
              <label htmlFor="email" className="input-label">
                Correo electrónico
              </label>
              <input type="text" { ...register("email", {
                required: "El campo email es obligatorio",
                pattern: { 
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                  message: "Por favor, introduce una dirección de correo electrónico válida" 
                }
                }) } placeholder={ errors.email ? errors.email.message : "" } className="input-text" />
              {errors.email && <Alert type="error" onClose={ () => { closeAlert(globalDispatch) } }>{ errors.email.message }</Alert>}   
              <label htmlFor="password" className="input-label">
                Contraseña
              </label>
              <input type="password" { ...register("password", {required: "El campo contraseña es obligatorio"}) } placeholder={ errors.password ? errors.password.message : "" } className="input-text" />
              {errors.password && <Alert type="error" onClose={ () => { closeAlert(globalDispatch) } }>{ errors.password.message }</Alert>}           
              <label htmlFor="rol" className="input-label">
                Rol del usuario
              </label>
              <div className="buttons-row">
                <button type="button" onClick={ handleCancel } className="btn-1">Cancelar</button>
                <button type="submit" className="btn-1">Enviar</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {
      loading && <Loading />
      }
      {showAlert && error && <Alert type="error" onClose={ () => { closeAlert(globalDispatch) }}>{error}</Alert>}
      {showAlert && opOk && <Alert type="success" onClose={ () => closeAlert(globalDispatch) }>Operación realizada correctamente</Alert>}
      <div className="data-container">
      <div className="ttle-btn-add-row">
        <h2 className="section-title">Usuarios</h2>
        <button className="btn-add-record" onClick={ () => openModal(usersDispatch, reset) }>+ Nuevo registro</button>        
      </div>
      <div className="columns-header">        
        <div className="header-data" style={{ justifyContent: "flex-start" }}>
          <span>Nombre de usuario</span>
        </div>
        <div className="header-data">
          <span>Correo electrónico</span>
        </div>
        <div className="header-data">
          <span>ROL</span>
        </div>
        <div className="header-data-actions">
          <span>Acciones</span>
        </div>
      </div>
      {users.map((user) => (
        <div key={user._id} className="users-data-row">
          <div className="data-column">
            <span>{ user.name }</span>
          </div>
          <div className="data-column" style={{ justifyContent: "center" }}>
            <span>{ user.email }</span>
          </div>
          <div className="data-column" style={{ justifyContent: "center" }}>
            <span>{ user.rol }</span>
          </div>
          <div className="data-actions">
            <img src="icons/edit.png" alt="Editar registro" title="Editar registro" onClick={ () => handleEditUser(user._id) } />
            <img src="icons/delete.png" alt="Eliminar registro" title="Eliminar registro" onClick={() => deleteUser(user._id, globalDispatch, usersDispatch, users)} />
          </div>
        </div>
      ))}
      <Paginator page={ page } totalPages={ totalPages } globalDispatch={ globalDispatch } />
    </div>
    </>
  )
}

export default UsersList