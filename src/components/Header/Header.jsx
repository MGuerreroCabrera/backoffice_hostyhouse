import "./Header.css";
import CorporateImageForm from "../CorporateImageForm/CorporateImageForm";
import UserConnected from "../UserConnected/UserConnected";

const Header = () => {
  return (
    <div className="header-container">
        <CorporateImageForm />
        <UserConnected />
    </div>
  )
}

export default Header