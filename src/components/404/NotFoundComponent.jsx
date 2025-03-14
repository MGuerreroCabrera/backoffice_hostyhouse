import "./NotFoundComponent.css";

const NotFoundComponent = () => {
  return (
    <div className="not-found-component-container">
        <div className="left">
        <p className="fhf-txt">404</p>
        </div>
        <div className="right">
          <img src="not-found.png" alt="not found" title="Page not found" />
          <p className="txt-not-found">¡¡ UPS !! ... Parece que la página no existe</p>
        </div>
    </div>
  )
}

export default NotFoundComponent