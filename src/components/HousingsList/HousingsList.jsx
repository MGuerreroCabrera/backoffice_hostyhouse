import "./HousingsList.css";
import { useReducer } from 'react'
import { globalReducer, INITIAL_GLOBAL_STATE } from '../../reducers/global/global.reducer'
import { housingsReducer, INITIAL_HOUSINGS_STATE } from '../../reducers/housings/housings.reducer';
import HousingModal from "../HousingModal/HousingModal";
import { useEffect } from "react";
import { fetchHousings, openModal, deleteHousing } from "../../reducers/housings/housings.actions";
import { useState } from "react";
import Loading from "../Loading/Loading";
import Alert from "../Alert/Alert";
import { closeAlert } from "../../utils/closeAlert";
import useModal from "../../Hooks/useModal";

const HousingsList = () => {

    // Uso del hook useReducer ( globalReducer y housingsReducer )
    const [globalState, globalDispatch] = useReducer(globalReducer, INITIAL_GLOBAL_STATE);    
    const [housingsState, housingsDispatch] = useReducer(housingsReducer, INITIAL_HOUSINGS_STATE);

    const [isDataComplete, setIsDataComplete] = useState(false);
    const [modalView, setModalView] = useState("form");

    // Uso del custom hook useModal para manejar los estados de apertura y cierre del Modal
    const { isModalOpen, openModal, closeModal } = useModal();

    // Desestructurizar las propiedades de los reducers
    const { housings } = housingsState;
    
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

    // Manejador del botón eliminar vivienda
    const handleDeleteHousing = async (id) => {
        await deleteHousing(id, globalDispatch, housings, housingsDispatch);
    }
    
  return (
    <>
        { globalState.opOk && <Alert type="success" onClose={ () => closeAlert(globalDispatch) } globalDispatch = { globalDispatch }>Operación realizada correctamente</Alert> }      
        { globalState.loading && <Loading /> }     
        { globalState.error && <Alert type="error" onClose={ handleCloseAlert }>{ globalState.error }</Alert> }
        <div className="data-container">
            <div className="ttle-btn-add-row">
                <h2 className="section-title">Viviendas</h2>
                {/* <button className="btn-add-record" onClick={ () => { setModalView("form"); openModal(housingsDispatch) } }>+ Nuevo registro</button> */}
                <button className="btn-add-record" onClick={ () => { setModalView("form"); openModal() } }>+ Nuevo registro</button>
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
                            {/* <button className="btn-card edit"  onClick={ () => { setModalView("edit"); openModal(housingsDispatch); housingsDispatch({ type: "SET_HOUSING_ID", payload: housing._id }) } }> */}
                            <button className="btn-card edit"  onClick={ () => { setModalView("edit"); openModal(); housingsDispatch({ type: "SET_HOUSING_ID", payload: housing._id }) } }>
                                <img src="/icons/edit.png" className="btn-img" />
                                Editar
                            </button> 
                            <button className="btn-card delete" onClick={ () => handleDeleteHousing(housing._id) }>
                                <img src="/icons/delete.png" className="btn-img" />
                                Eliminar
                            </button>                             
                            <button className="btn-card show" onClick={ () => { setModalView("detail"); openModal(); housingsDispatch({ type: "SET_HOUSING_ID", payload: housing._id }) } }>
                                <img src="/icons/turquoise-eye.png" className="btn-img" />
                                Ver
                            </button> 
                        </div>
                    </article>
                )) }
            </div>
        </div>
        {/* {housingsState.isModalOpen && ( */}
        {isModalOpen && (
            <HousingModal 
            housingsDispatch={ housingsDispatch } 
            housingsState={ housingsState } 
            isDataComplete={ isDataComplete }
            setIsDataComplete={ setIsDataComplete }
            modalView={ modalView }
            globalDispatch = { globalDispatch }
            globalState = { globalState }
            closeModal = { closeModal }
            />            
        )}
    </>
  )
}

export default HousingsList