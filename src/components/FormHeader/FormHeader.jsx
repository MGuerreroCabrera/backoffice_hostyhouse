import "./FormHeader.css";

const FormHeader = ({title, children = "" }) => {
  return (
    <div className="form-header-container">
        <h2>{title}</h2>
        {children}
    </div>
  )
}

export default FormHeader