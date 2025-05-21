import "./Users.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import AppFooter from "../../components/AppFooter/AppFooter";
import UsersList from "../../components/UsersList/UsersList";

const Users = () => {
  return (
    <div className="page-container">
      <Header />
      <Sidebar />
      <UsersList />
      <AppFooter />
    </div>
  )
}

export default Users