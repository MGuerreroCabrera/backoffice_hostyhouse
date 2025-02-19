import { useState } from "react";
import "./Sidebar.css";
import { SidebarData } from "../../data/data";
import { Link } from "react-router-dom";

const Sidebar = () => {

  // Estado para controlar si el menú está desplegado o no
  const [isOpen, setIsOpen] = useState(false);

  // Variable para controlar las opciones del menú según el rol del usuario
  const rol = localStorage.getItem("hhUserRol");

  // Función para alternar el estado del menú
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <img src="icons/menu.png" alt="menu" className="menu-icon" onClick={ toggleSidebar } />
      <div className={ `sidebar ${isOpen ? "open" : ""}` }>
        <img src="icons/close.png" alt="close" className="close-icon" onClick={ toggleSidebar } />
        <ul>
          { SidebarData.map((item, index) => (
            // Condicional para comprobar si debe mostrar esa opción del menú
            (item.admin && rol !== "admin") ? null : (
            <li key={ index }>
              <Link to={ item.path } onClick={ toggleSidebar } className="nav-element-container">
                <img src={ item.icon } alt={ item.title } />
                <span>{ item.title }</span>
              </Link>
            </li>)
          )) }
        </ul>
      </div>
      {isOpen && (
        <div className="background" onClick={ toggleSidebar } />
      )}
    </>
  );
};

export default Sidebar;
