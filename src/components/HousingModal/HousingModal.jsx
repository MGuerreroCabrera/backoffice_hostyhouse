import "./HousingModal.css";
import { closeModal } from "../../reducers/housings/housings.actions";
import HousingForm from "../../components/HousingForm/HousingForm";
import HousingDetail from "../HousingDetail/HousingDetail";
import EditHousingForm from "../EditHousingForm/EditHousingForm";

const HousingModal = ({ housingsDispatch, housingsState, isDataComplete, setIsDataComplete, modalView, globalDispatch, globalState, closeModal }) => {
  return (
    <>
      <div className="modal-overlay" onClick={ (e) => { 
        if(e.target === e.currentTarget) {
          closeModal(housingsDispatch); 
        }
        }}>
        {modalView === "form" ? (
          <HousingForm 
            housingsDispatch = { housingsDispatch } 
            onClick = { (e) => { e.stopPropagation(); } } 
            housingsState = { housingsState } 
            isDataComplete = { isDataComplete } 
            setIsDataComplete = { setIsDataComplete }
            closeModal = { closeModal }
          />
        ) : modalView === "detail" ? (
          <HousingDetail 
          housingsState = { housingsState } 
          globalDispatch = { globalDispatch }
          housingsDispatch = { housingsDispatch }
          closeModal = { closeModal }
          />
        ) : modalView === "edit" ? (
          <EditHousingForm 
            housingsState = { housingsState }
            housingsDispatch = { housingsDispatch }
            globalDispatch = { globalDispatch }
            globalState = { globalState }
            closeModal = { closeModal }
          />
        ) : "" }
      </div>
    </>
  )
}

export default HousingModal