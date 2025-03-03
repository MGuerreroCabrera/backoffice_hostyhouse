// Función para cerrar el Alert ( mensajes de resultados de las operaciones )
// export const closeAlert = (setShowAlert, setError) => {
//     setShowAlert(false);
//     setError(null);
// };
export const closeAlert = (globalDispatch) => {
    globalDispatch({ type: "CLOSE_ALERT" });
};