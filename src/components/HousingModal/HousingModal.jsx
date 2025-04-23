import "./HousingModal.css";
import { closeModal } from "../../reducers/housings/housings.actions";
import HousingForm from "../../components/HousingForm/HousingForm";
import HousingDetail from "../HousingDetail/HousingDetail";

const HousingModal = ({ housingsDispatch, housingsState, isDataComplete, setIsDataComplete, modalView, globalDispatch }) => {
  return (
    <>
      <div className="modal-overlay" onClick={ () => { closeModal(housingsDispatch) }}>
        {modalView === "form" ? (
          <HousingForm 
            housingsDispatch={ housingsDispatch } 
            onClick={ (e) => { e.stopPropagation(); } } 
            housingsState={ housingsState } 
            isDataComplete={ isDataComplete } 
            setIsDataComplete={ setIsDataComplete }
          />
        ) : (
          <HousingDetail 
          housingsState={ housingsState } 
          housingsDispatch = { housingsDispatch }
          />
        ) }
      </div>
    </>
  )
}

export default HousingModal