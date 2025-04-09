import "./HousingModal.css";
import { closeModal } from "../../reducers/housings/housings.actions";
import HousingForm from "../../components/HousingForm/HousingForm";

const HousingModal = ({ housingsDispatch, housingsState }) => {
  return (
    <>
    <div className="modal-overlay" onClick={ () => { closeModal(housingsDispatch) }}>
        <HousingForm housingsDispatch={ housingsDispatch } onClick={ (e) => { e.stopPropagation(); } } housingsState={ housingsState }/>       
    </div>
    </>
  )
}

export default HousingModal