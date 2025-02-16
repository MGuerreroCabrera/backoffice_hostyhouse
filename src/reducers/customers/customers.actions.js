import { API } from "../../utils/API/API";

// Función que llama a la API para listar los registros
export const fetchCustomers = async (setLoading, setError, setCustomers, setTotalPages, page) => {
    try {
        console.log("Entro");

        setLoading(true);
        const limit = 10;

        const { error, response } = await API({ endpoint: `/customers?page=${page}&limit${limit}` });

        const totalRecords = response.totalRecords;

        if(error) {
            setError(error.message);
            setLoading(false);
        } 


        const data = response.records;
        
        setCustomers(data);
        setLoading(false);
        setTotalPages(Math.ceil(totalRecords / limit));        
    } catch (err) {
        setLoading(false);
        setError(err.message);
    }
}

// Función que hace una llamada a la API y genera un documento.css que se descarga automáticamente
export const downloadCustomersList = async(setLoading, setError, setCustomers, customers) => {
    try {

        setLoading(true);
        // Obtener el objeto error y response de la llamada a la función API
        const { error, response } = await API ({ endpoint: "/customers/downloadlist" });

        // Comprobar si existe el objeto error            
        if(error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        // Volcar los datos en el estado customers
        setCustomers(response.data);

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

        setLoading(false);
        
    } catch (err) {
        setError(err.message);
        setLoading(false);
    }
}