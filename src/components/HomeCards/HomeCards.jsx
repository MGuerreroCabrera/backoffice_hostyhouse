import Card from "../Card/Card";
import "./HomeCards.css";

const HomeCards = () => {
  return (
    <div className="home-cards-container">
        {/* Card RESERVAS */}
        <Card iconUrl="icons/reservations.png" alt="reservations" title="Reservas">
            <p>
                Gestiona el flujo de huéspedes y la disponibilidad de todas las viviendas.
            </p>
        </Card>
        {/* Card VIVIENDAS */}
        <Card iconUrl="icons/housings.png" alt="housings" title="Viviendas">
            <p>
                Gestiona tu portafolio de viviendas de una manera rápida, eficiente y sencilla.
            </p>
        </Card>        
        {/* Card CLIENTES */}
        <Card iconUrl="icons/customers.png" alt="Clientes" title="Clientes">
            <p>
                Construye relaciones duraderas, no solo estancias de corta duración.
            </p>
        </Card>
        {/* Card CARACTERÍSTICAS DE VIVIENDAS */}
        <Card iconUrl="icons/features.png" alt="features" title="Características">
            <p>
                Personaliza todas las características de las viviendas. Metros cuadrados, ¿Piscina disponible?, número de baños, número de habitaciones etc.
            </p>
        </Card>
        
    </div>
  )
}

export default HomeCards