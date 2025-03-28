import "./Alert.css";
import { useEffect } from "react";

const Alert = ({ type, children, onClose }) => {
    useEffect(() => {
        // Muestra el mensaje de notificación durante 5 segs
        const timer = setTimeout(() => {
            onClose();
        }, 3000);


        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        // <div className={`alert-container glass ${type}`}>
        <div className={`alert-container ${type}`}>
            <p>{ children }</p>
        </div>
    );
}

export default Alert;