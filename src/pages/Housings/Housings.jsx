import "./Housings.css";
import AppFooter from "../../components/AppFooter/AppFooter";
import FormDataHousing from "../../components/FormDataHousing/FormDataHousing";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

const Housings = () => {
  return (
    <>
      <div className="page-container">
        <Header />
        <Sidebar />
        <FormDataHousing />
        <AppFooter />
      </div>
    </>
  )
}

export default Housings