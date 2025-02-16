import "./CustomersList.css";
import { useState } from "react";
import Paginator from "../Paginator/Paginator";
import { useEffect } from "react";
import { API } from "../../utils/API/API";
import Loading from "../Loading/Loading";
import { downloadCustomersList, fetchCustomers } from "../../reducers/customers/customers.actions";

const CustormersList = () => {
    // Estado para almacenar las características de las viviendas
    const [customers, setCustomers] = useState([]);

    // Estado para el loading
    const [loading, setLoading] = useState(true);

    // Estado para controlar las páginas de resultados
    const [page, setPage] = useState(1);

    // Estado para controlar el total de páginas
    const [totalPages, setTotalPages] = useState(1);

    // Estado para controlar el error de la consulta
    const [error, setError] = useState(null);

    // Estado para mensaje resultado OK
    const [opOk, setOpOK] = useState(false);    

    // Estado para controlar la visibilidad del Alert
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        fetchCustomers(setLoading, setError, setCustomers, setTotalPages, page);
    }, [page]);

    return (
        <section className="data-container">
            <header className="ttle-btn-add-row">
                <h2 className="section-title">Listado de clientes</h2>
                <button className="btn-add-record" onClick={ () => { downloadCustomersList(setLoading, setError, setCustomers, customers) } }>Descargar listado</button>
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
            {showAlert && error && <Alert type="error" onClose={ () => { closeAlert(setShowAlert, setError) } }>{ error }</Alert>}
            {customers.map((customer) => (
                <ul className="customer-row" key={customer._id}>
                    <li>{ customer.name }</li>
                    <li>{ customer.lastName }</li>
                    <li>{ customer.email }</li>
                    <li>{ customer.phoneNumber }</li>
                    <li><img src="icons/delete.png" alt="Eliminar elemento" title="Eliminar elemento" style={{ width: "15px" }} /></li>
                </ul>
            ))}
            <Paginator page={ page } totalPages={ totalPages } setPage={ setPage } />
        </section>
    )
}

export default CustormersList