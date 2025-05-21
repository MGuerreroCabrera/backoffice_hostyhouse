import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import FieldLoginForm from "../FieldLoginForm/FieldLoginForm";
import AuthFooter from "../AuthFooter/AuthFooter";
import Button from "../Button/Button";
import CorporateImageForm from "../CorporateImageForm/CorporateImageForm";
import Form from "../Form/Form";
import { useForm } from "react-hook-form";
import { login } from "../../reducers/users/users.actions";
import { useContext } from "react";
import { UsersContext } from "../../providers/UsersProvider";
import Alert from "../Alert/Alert";

const Login = () => {
  // Extraer register y handleSubmit de useForm()
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Obtener la función navigate de react-router-dom para ir a la home tras el login OK
  const navigate = useNavigate();

  // Rercoger el dispatch de UsersContext para poder pasarle el dispatch a la función login
  const { state, dispatch } = useContext(UsersContext);

  return (
   <div className="login-container">
      <Form handleSubmit={ handleSubmit } submit={(data) => login(data, dispatch, navigate)} register={ register }>
        {Object.keys(errors).length > 0 ? (
          <Alert type="error">{errors[Object.keys(errors)[0]].message}</Alert>
        ) : (
          state.error && <Alert type="error">{state.error}</Alert>
        )}
        <CorporateImageForm/>
        <div className="login-header">
          <h2>Inicio de Sesión</h2>
        </div>
        <FieldLoginForm type="email" ph="Correo electrónico" registerName="email" validations={{ required: { value: true, message: "El email es requerido" }, pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Email no válido" } }}/>
        <FieldLoginForm type="password" ph="Contraseña" registerName="password" validations={{ required: { value: true, message: "Campo requerido" } }}/>
        <Link to="/forgot-password" className="forgot-password-ln">Olvidé mi contraseña</Link>
        <Button textButton="Iniciar Sesión" type="submit"/>
    </Form>
    <AuthFooter/>
   </div>
  )
}

export default Login