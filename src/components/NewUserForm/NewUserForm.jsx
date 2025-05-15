import "./NewUserForm.css";
import { useForm } from 'react-hook-form'
import Alert from '../Alert/Alert';
import { closeAlert } from '../../utils/closeAlert';
import { postUser } from "../../reducers/users/users.actions";

const NewUserForm = ({ globalDispatch, closeModal, usersDispatch, users }) => {
  
  // Configuarar react hook form para el formulario
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Función que maneja el envío de datos del formulario
  const onSubmit = async (data) => {
    await postUser(data, globalDispatch, usersDispatch, users);
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
          <>
            <label htmlFor="password" className="input-label">
              Contraseña
            </label>
            <input type="password" { ...register("password", {required: "El campo contraseña es obligatorio"}) } placeholder={ errors.password ? errors.password.message : "" } className="input-text" />
            {errors.password && <Alert type="error" onClose={ () => { closeAlert(globalDispatch) } }>{ errors.password.message }</Alert>}           
          </>         
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

export default NewUserForm