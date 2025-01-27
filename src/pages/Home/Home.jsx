import AppFooter from "../../components/AppFooter/AppFooter";
import Header from "../../components/Header/Header";
import Reservations from "../../components/Reservations/Reservations";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <Sidebar />      
      <Reservations />
      <AppFooter />
    </div>
  )
}

export default Home