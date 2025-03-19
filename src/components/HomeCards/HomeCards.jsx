import Card from "../Card/Card";
import "./HomeCards.css";

const HomeCards = () => {
  return (
    <div className="home-cards-container">
        {/* Card RESERVAS */}
        <Card iconUrl="icons/bookings.png" alt="bookings" title="Reservas" path="/bookings">
            <p>
                Gestiona el flujo de huéspedes y la disponibilidad de todas las viviendas.
            </p>
        </Card>
        {/* Card VIVIENDAS */}
        <Card iconUrl="icons/home.png" alt="housings" title="Viviendas" path="/housings">
            <p>
                Gestiona tu portafolio de viviendas de una manera rápida, eficiente y sencilla.
            </p>
        </Card>        
        {/* Card CLIENTES */}
        <Card iconUrl="icons/customers.png" alt="Clientes" title="Clientes" path="/customers">
            <p>
                Construye relaciones duraderas, no solo estancias de corta duración.
            </p>
        </Card>
        {/* Card CARACTERÍSTICAS DE VIVIENDAS */}
        <Card iconUrl="icons/features.png" alt="features" title="Características" path="/features">
            <p>
                Personaliza todas las características de las viviendas. Metros cuadrados, ¿Piscina disponible?, número de baños, número de habitaciones etc.
            </p>
        </Card>
        
    </div>
  )
}

export default HomeCards