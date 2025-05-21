import "./UsersList.css";
import { useReducer } from "react";
import { globalReducer, INITIAL_GLOBAL_STATE } from "../../reducers/global/global.reducer";
import { INITIAL_USERS_STATE, usersReducer } from "../../reducers/users/users.reducer";
import { fetchUsers, deleteUser } from "../../reducers/users/users.actions";
import { useEffect } from "react";
import Paginator from "../Paginator/Paginator";
import Alert from "../Alert/Alert";
import { closeAlert } from "../../utils/closeAlert";
import Loading from "../Loading/Loading";
import { useState } from "react";
import useModal from "../../Hooks/useModal";
import UsersModal from "../UsersModal/UsersModal";

const UsersList = () => {
  // Uso del hook useReducer para ( globalReducer y usersReducers )
  const [globalState, globalDispatch] = useReducer(globalReducer, INITIAL_GLOBAL_STATE);
  const [usersState, usersDispatch] = useReducer(usersReducer, INITIAL_USERS_STATE);

  // Desestructurizar propiedades de los reducers
  const { loading, page, totalPages, error, showAlert, opOk, rol } = globalState;
  const { users } = usersState;

  const [modalView, setModalView] = useState("new");

  // Uso del custom hook useModal para manejar los estados del modal
  const { isModalOpen, openModal, closeModal } = useModal();

  // useEffect para llamar a la API y traer los registros.
  useEffect(() => {
    fetchUsers(globalDispatch, usersDispatch, page);
  }, [page]);
  
  // Estado para almacenar el id del usuario
  const [editingUserId, setEditingUserId] = useState(null);


  const handleNewUser = () => {
    setModalView("new");
    openModal();
  }

  const handleEditUser = (userId) => {
    setEditingUserId(userId);
    setModalView("edit");
    openModal();
  };

  
  return (
    <>
      { isModalOpen && modalView === "edit" && (
        <UsersModal 
        modalView = { modalView }
        closeModal = { closeModal } 
        globalDispatch = { globalDispatch }
        usersDispatch = { usersDispatch }
        users = { users }
        userId = { editingUserId }
      />
      ) }
      {isModalOpen && modalView === "new" && (
        <UsersModal 
          modalView = { modalView }
          closeModal = { closeModal } 
          globalDispatch = { globalDispatch }
          usersDispatch = { usersDispatch }
          users = { users }
        />
      )}
      { loading && <Loading /> }
      { showAlert && error && <Alert type="error" onClose={ () => { closeAlert(globalDispatch) }} globalDispatch = { globalDispatch }>{error}</Alert> }
      { showAlert && opOk && <Alert type="success" onClose={ () => closeAlert(globalDispatch) } globalDispatch = { globalDispatch }>Operación realizada correctamente</Alert>}
      <div className="data-container">
      <div className="ttle-btn-add-row">
        <h2 className="section-title">Usuarios</h2>
        <button className="btn-add-record" onClick={ () => { handleNewUser() } }>+ Nuevo registro</button>
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