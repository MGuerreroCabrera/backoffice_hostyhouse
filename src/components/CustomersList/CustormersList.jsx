import "./CustomersList.css";
import Paginator from "../Paginator/Paginator";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import { downloadCustomersList, fetchCustomers, deleteCustomer } from "../../reducers/customers/customers.actions";
import { useReducer } from "react";
import { customersReducer, INITIAL_CUSTOMERS_STATE } from "../../reducers/customers/custormers.reducer";
import { globalReducer, INITIAL_GLOBAL_STATE } from "../../reducers/global/global.reducer";

const CustormersList = () => {

    // Uso del hook useReducer 
    const [globalState, globalDispatch] = useReducer(globalReducer, INITIAL_GLOBAL_STATE);
    const [customersState, customersDispatch] = useReducer(customersReducer, INITIAL_CUSTOMERS_STATE);

    // Desestructurizar propiedades de los reducers.
    const { loading, page, totalPages, error, showAlert } = globalState;
    const { customers } = customersState;
     

    useEffect(() => { 
        fetchCustomers(page, globalDispatch, customersDispatch);
    }, [page]);

    return (
        <section className="data-container">
            <header className="ttle-btn-add-row">
                <h2 className="section-title">Listado de clientes</h2>
                <button className="btn-add-record" onClick={ () => { downloadCustomersList(customers) } }>Descargar listado</button>
            </header>
            <div className="curtomers-header">
                <ul className="customers-columns">
                    <li>Nombre</li>
                    <li>Apellidos</li>
                    <li>Correo electrónico</li>
                    <li>Teléfono</li>
                    <li>Acciones</li>
                </ul>
            </div>
            {loading && <Loading />}
            {showAlert && error && <Alert type="error" onClose={ () => { globalDispatch({ type: "CLOSE_ALERT" }) } }>{ error }</Alert>}
            {customers.map((customer) => (
                <ul className="customer-row" key={customer._id}>
                    <li>{ customer.name }</li>
                    <li>{ customer.lastName }</li>
                    <li>{ customer.email }</li>
                    <li>{ customer.phoneNumber }</li>
                    <li><img src="icons/delete.png" alt="Eliminar elemento" title="Eliminar elemento" style={{ width: "15px", cursor: "pointer" }} onClick={ ()=> { deleteCustomer(customer._id, globalDispatch, customersDispatch, customers) }} /></li>
                </ul>
            ))}
            <Paginator page={ page } totalPages={ totalPages } globalDispatch={ globalDispatch } />
        </section>
    )
}

export default CustormersList