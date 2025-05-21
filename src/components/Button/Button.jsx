import "./Button.css";

const Button = ({ textButton, type = "button" }) => {
  return (
    <button className="button" type={type}>{textButton}</button>
  )
}

export default Button