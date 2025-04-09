import "./HousingForm.css";
import { useForm } from 'react-hook-form';
import { useReducer } from "react";
import { featuresReducer, INITIAL_FEATURES_STATE } from "../../reducers/features/features.reducer";
import { globalReducer, INITIAL_GLOBAL_STATE } from "../../reducers/global/global.reducer";
import { useEffect } from "react";
import { fetchAllFeatures } from "../../reducers/features/features.actions";
import { closeModal, createHousing } from "../../reducers/housings/housings.actions";
import Loading from "../Loading/Loading";
import Alert from "../Alert/Alert";
import { closeAlert } from "../../utils/closeAlert";

const HousingForm = ({ onClick, housingsDispatch, housingsState }) => {
    // Uso de useForm
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [ state, dispatch ] = useReducer(featuresReducer, INITIAL_FEATURES_STATE);
    const [ globalState, globalDispatch ] = useReducer(globalReducer, INITIAL_GLOBAL_STATE);    

    useEffect(() => {
        const loadFeatures = async() => {
            await fetchAllFeatures(dispatch, globalDispatch);
        };
        loadFeatures();
    }, []);

    const onSubmit = async (data) => {
        // Construir el objeto de datos
        const housingData = {
            name: data.name,
            location: data.location,
            description: data.description,
            features: state.features.map((feature) => ({ 
                feature: feature._id,
                value: data[feature._id] || ""
            }))
        };

        console.log("Datos a enviar: ", housingData); // Log de los datos

        // Llamar a la función createHousing con JSON
        await createHousing(housingData, housingsDispatch, globalDispatch);

        // Validar que se ha introducido el registro
        console.log("Estado de housings después de crear la vivienda: ", housingsState);
    }
    
    return (
        <section className="data-container" onClick={ onClick }>
            { globalState.loading && <Loading /> }
            { globalState.showAlert && <Alert type="error" onClose={ () => closeAlert(globalDispatch) } /> }
            { globalState.showAlert && opOk && <Alert type="success" onClose={ () => {closeAlert(globalDispatch)} } /> } 
            <h2>Nuevo registro</h2>
            <img src="/icons/close.png" alt="Cerrar ventana" title="Cerrar ventana" className="close-modal" onClick={ () => closeModal(housingsDispatch) }/>
            <form name="data-housing" onSubmit={ handleSubmit(onSubmit) } className="data-housing-form">
                <div className="form-row">
                    <label htmlFor="name" className="input-label">Nombre</label>
                    <input type="text" { ...register("name", { required: "El nombre de la vivienda es requerido" }) } className="input-text input-100" />
                    { errors.name && <span>{ errors.name.message }</span> }
                </div>
                <div className="form-row">
                    <label htmlFor="location" className="input-label">Ubicación</label>
                    <input type="text" { ...register("location", { required: "La ubicación de la vivienda es requerida" }) } className="input-text input-100" />
                    { errors.location && <span>{ errors.location.message }</span> }
                </div>
                <div className="form-row">
                    <label htmlFor="description" className="input-label">Descripción de la vivienda</label>
                    <textarea { ...register("description", { required: "La descripción es requerida" }) } className="description"></textarea>                    
                </div>
                {/* AQUÍ VAN LAS CARACTERÍSTICAS DE LAS VIVIENDAS */}
                <div className="housing-features">
                    <span>Características de la vivienda</span>
                    <div className="features-container">                        
                        {state.features && state.features.map((feature) => (
                            <div className="feature-div" key={feature._id} >
                                <span className="feature-title">{`¿${feature.name}?`}</span>
                                <div className="feature-box">
                                    <img src={feature.icon} alt={feature.name} className="feature-img"/>
                                    <input type="text" { ...register(feature._id) } className="feature-input" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* <div className="upload-row">
                    <label htmlFor="housing-images" className="upload-label">
                        <img src="/icons/upload.png" alt="Subir imágenes" className="upload-img" />      
                        <span className="input-label">Subir imágenes</span>                  
                    </label>                    
                    <input type="file" id="housing-images" { ...register("housingImages") } style={{ display: "none" }} />
                    <label htmlFor="imageAlt" className="input-label">Texto alternativo de la imagen</label> 
                    <input type="text" { ...register("imgAlt", { required: "El texto alternativo es requerido" }) } />
                    { errors.imageAlt && <span>{ errors.imageAlt.message }</span> }
                </div> */}
                <div className="form-row">
                    <button type="submit" className="btn-1">Enviar</button>
                </div>
            </form>
            </section>
    )
}

export default HousingForm