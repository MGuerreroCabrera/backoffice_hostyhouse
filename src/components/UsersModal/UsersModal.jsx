import EditUserForm from "../EditUserForm/EditUserForm";
import NewUserForm from "../NewUserForm/NewUserForm";
import "./UsersModal.css";

const UsersModal = ({ modalView, closeModal, globalDispatch, usersDispatch, users, userId = null }) => {
  return (
    <div className="modal-overlay" onClick={ (e) => { 
        if(e.target === e.currentTarget) {
          closeModal(); 
        }
        }}>
        {modalView === "new" ? (
            <NewUserForm 
                globalDispatch = { globalDispatch }
                closeModal = { closeModal } 
                usersDispatch = { usersDispatch }
                users = { users }
            />
        ) : modalView === "edit" ? (
            <EditUserForm
                globalDispatch = { globalDispatch }
                closeModal = { closeModal }
                usersDispatch = { usersDispatch }
                users = { users }
                userId = { userId }

            />
        ) : ""}
    </div>
  )
}

export default UsersModal