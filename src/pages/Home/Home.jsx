import AppFooter from "../../components/AppFooter/AppFooter";
import Header from "../../components/Header/Header";
import HomeCards from "../../components/HomeCards/HomeCards";
import HomeTop from "../../components/HomeTop/HomeTop";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <Sidebar />      
      <HomeTop />
      <HomeCards />
      <AppFooter />
    </div>
  )
}

export default Home