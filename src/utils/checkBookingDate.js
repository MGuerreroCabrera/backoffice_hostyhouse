import { API } from "./API/API";

export const checkBookingDate = async (checkIn, checkOut, housingId) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();

    // Validar que la fecha de salida es posterior a la fecha de entrada
    if(checkInDate >= checkOutDate) {
        return { isValid: false, message: "La fecha de entrada no puede ser posterior a la fecha de salida" };
    }

    // Validar que la reserva es de al menos dos días
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if(diffDays < 2) {
        return { isValid: false, message: "La estancia debe ser de al menos dos días" };        
    }

    // Validar que la fecha introducida es posterior al día de hoy
    if(checkInDate < today || checkOutDate < today) {
        return { isValid: false, message: "Las fechas de reserva no pueden ser anteriores al día de hoy" };
    }

    // Verificar la disponibilidad de la vivienda con los nuevos datos de reserva
    try {
        // Realizar la llamada a al API
        const { error, response } = await API({
            endpoint: "/bookings/check-availability",
            method: "POST",
            body: { checkIn, checkOut, housingId },
            content_type: true
        });

        // Validar que no haya error o que no haya disponibilidad
        if (error || !response.data.available) {
            return { isValid: false, message: "No hay disponibilidad para las fechas seleccionadas" };
        }

    } catch (error) {
        return { isValid: false, message: "Error al verificar la disponibilidad" };
    }

    // Si todo ha ido OK retornar isValid a true 
    return { isValid: true };
}