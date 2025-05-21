import { useForm } from "react-hook-form";
import { closeAlert } from "../../utils/closeAlert";
import Alert from "../Alert/Alert";
import "./EditUserForm.css";
import { findUserById, putUser } from "../../reducers/users/users.actions";
import { useEffect } from "react";

const EditUserForm = ({ globalDispatch, closeModal, usersDispatch, users, userId }) => {
  // Configuarar react hook form para el formulario
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Obtener los datos del usuario
  useEffect(() => {
    const fetchData = async () => {
      const userData = await findUserById(userId, globalDispatch);
      reset(userData);
    };

    fetchData(); 
  }, [userId, globalDispatch, reset]); 


  // Función que maneja el envío de datos del formulario
  const onSubmit = async (data) => {
    await putUser(data, globalDispatch, usersDispatch, users, userId);
    reset();
    closeModal();
  };

  // Función que maneja el cierre del formulario
  const handleCancel = () => {
    reset();
    closeModal();
  };

  return (
      <div className="users-modal-content" onClick={ (e) => e.stopPropagation() }>
        <h3 className="users-form-title">Nuevo registro</h3>
        <form onSubmit={ handleSubmit(onSubmit) } className="new-user-form">
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
        <label htmlFor="rol" className="input-label">
          Rol del usuario
        </label>
        <select {...register("rol")} className="input-text select-rol">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <div className="buttons-row">
          <button type="button" onClick={ handleCancel } className="btn-1">Cancelar</button>
          <button type="submit" className="btn-1">Enviar</button>
        </div>
      </form>
    </div>
  )
}

export default EditUserForm