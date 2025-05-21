// Estado inicial para los clientes
export const INITIAL_CUSTOMERS_STATE = {
    customers: []
}

// Reducer para los clientes
export const customersReducer = (state, action) => {
    switch (action.type) {
        case "SET_CUSTOMERS":
            return { ...state, customers: action.payload };
        default:
            return { ...state };
    }
}