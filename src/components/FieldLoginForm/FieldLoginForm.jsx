import { useState } from "react";
import "./FieldLoginForm.css";
import { useContext } from "react";
import { FormContext } from "../Form/Form";

const FieldLoginForm = ({ ph = "", type, registerName, validations }) => {
    // Estado para controlar el campo password ( visible - not visible )
    const [visible, setVisible] = useState(false);

    const { register, errors } = useContext(FormContext);

    // Controlar si hay error
    const hasError = errors && errors[registerName];
    
    return (
        <div className={`input-field ${hasError ? "error" : ""}`}>
            <input 
                type={type === "password" && visible ? "text" : type} 
                placeholder=""
                { ...register(registerName, validations) } 
            />
            <label>{ph}</label>
            { hasError && <span className="error-message">{ errors[registerName].message }</span> }
            { type === "password" && <img 
                src={visible ? "icons/eye-open.png" : "icons/eye-close.png"} 
                alt="Mostrar / Ocultar contraseña" 
                onClick={() => setVisible(!visible)}
                className="form-icon" /> }        
        </div>
    )
}

export default FieldLoginForm