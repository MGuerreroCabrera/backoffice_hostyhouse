// Función para cerrar el Alert ( mensajes de resultados de las operaciones )
export const closeAlert = (globalDispatch) => {
    globalDispatch({ type: "CLOSE_ALERT" });
};