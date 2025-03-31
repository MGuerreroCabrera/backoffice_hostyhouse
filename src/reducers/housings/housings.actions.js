// Función que abre el modal
export const openModal = (housingsDispatch) => { housingsDispatch({ type: "OPEN_MODAL" }); }

// Función que cierra el modal
export const closeModal = (housingsDispatch) => { housingsDispatch({ type: "CLOSE_MODAL" }); }