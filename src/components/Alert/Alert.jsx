import "./Alert.css";
import { useEffect } from "react";

const Alert = ({ type, children, onClose, globalDispatch }) => {
    useEffect(() => {
        // Muestra el mensaje de notificación durante 5 segs
        const timer = setTimeout(() => {
            onClose();
            globalDispatch({ type: "RESET_STATES" });
        }, 3000);


        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`alert-container ${type}`}>
            <p>{ children }</p>
        </div>
    );
}

export default Alert;