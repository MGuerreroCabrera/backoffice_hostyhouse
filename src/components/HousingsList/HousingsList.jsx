import "./HousingsList.css";
import { useReducer } from 'react'
import { globalReducer, INITIAL_GLOBAL_STATE } from '../../reducers/global/global.reducer'
import { housingsReducer, INITIAL_HOUSINGS_STATE } from '../../reducers/housings/housings.reducer';
import HousingModal from "../HousingModal/HousingModal";
import { useEffect } from "react";
import { fetchHousings, openModal } from "../../reducers/housings/housings.actions";
import { useState } from "react";

const HousingsList = () => {

    // Uso del hook useReducer ( globalReducer y housingsReducer )
    const [globalState, globalDispatch] = useReducer(globalReducer, INITIAL_GLOBAL_STATE);    
    const [housingsState, housingsDispatch] = useReducer(housingsReducer, INITIAL_HOUSINGS_STATE);

    const [isDataComplete, setIsDataComplete] = useState(false);

    // Desestructurizar las propiedades de los reducers
    // const { loading, page, totalPages, error, opOk, showAlert } = globalState;
    const { housings, isModalOpen } = housingsState;
    
    // useEffect para la llamada a la API
    useEffect(() => {
        if (!isModalOpen || isDataComplete)
        {
            // Llamada a la API para obtener los registros siempre que no esté abierto el modal
            if(!isModalOpen) {
                fetchHousings(globalDispatch, housingsDispatch);
                if (isDataComplete) {
                    setIsDataComplete(false);
                }
            }        
        }
    }, [isModalOpen, isDataComplete]);

    // console.log("En HousingsList: ", isDataComplete);

  return (
    <>
        <div className="data-container">
            <div className="ttle-btn-add-row">
                <h2 className="section-title">Viviendas</h2>
                <button className="btn-add-record" onClick={ () => openModal(housingsDispatch) }>+ Nuevo registro</button>
            </div>
            <div className="houses-container">
                { Array.isArray(housings) && housings.map((housing) => (
                    <article key={housing._id} className="house-card">
                        <header>
                            <img src={housing.images[0]?.url} alt={ housing.images[0]?.alt } ></img>
                        </header>
                        <h2>{ housing.name }</h2>
                        <div className="desc-row">
                            <p>{ housing.description?.substring(0, 150) + "..." }</p>
                        </div>
                        <div className="btn-row">
                            <button className="btn-card edit">
                                <img src="/icons/edit.png" className="btn-img" />
                                Editar
                            </button> 
                            <button className="btn-card delete">
                                <img src="/icons/delete.png" className="btn-img" />
                                Eliminar
                            </button> 
                            <button className="btn-card show">
                                <img src="/icons/turquoise-eye.png" className="btn-img" />
                                Ver
                            </button> 
                        </div>
                    </article>
                )) }
            </div>
        </div>
        {housingsState.isModalOpen && (
            <HousingModal 
            housingsDispatch={ housingsDispatch } 
            housingsState={ housingsState } 
            isDataComplete={ isDataComplete }
            setIsDataComplete={ setIsDataComplete } />            
        )}
    </>
  )
}

export default HousingsList