import "./Header.css";
import CorporateImageForm from "../CorporateImageForm/CorporateImageForm";
import UserInfo from "../userInfo/userInfo";

const Header = () => {
  return (
    <div className="header-container">
        <CorporateImageForm />
        <UserInfo />
    </div>
  )
}

export default Header