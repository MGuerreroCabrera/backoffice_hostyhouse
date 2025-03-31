import "./HousingsList.css";
import { useReducer } from 'react'
import { globalReducer, INITIAL_GLOBAL_STATE } from '../../reducers/global/global.reducer'
import { housingsReducer, INITIAL_HOUSINGS_STATE } from '../../reducers/housings/housings.reducer';
import HousingModal from "../HousingModal/HousingModal";
import { useEffect } from "react";
import { openModal } from "../../reducers/housings/housings.actions";

const HousingsList = () => {

    // Uso del hook useReducer ( globalReducer y housingsReducer )
    const [globalState, globalDispatch] = useReducer(globalReducer, INITIAL_GLOBAL_STATE);
    const [housingsState, housingsDispatch] = useReducer(housingsReducer, INITIAL_HOUSINGS_STATE);

    // Desestructurizar las propiedades de los reducers
    const { loading, page, totalPages, error, opOk, showAlert } = globalState;
    const { housings, isModalOpen } = housingsState;
    // useEffect para la llamada a la API
    useEffect(() => {
        // Llamada a la API para obtener los registros
    }, [page]);



  return (
    <>
        <div className="data-container">
            <div className="ttle-btn-add-row">
                <h2 className="section-title">Viviendas</h2>
                <button className="btn-add-record" onClick={ () => openModal(housingsDispatch) }>+ Nuevo registro</button>
            </div>
        </div>
        {housingsState.isModalOpen && (
            <HousingModal housingsDispatch={ housingsDispatch } globalDispatch={ globalDispatch } />            
        )}
    </>
  )
}

export default HousingsList