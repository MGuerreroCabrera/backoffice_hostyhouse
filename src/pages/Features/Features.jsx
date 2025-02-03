import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import FeaturesComponent from "../../components/Features/Features";
import "./Features.css";
import AppFooter from "../../components/AppFooter/AppFooter";

const Features = () => {
  return (
    <div className="page-container">
      <Header />
      <Sidebar />
      <FeaturesComponent />
      <AppFooter />
    </div>
  )
}

export default Features