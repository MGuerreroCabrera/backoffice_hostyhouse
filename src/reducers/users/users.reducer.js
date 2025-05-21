// Definir estado inicial
export const INITIAL_USERS_STATE = {
    users: [],
    user: null,
    token: null,
    rol: null,
    error: null,
    loading: false,
    requested: false,
    // isModalOpen: false
}

// Crear función reductora
export const usersReducer = (state, action) => {
    switch (action.type) {
        // Activar el loading
        case "LOADING":
            return { ...state, error: null, loading: true }
        // Ha ocurrido un error
        case "ERROR":
            return { ...state, error: action.payload, loading: false }
        // Se ha hecho login satisfactoriamente
        case "LOGIN_SUCCESS":
            return { ...state, user: action.payload.data.name, token: action.payload.data.token, rol: action.payload.data.rol, loading: false }
        // La sesión se ha checkeado satisfactoriamente
        case "LOGIN_CHECKED":
            return { ...state, user: action.payload.user.name, token: action.payload.token }            
        // Cerrar sesión
        case "LOGOUT":
            return { ...state, user: null, token: null, error: null, loading: false }
        case "DELETE_LOADING":
            return { ...state, loading: false }
        case "REQUEST_RESET_PWD":
            return { ...state, user: null, token: action.payload, error: null, loading: false, requested: true }
        case "RESET_PWD":
            return { ...state, user: null, token: null, error: null, loading: false }
        case "SET_USERS":
            return { ...state, users: action.payload }      
        case "SET_ROL":
            return { ...state, rol: action.payload };
        default:
            return { ...state }
    }
}