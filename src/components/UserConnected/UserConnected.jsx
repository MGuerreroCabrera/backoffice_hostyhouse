import "./UserConnected.css";
import { logout } from "../../reducers/users/users.actions";
import { useNavigate } from 'react-router-dom';

const UserConnected = () => {
    const navigate = useNavigate();

    // Recoger el nombre del usuario del localStorage
    const userName = localStorage.getItem("hhUserName");

    return (
        <div className="user-connected-container">
            <img src="icons/logout.png" alt="Cerrar sesión" title="Cerrar sesión" onClick={ () => logout(navigate) }/>
            <p>Usuario conectado: { userName }</p>
        </div>
    )
}

export default UserConnected