import "./HousingDetail.css";

import { useEffect } from "react";
import { fetchHousing } from "../../utils/fetchHousing";
import useModal from "../../Hooks/useModal";

const HousingDetail = ({ housingsState, globalDispatch, housingsDispatch, closeModal }) => {
    
    useEffect(() => {        
        fetchHousing(housingsState.housingId, globalDispatch, housingsDispatch);
    }, [housingsState.housingId]);

    
    const housing = housingsState.housing;

    return (
        <div className="data-container" onClick={(e) => e.stopPropagation()}>
            <header className="housing-detail">
                <h1>Detalle de la vivienda</h1>
                <img src="/icons/close.png" alt="Cerrar ventana" title="Cerrar" className="close-modal" onClick={ () => { closeModal() } } />
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
                                    <p>{ feature.feature.name }</p>
                                    <div className="feature-data">
                                        <img src={ feature.feature.icon } alt={ feature.feature.name } />
                                        <p>{ feature.value }</p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>No hay servicios disponibles.</p>
                    ) }
                </div>
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
                <button className="btn-1" onClick={ () => { closeModal() } }>Cerrar</button>
            </main>
        </div>
    )
}

export default HousingDetail