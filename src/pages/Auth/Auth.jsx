import Login from "../../components/Login/Login";
import ForgotPassword from "../../components/ForgotPassword/ForgotPassword";
import "./Auth.css";

const Auth = () => {
  return (
    <div className="auth-container">
      {window.location.pathname === "/login" ? <Login/> : <ForgotPassword/>}
    </div>
  )
}

export default Auth