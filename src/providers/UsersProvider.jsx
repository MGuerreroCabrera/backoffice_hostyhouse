import { useReducer } from "react";
import { createContext } from "react";
import { INITIAL_USERS_STATE, usersReducer } from "../reducers/users/users.reducer";

// Crear el contexto
export const UsersContext = createContext();

// Crear el proveedor
const UsersProvider = ({ children }) => {
    // Recoger el estado inicial y la función reductora del usersReducer
    const [ state, dispatch ] = useReducer(usersReducer, INITIAL_USERS_STATE);

    return <UsersContext.Provider value={{ state, dispatch }}>{ children }</UsersContext.Provider>
};

export default UsersProvider;