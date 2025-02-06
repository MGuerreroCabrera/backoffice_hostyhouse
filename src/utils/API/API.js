// Ruta básica de acceso a la API
const BASE_URL = "http://localhost:3000/api/v1";

// Función que permite crear y reutilizar peticiones al backend
export const API = async ({ endpoint, method = "GET", body, content_type }) => {
    // Inicializar valores de headers metiendo el Authorization para la función checkSession
    const headers = {
        "Authorization": `Bearer ${localStorage.getItem("hhToken")}`
    };
    
    if(content_type) {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(body)
    }
    
    try {
        const res = await fetch(BASE_URL + endpoint, { method, headers, body, content_type });       
        const response = await res.json();

        
        if(!res.ok) {
            return { error: response }
        } 
        return { response };

    } catch (error) {
        return error;
    }
};