import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import CorporateImageForm from "../../components/CorporateImageForm/CorporateImageForm";
import "./ResetPassword.css";
import Alert from "../../components/Alert/Alert";
import { useContext } from "react";
import { UsersContext } from "../../providers/UsersProvider";
import { resetPwd } from "../../reducers/users/users.actions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form/Form";

const ResetPassword = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    // Estado para controlar mensaje de contraseñas no coincidentes
    const [ alertMessage, setAlertMessage ] = useState("");

    const navigate = useNavigate();

    const { dispatch } = useContext(UsersContext);

    const onSubmit = data => {     
        
        // Recoger el token generado
        const body = {
            token: localStorage.getItem("tokenToReset"),
            password: data.newpassword
        }

        // Control de que los campos contraseña coinciden
       if (data.newpassword === data.newpassword2) {
            resetPwd(body, dispatch, navigate);
            setAlertMessage("");
       } else {
            setAlertMessage("Las contraseñas no coinciden");
       }
    }

    return (        
        <div className="reset-password-container">
            <form onSubmit={ handleSubmit(onSubmit) }>
                <CorporateImageForm/>
                <h2>Cambio de contraseña</h2>
                {alertMessage && <Alert type="error">{ alertMessage }</Alert>}
                {Object.keys(errors).length > 0 && (<Alert>{errors[Object.keys(errors)[0]].message}</Alert>)}
                { errors.newpassword ? <label className="label-form-error">Este campo es obligatorio</label> :<label className="label-form">Introduce tu nueva contraseña</label> }
                <input className={`field-form ${errors.newpassword ? "field-form-error" : ""}`} type="password" { ...register("newpassword", { required:true, message: "Debes introducir una direción de correo electrónico registrada" }) }/>
                { errors.newpassword2 ? <label className="label-form-error">Este campo es obligatorio</label> : <label className="label-form">Repite la contraseña</label> }
                <input className={`field-form ${errors.newpassword2 ? "field-form-error" : ""}`} type="password" placeholder={errors.newpassword2 ? "Las contraseñas no coinciden" : "Repite la contraseña"}
                    { ...register("newpassword2", { 
                        required: true,
                        validate: value => value === watch('newpassword') || "Las contraseñas no coinciden"
                    }) }
                />
                <Button textButton="Actualizar contraseña" type="submit"/>
            </form>
        </div>
    )
}

export default ResetPassword