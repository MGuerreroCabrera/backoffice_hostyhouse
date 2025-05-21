import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ iconUrl, alt, title, path, children }) => {
    return (
        <div className="card">            
            <Link to={path}>
                <div className="card-header">
                    <img src={ iconUrl } alt={alt} />
                    <h3>{ title }</h3>
                </div>
                <div className="card-body">
                    { children }
                </div>
            </Link>
        </div>
  )
}

export default Card