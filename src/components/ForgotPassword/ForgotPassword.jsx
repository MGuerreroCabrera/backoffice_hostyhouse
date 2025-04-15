import "./ForgotPassword.css";
import FieldLoginForm from "../FieldLoginForm/FieldLoginForm";
import Button from "../Button/Button";
import Form from "../Form/Form";
import CorporateImageForm from "../CorporateImageForm/CorporateImageForm";
import AuthFooter from "../AuthFooter/AuthFooter";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { forgotPwd } from "../../reducers/users/users.actions";
import { useContext } from "react";
import { UsersContext } from "../../providers/UsersProvider";
import Alert from "../Alert/Alert";
import { useState } from "react";

const ForgotPassword = () => {
  
  // Extraer register, handleSubmit y errors de useForm()
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Crear estado que controla si se ha solicitado ya el cambio de la contraseña
  const [ requested, setRequested ] = useState(false);

  // Rercoger el dispatch de UsersContext para poder pasarle el dispatch a la función login
  const { state, dispatch } = useContext(UsersContext);

  return (
      <div className="forgot-pwd-container">
        { state.requested ? ( 
          <div className="requested">
            <CorporateImageForm />
            <p>Hemos enviado un correo electrónico con un enlace para que puedas actualizar tu contraseña.</p>
            <p>Revisa tu bandeja de entrada</p>
            <Link to="/login" className="forgot-password-ln">Ir al inicio</Link>
          </div>  
          ) : (           
          <Form handleSubmit={ handleSubmit } submit={ (data) => forgotPwd(data, dispatch) } register={ register }>
          {Object.keys(errors).length > 0 && (
              <Alert type="error">{errors[Object.keys(errors)[0]].message}</Alert>
            )}
            <CorporateImageForm/>
            <div className="forgot-pwd-header">       
              <h2>Recuperar Contraseña</h2>
            </div>
            <FieldLoginForm type="text" ph="Correo electrónico" registerName="email"validations={{ required: { value: true, message: "Debes introducir una dirección de correo electrónico" }, pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Esta dirección de correo electrónico no es válida" } }}/>
            <Link to="/login" className="forgot-password-ln">Inicio de Sesión</Link>
            <Button textButton="Recuperar contraseña" type="submit"/>      
          </Form>
        )}
        <AuthFooter/>
      </div>
  )
}

export default ForgotPassword