import "./FormDataHousing.css";
import { useForm } from 'react-hook-form';
import { useReducer } from "react";
import { featuresReducer, INITIAL_FEATURES_STATE } from "../../reducers/features/features.reducer";
import { globalReducer, INITIAL_GLOBAL_STATE } from "../../reducers/global/global.reducer";
import { useEffect } from "react";
import { fetchAllFeatures } from "../../reducers/features/features.actions";

const FormDataHousing = () => {
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

    const onSubmit = (data) => {
        console.log(data);

        const formData = new FormData();

        // Añadir los campos al formData
        formData.append("name", data.name);
        formData.append("location", data.location);
        formData.append("description", data.description);

        // Construir el array de las características de la vivienda
        const housingFeatures = state.features.map((feature) => ({ 
            feature: feature._id,
            value: data[feature._id] || ""
         }));

        // Añadir a formData el array de las características
        formData.append("features", JSON.stringify(housingFeatures));

        console.log("FormData: ", {
            name: data.name,
            location: data.location,
            description: data.description,
            features: housingFeatures
        });

    }
    
    return (
        <section className="data-container">
            <h2>Nuevo registro</h2>
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
                <div className="form-row-100">
                    <label htmlFor="description" className="input-label">Descripción de la vivienda</label>
                    <textarea { ...register("description", { required: "La descripción es requerida" }) } className="description"></textarea>                    
                </div>
                {/* AQUÍ VAN LAS CARACTERÍSTICAS DE LAS VIVIENDAS */}
                <div className="housing-features">
                    <span>Características de la vivienda</span>
                    <div className="features-container">
                        {state.features && state.features.map((feature) => (
                            <div key={feature._id} className="feature-div">
                                <img src={feature.icon} alt={feature.name} className="feature-img"/>
                                <input type="text" { ...register(feature._id) } className="feature-input" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="upload-row">
                    <label htmlFor="housing-images" className="upload-label">
                        <img src="/icons/upload.png" alt="Subir imágenes" className="upload-img" />      
                        <span className="input-label">Subir imágenes</span>                  
                    </label>
                    <input type="file" id="housing-images" { ...register("housingImages") } style={{ display: "none" }} multiple />
                </div>
                <div className="form-row-100">
                    <button type="submit" className="btn-1">Enviar</button>
                </div>
            </form>
            </section>
    )
}

export default FormDataHousing