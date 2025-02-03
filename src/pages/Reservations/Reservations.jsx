import AppFooter from "../../components/AppFooter/AppFooter";
import Header from "../../components/Header/Header";
import Reservations from "../../components/Reservations/Reservations";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Reservations.css";

const Rservations = () => {
  return (
    <div className="page-container">    
      <Header />  
      <Sidebar />
      <Reservations />
      <AppFooter />
    </div>
  )
}

export default Rservations