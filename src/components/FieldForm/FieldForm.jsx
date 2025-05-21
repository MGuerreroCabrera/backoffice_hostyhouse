import "./FieldForm.css";

const FieldForm = ({ type, ph = "" }) => {
  return (
    <input type={type} placeholder={ph} className="field-form"/>
  )
}

export default FieldForm