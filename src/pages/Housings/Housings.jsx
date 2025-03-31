import "./Housings.css";
import AppFooter from "../../components/AppFooter/AppFooter";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import HousingsList from "../../components/HousingsList/HousingsList";

const Housings = () => {
  return (
    <>
      <div className="page-container">
        <Header />
        <Sidebar />
        <HousingsList />
        <AppFooter />
      </div>
    </>
  )
}

export default Housings