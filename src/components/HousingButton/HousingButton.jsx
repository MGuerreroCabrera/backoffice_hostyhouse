import "./HousingButton.css";
import { buttonData } from "../../data/button.info";

const HousingButton = ({ type, text }) => {

  const buttonConfiguration = buttonData(type); 
  
  return (
    <div className={ `general-button ${type.toLowerCase()}` }>
        {buttonConfiguration.imgSrc && <img src={ `/icons/${buttonConfiguration.imgSrc}` } alt={ type }  /> }
        <span>{ text }</span>
    </div>
  )
}

export default HousingButton