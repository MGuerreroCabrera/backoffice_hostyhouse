import "./Customers.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import CustormersList from "../../components/CustomersList/CustormersList";
import AppFooter from "../../components/AppFooter/AppFooter";

const Customers = () => {
  return (
    <>
      <div className="page-container">      
      <Header />
      <Sidebar />
      <CustormersList />
      <AppFooter />
      </div>
    </>
  )
}

export default Customers