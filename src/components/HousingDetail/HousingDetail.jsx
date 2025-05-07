import "./HousingDetail.css";
import { closeModal } from "../../reducers/housings/housings.actions";

const HousingDetail = ({ housingsState, housingsDispatch }) => {

    console.log("housingsState en detalle: ", housingsState);
    console.log("housingId en detalle: ", housingsState.housingId);
    console.log("housing en detalle: ", housingsState.housings.find(house => house._id === housingsState.housingId));
    const housing = housingsState.housings.find(house => house._id === housingsState.housingId);
    if(!housing) {
        return <p>Casa no encontrada</p>;        
    }
    console.log("Nombre: ", housing.name); //return;

    return (
        <div className="data-container" onClick={(e) => e.stopPropagation()}>
            <header className="housing-detail">
                <h1>Detalle de la vivienda</h1>
                <img src="/icons/close.png" alt="Cerrar ventana" title="Cerrar" className="close-modal" onClick={ () => { closeModal(housingsDispatch) } } />
            </header>
            <main>
                <p className="xxl-title">{ housing.name }</p>
                <h3>Descripción de la vivienda</h3>
                <p>{ housing.description }</p>
                <div>
                    <h3>Ubicación</h3>
                    <p>{ housing.location }</p>
                </div>
                <div>
                    <h3>Precio noche</h3>
                    <p>{ housing.price }€ precio / Noche</p>
                </div>
                <h3>Servicios y comodidades</h3>
                <div className="features-container">
                    { housing.features && housing.features.length > 0 ? (
                        housing.features.map(feature => {
                            return (
                                <div key={ feature._id } className="feature-container">
                                    <p>{ feature.name }</p>
                                    <div className="feature-data">
                                        <img src={ feature.icon } alt={ feature.name } />
                                        <p>{ feature.value }</p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>No hay servicios disponibles.</p>
                    ) }
                </div>
                {/* Imágenes de la vivienda */}
                <h3>Imágenes de la vivienda</h3>
                <div className="images-container">
                    { housing.images && housing.images.length > 0 ? (
                        housing.images.map(image => (
                            <div className="image-preview" key={ image._id }>
                                <img src={image.url} alt={image.alt} className="housing-img" />
                            </div>
                        ))
                    ) : (
                        <p>No hay imágenes disponibles.</p>
                    ) }
                </div>
                <button className="btn-1">Editar</button>
            </main>
        </div>
    )
}

export default HousingDetail