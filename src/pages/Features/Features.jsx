import "./Features.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import FeaturesList from "../../components/FeaturesList/FeaturesList";
import AppFooter from "../../components/AppFooter/AppFooter";

const Features = () => {
  return (
    <div className="page-container">
      <Header />
      <Sidebar />
      <FeaturesList />
      <AppFooter />
    </div>
  )
}

export default Features