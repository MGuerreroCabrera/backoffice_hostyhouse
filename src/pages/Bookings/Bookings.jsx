import "./Bookings.css";
import AppFooter from "../../components/AppFooter/AppFooter";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Bookings from "../../components/Bookings/Bookings";

const Rservations = () => {
  return (
    <div className="page-container">    
      <Header />  
      <Sidebar />
      <Bookings />
      <AppFooter />
    </div>
  )
}

export default Rservations