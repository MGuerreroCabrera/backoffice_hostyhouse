import { useReducer } from "react";
import { globalReducer, INITIAL_GLOBAL_STATE } from "../../reducers/global/global.reducer";
import { useState } from "react";
import ImageForm from "../HousingForms/ImageForm";
import DataForm from "../HousingForms/DataForm";
import Loading from "../Loading/Loading";
import { closeAlert } from "../../utils/closeAlert";

const HousingForm = ({ housingsDispatch, housingsState, isDataComplete, setIsDataComplete, closeModal }) => {

    const [ globalState, globalDispatch ] = useReducer(globalReducer, INITIAL_GLOBAL_STATE);    

    // Desestructurizar estados globales
    const { loading, error, showAlert } = globalState;
    
    // Estados para manejar si se ha enviado el primer formulario y recoger el campo necesario para el segundo.
    const [ isDataSubmitted, setIsDataSubmitted ] = useState(false);
    
    return (
        <section className="data-container">
           { loading && <Loading /> }
           { showAlert && error && <Alert type="error" onClose={ () => { closeAlert(globalDispatch) } }>{ error }</Alert> }
            <h2>{ isDataSubmitted ? "Paso 2 de 2 - Subir imágenes" : "Paso 1 de 2 - Datos de la vivienda" }</h2>
            <img src="/icons/close.png" alt="Cerrar ventana" title="Cerrar ventana" className="close-modal" onClick={ () => closeModal() }/>
            { !isDataSubmitted ? (
                <DataForm 
                    globalDispatch = { globalDispatch }
                    housingsDispatch = { housingsDispatch } 
                    setIsDataSubmitted = { setIsDataSubmitted }
                />
            ) : (
                <ImageForm 
                    housingsState = { housingsState } 
                    globalDispatch = { globalDispatch }
                    closeModal = { () => closeModal() }
                    isDataComplete = { isDataComplete }
                    setIsDataComplete = { setIsDataComplete }
                />
            )}
        </section>
    )
}

export default HousingForm