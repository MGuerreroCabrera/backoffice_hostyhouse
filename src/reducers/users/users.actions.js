import { API } from "../../utils/API/API";

// Crear función de Login
export const login = async (body, dispatch, navigate) => {

    // Inicializar loading
    dispatch({ type: "LOADING" });

    const { error, response } = await API({ endpoint: "/users/login", method: "POST", body, content_type: true });
    
    if(error) {
        dispatch({ type: "ERROR", payload: error.message });
    } else {
        dispatch({ type: "LOGIN_SUCCESS", payload: response });
        localStorage.setItem("hhToken", response.data.token); 
        localStorage.setItem("hhUserName", response.data.name);
        navigate("/");
    }
};

// Función que hace llamada a la API para enviar mail al usuario para resetear su contraseña
export const forgotPwd = async (body, dispatch) => {
    
    // Iniciar el loading
    dispatch({ type: "LOADING" });

    const { error, response } = await API({ endpoint: "/users/validatemail", method: "POST", body, content_type: true });    

    if (error) {
        dispatch({ type: "ERROR", payload: error.message });
    } else {
        dispatch({ type: "REQUEST_RESET_PWD", payload: response });
    }

}

// Función que hace llamada a la API para resertear la pwd
export const resetPwd = async (body, dispatch, navigate) => {
    
    // Iniciar el loading
    dispatch({ type: "LOADING" });

    // Control existe token de usuario a cambiar   
    const { error, response } = await API({ endpoint: "/users/resetpassword", method: "PUT", body, content_type: true });

    if(error) {
        localStorage.removeItem("tokenToReset");
        dispatch({ type: "ERROR", payload: error.message });
        navigate("/login");
    } else {
        alert("Contraseña cambiada con éxito");
        localStorage.removeItem("tokenToReset");
        dispatch({ type: "RESET_PWD"});
        navigate("/login");
    }

}

// Función que checkea si estás logueado con éxito
export const checkSession = async (dispatch, navigate) => {
    
    const pathName = window.location.pathname;

    // Verificar si el pathName comienza con "/reset-password"
    if (pathName.startsWith("/reset-password")) {
        const tokenPart = pathName.replace("/reset-password", "").trim();
        // Verificar si hay algo después de "/reset-password/"
        if (tokenPart.startsWith("/") && tokenPart.length > 1) {
            // Quitamos la / inicial del Token
            const cleanToken = tokenPart.slice(1);
            localStorage.setItem("tokenToReset", cleanToken);
            navigate("/reset-password");
        }else{
            dispatch({ type: "LOGOUT" });
            localStorage.removeItem("hhToken");
            navigate("/login");
        }
    } else {
        // Hacer la llamada a la API que controla si hay sesión iniciada
        const { error, response } = await API({ endpoint: "/users/checksession" });

        if(error) {
            dispatch({ type: "LOGOUT" });
            localStorage.removeItem("hhToken");
            navigate("/login");
        } else {
            dispatch({ type: "LOGIN_CHECKED", payload: response });
        }
    }
};

// Función que hace logout
export const logout = (navigate) => {
    // Eliminar el token y el nombre del usuario del localStorage
    localStorage.removeItem("hhToken");
    localStorage.removeItem("hhUserName");

    // Navegar al login
    navigate("/login");
}