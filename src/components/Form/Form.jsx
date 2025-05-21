import { createContext } from "react";
import "./Form.css";

export const FormContext = createContext();

const Form = ({ children, handleSubmit, submit, register, errors }) => {

  //console.log("Errors en Form", errors);
  
  return (
    <form onSubmit={handleSubmit(submit)} className="login-form">
      <FormContext.Provider value={{register, errors}}>
        {children}
      </FormContext.Provider>
    </form>
  )
}

export default Form