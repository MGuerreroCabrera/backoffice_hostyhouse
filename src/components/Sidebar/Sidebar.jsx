import { useState } from "react";
import "./Sidebar.css";
import { SidebarData } from "../../data/data";

const Sidebar = () => {

  // Estado para controlar si el menú está desplegado o no
  const [isOpen, setIsOpen] = useState(false);

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
            <li key={ index }>
              <img src={ item.icon } alt={ item.title } />
              <span>{ item.title }</span>
            </li>
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
