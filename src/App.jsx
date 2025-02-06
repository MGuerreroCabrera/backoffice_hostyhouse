import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import { useEffect } from "react";
import Loading from "./components/Loading/Loading";
import { useContext } from "react";
import { UsersContext } from "./providers/UsersProvider";
import { checkSession } from "./reducers/users/users.actions";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Features from "./pages/Features/Features";
import Housings from "./pages/Housings/Housings";
import Reservations from "./pages/Reservations/Reservations";
import Customers from "./pages/Customers/Customers";
import Users from "./pages/Users/Users";

const App = () => {

  const navigate = useNavigate();
  
  // Recoger el estado para el loading
  // Hago destructuring de loadindg del state  
  const { state: { loading }, dispatch } = useContext(UsersContext); 

  // Comprobar si existe token para enviar al usuario a /login
  useEffect(() => {
    checkSession(dispatch, navigate);
  }, []);
  // if(!window.location.pathname === "/reset-password") {
    
  // }  

  return (
    <>
      { loading && <Loading/> }
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Auth/ >}/>
        <Route path="/forgot-password" element={<Auth />}/>
        <Route path="/reset-password" element={<ResetPassword />}/>
        <Route path="/features" element={<Features />}/>
        <Route path="/housings" element={<Housings />}/>
        <Route path="/reservations" element={<Reservations />}/>
        <Route path="/customers" element={<Customers />}/>
        <Route path="/users" element={<Users />}/>
        <Route path="*" element={<Home/>}/>
      </Routes>
    </>
  )
}

export default App