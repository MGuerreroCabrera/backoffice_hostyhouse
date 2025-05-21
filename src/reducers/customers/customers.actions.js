import { API } from "../../utils/API/API";

// Función que llama a la API para listar los registros
export const fetchCustomers = async(page, globalDispatch, customersDispatch) => {
    try {

        globalDispatch({ type: "LOADING" });
        const limit = 10;

        const { error, response } = await API({ endpoint: `/customers?page=${page}&limit${limit}` });

        const totalRecords = response.totalRecords;

        if(error) {            
            globalDispatch({ type: "SET_ERROR", payload: error.message });
            globalDispatch({ type: "STOP_LOADING" });
        } 
        customersDispatch({ type: "SET_CUSTOMERS", payload: response.records });
        globalDispatch({ type: "STOP_LOADING" });
        const totalPages = Math.ceil(totalRecords / limit);
        globalDispatch({ type: "SET_TOTAL_PAGES", payload: totalPages });
    } catch (error) {
        globalDispatch({ type: "STOP_LOADING" });
        globalDispatch({ type: "SET_ERROR", payload: error.message });
    }
}

// Función que hace una llamada a la API y genera un documento.css que se descarga automáticamente
export const downloadCustomersList = (customers) => {
    // Convertir los datos a CSV
    const csvContent = "data:text/csv;charset=utf-8,"
    + "Nombre,Apellidos,Email,Teléfono,Fecha de creación\n" // Encabezados del archivo
    + customers.map((customer) => 
    `${customer.name},${customer.lastName},${customer.email},${customer.phoneNumber},${customer.createdAt}`).join("\n");

    // Crear enlace y descargar el archivo
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "listado_clientes.csv");
    // Añadir enlace al DOM ( Requerido en Firefox )
    document.body.appendChild(link);

    // Simular el click al enlace
    link.click();

    // Eliminar el enlace del DOM
    document.body.removeChild(link);
}

// Función que elimina un cliente
export const deleteCustomer = async(id, globalDispatch, customersDispatch, customers) => {
    try {
        // Poner el loading a true
        globalDispatch({ type: "LOADING" });

        // Llamar a la API con el id del cliente a eliminar
        const { error } = await API({ endpoint: `/customers/${id}`, method: "DELETE" });

        if(error) {
            // Poner loading a false
            globalDispatch({ type: "STOP_LOADING" });
            // Cambiar estado Error
            globalDispatch({ type: "SET_ERROR", payload: error.message });
        } else {
            // Poner estado loading a false
            globalDispatch({ type: "STOP_LOADING" });
            // Eliminar el registro eliminado del listado de pantalla
            const newCustomers = customers.filter(customer => customer._id !== id);
            customersDispatch({ type: "SET_CUSTOMERS", payload: newCustomers });
            // Indicar que la operación ha ido bien
            globalDispatch({ type: "OP_OK" });
        }

    } catch (error) {
        // Poner el loading a false
        globalDispatch({ type: "STOP_LOADING" });
        // Poner el estado error con el err.message
        globalDispatch({ type: "SET_ERROR", payload: error.message });
    }
}