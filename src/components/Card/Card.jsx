import "./Card.css";

const Card = ({ iconUrl, alt, title, children }) => {
    return (
        <div className="card">            
            <div className="card-header">
                <img src={ iconUrl } alt={alt} />
                <h3>{ title }</h3>
            </div>
            <div className="card-body">
                { children }
            </div>
        </div>
  )
}

export default Card