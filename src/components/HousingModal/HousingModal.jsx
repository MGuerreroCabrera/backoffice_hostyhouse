import "./HousingModal.css";
import { closeModal } from "../../reducers/housings/housings.actions";
import HousingForm from "../../components/HousingForm/HousingForm";

const HousingModal = ({ housingsDispatch, globalDispatch }) => {
  return (
    <>
    <div className="modal-overlay" onClick={ () => { console.log("Estoy haciendo click en el overlay"); closeModal(housingsDispatch) }}>
        <HousingForm onClick={ (e) => { e.stopPropagation(); console.log("Click dentro del formulario"); } } />       
    </div>
    </>
  )
}

export default HousingModal