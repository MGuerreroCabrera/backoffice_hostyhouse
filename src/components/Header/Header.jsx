import "./Header.css";
import CorporateImageForm from "../CorporateImageForm/CorporateImageForm";
import UserInfo from "../UserInfo/UserInfo";

const Header = () => {
  return (
    <div className="header-container">
        <CorporateImageForm />
        <UserInfo />
    </div>
  )
}

export default Header