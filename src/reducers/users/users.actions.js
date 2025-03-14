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
        localStorage.setItem("hhUserRol", response.data.rol);
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
    const { error } = await API({ endpoint: "/users/resetpassword", method: "PUT", body, content_type: true });

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
    localStorage.removeItem("hhUserRol");

    // Navegar al login
    navigate("/login");
}

// Función que llama a la API para obtener el listado de usuarios
export const fetchUsers = async (globalDispatch, usersDispatch, page) => {
    try {
        // Poner el loading a true
        globalDispatch({ type: "LOADING" });
        // Definir el límite de regisrtos por página
        const limit = 10;
        // Recoger el token del localStorage
        const token = localStorage.getItem("hhToken");
        // Llamada a la función API para obtener los registros
        const { error, response } = await API({ endpoint: `/users?page=${page}&limit=${limit}`, headers: { "Authorization": `Bearer ${token}` } });        

        // Lanzar la acción para rellenar los registros
        if(error) {
            globalDispatch({ type: "STOP_LOADING" });
            globalDispatch({ type: "SET_ERROR", payload: error.message });
        } else {
            usersDispatch({ type: "SET_USERS", payload: response.records });
            globalDispatch({ type: "STOP_LOADING" });
            const totalPages = Math.ceil(response.totalRecords / limit);
            globalDispatch({ type: "SET_TOTAL_PAGES", payload: totalPages });
        }

    } catch (error) {
        globalDispatch({ type: "STOP_LOADING" });
        globalDispatch({ type: "SET_ERROR", payload: error.message });
    }
}

// Función que abre el modal
export const openModal = (usersDispatch, reset) => { 
    usersDispatch({ type: "OPEN_MODAL" });
    reset(); 
};

// Función que cierra el modal
export const closeModal = (usersDispatch) => { usersDispatch({ type: "CLOSE_MODAL" }); };


// Función que permite crear un nuevo usuario
export const postUser = async (data, globalDispatch, usersDispatch, users) => {
    try {
        // Poner el loading a true
        globalDispatch({ type: "LOADING" });

        // Llamar a la función API con los datos        
        const { error, response } = await API({ endpoint: "/users/register", method: "POST", body: data, content_type: true });        

        if(error) {
            globalDispatch({ type: "STOP_LOADING" });
            globalDispatch({ type: "SET_ERROR", payload: error.message });
            globalDispatch({ type: "SHOW_ALERT" });
        } else {
            globalDispatch({ type: "STOP_LOADING" });
            globalDispatch({ type: "SET_ERROR", payload: null });
            globalDispatch({ type: "OP_OK" });
            globalDispatch({ type: "SHOW_ALERT" });
            // Añadir registro al array de registros siempre que en pantalla haya menos de 10 registros
            if(users.length < 10) {
                const newUser = { _id: response.data._id, name: response.data.name, email: response.data.email, password: response.data.password, rol: response.data.rol };
                const updatedUsers = [ ...users, newUser ];
                usersDispatch({ type: "SET_USERS", payload: updatedUsers });
            }
            usersDispatch({ type: "CLOSE_MODAL" });
            closeModal(usersDispatch);
        }
        
    } catch (error) {
        globalDispatch({ type: "STOP_LOADING" });
        globalDispatch({ type: "SET_ERROR", payload: error.message });
        globalDispatch({ type: "SHOW_ALERT" });
    }
}

// Función que permite actualizar un usuario

// Función que permite eliminar un usuario
export const deleteUser = async (id, globalDispatch, usersDispatch, users) => {
    globalDispatch({ type: "LOADING" })
    try {
        const { error } = await API({ endpoint: `/users/${id}`, method: "DELETE" });

        if (error) {
            globalDispatch({ type: "STOP_LOADING" });
            globalDispatch({ type: "SET_ERROR", payload: error.message });
            globalDispatch({ type: "SHOW_ALERT" });
        } else {
            globalDispatch({ type: "STOP_LOADING" });
            globalDispatch({ type: "SET_ERROR", payload: null });
            globalDispatch({ type: "OP_OK" });
            globalDispatch({ type: "SHOW_ALERT" });
            // Definir nuevo array de registros
            const newUsers = users.filter(user => user._id !== id);
            usersDispatch({ type: "SET_USERS", payload: newUsers });
        }

    } catch (error) {
        globalDispatch({ type: "STOP_LOADING" });
        globalDispatch({ type: "SET_ERROR", payload: error.message });
        globalDispatch({ type: "SHOW_ALERT" });
    }
}