import "./HousingForms.css";
import { useReducer } from "react";
import { featuresReducer, INITIAL_FEATURES_STATE } from "../../reducers/features/features.reducer";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { fetchAllFeatures } from "../../reducers/features/features.actions";
import { createHousing } from "../../reducers/housings/housings.actions";

const DataForm = ({ globalDispatch, housingsDispatch, setIsDataSubmitted }) => {
    // Configurar useForm
    const { register, handleSubmit, formState: { errors } } = useForm();

    // Sacar estados y dispatch necesarios
    const [ state, dispatch ] = useReducer(featuresReducer, INITIAL_FEATURES_STATE);

    useEffect(() => {
        const loadFeatures = async () => {
            await fetchAllFeatures(dispatch, globalDispatch);
        }
        loadFeatures();
    }, []);

    const onSubmit = async (data) => {
        // Construir el objeto de los datos a insertar
        const housingData = {
            name: data.name,
            location: data.location,
            description: data.description,
            features: state.features.map((feature) => ({
                feature: feature._id,
                value: data[feature._id] || ""
            })),
            price: data.price
        }
                
        // Crear el registro de la nueva vivenda
        await createHousing(housingData, housingsDispatch, globalDispatch);

        // Cambiar estado isDataSubmitted
        setIsDataSubmitted(true);
    }

    return (
        <>        
        <form name="data-housing" onSubmit={ handleSubmit(onSubmit) } className="data-housing-form" onClick={(e) => e.stopPropagation()}>
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
            <div className="form-row">
                <label htmlFor="price" className="input-label">Precio por noche</label>
                <input type="number" { ...register("price", { required: "El precio por noche es requerido" }) } className="input-text input-20" />
                { errors.price && <span>{ errors.price.message }</span> }                   
            </div>
            <div className="housing-features">
                <span style={{ borderRadius: "5px" }}>Características de la vivienda</span>
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
            <div className="form-row">
                <button type="submit" className="btn-1">Enviar</button>
            </div>
        </form>
        </>
  )
}

export default DataForm