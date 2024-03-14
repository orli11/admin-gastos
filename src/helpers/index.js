export const formatearCantidad = (cantidad) => {
    return Number(cantidad).toLocaleString('es-MX', {
        style: 'currency',
        currency: 'MXN'
    })
}

export const generarId = () => {
    const fecha = Date.now().toString(36)
    const random =  Math.random().toString(36).substring(2)

    return random + fecha
}

export const formatearFecha = (fecha) => {
    const fechanueva = new Date(fecha)
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }
    return fechanueva.toLocaleDateString('es-ES', opciones)
}