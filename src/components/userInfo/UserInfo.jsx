import "./UserInfo.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../../reducers/users/users.actions";

const UserInfo = () => {

    const navigate = useNavigate();

    // Recoger el nombre del usuario del localStorage
    const userName = localStorage.getItem("hhUserName");

    return (
        <div className="user-info-container">
            <img src="icons/logout.png" alt="Cerrar sesión" title="Cerrar sesión" onClick={ () => logout(navigate) }/>
            <p>Usuario conectado: { userName }</p>
        </div>
    )
}

export default UserInfo