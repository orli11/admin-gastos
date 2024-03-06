<script setup >
    import cerrarModal from '../assets/img/cerrar.svg'

    const emit = defineEmits(['ocultar-modal'])
</script>

<template>
    <div class="modal">
       <div class="cerrar-modal">
        <img 
            :src="cerrarModal" 
            alt="cerrar ventana modal"
            @click="$emit('ocultar-modal')"
        >
       </div> 
       <div class="contenedor">
            <form class="nuevo-gasto">
                <legend>Añadir gasto</legend>
                <div class="campo">
                    <label for="nombre">Nombre Gastos:</label>
                    <input 
                        type="text"
                        id="nombre"
                        placeholder="Añade el nombre del gasto."
                    >
                </div>

                <div class="campo">
                    <label for="cantidad">Cantidad:</label>
                    <input 
                        type="number"
                        id="cantidad"
                        placeholder="Añade la cantidad del gasto."
                    >
                </div>

                <div class="campo">
                    <label for="categoria">Categoría:</label>
                    <select 
                        id="categoria"
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input type="submit" value="Añadir Gastos">
            </form>
       </div>
    </div>
</template>

<style scoped>
.modal {
    position: absolute;
    background-color: rgb(0 0 0 / 0.9);
    top: 0;
    left: 0;
    right: 0;
    bottom:  0;
}
.cerrar-modal {
    position: absolute;
    right: 3rem;
    top: 3rem;
}
.cerrar-modal img {
    width: 3rem;
    cursor: pointer;
}

.nuevo-gasto {
    margin: 10rem auto 0 auto;
    display: grid;
    gap: 2rem;
}
.nuevo-gasto legend {
    text-align: center;
    color: var(--blanco);
    font-size: 3rem;
    font-weight: 700;
}
.nuevo-gasto input,
.nuevo-gasto select {
    background-color: var(--gris-claro);
    border: none;
    border-radius: 1rem;
    padding: 1rem;
    font-size: 2.2rem;
}
.nuevo-gasto label {
    color: var(--blanco);
    font-size: 2.2rem;
}
.nuevo-gasto input[type="submit"] {
    background-color: var(--azul);
    color: var(--blanco);
    font-weight: 700;
    cursor: pointer;
}
.campo {
    display: grid;
    gap: 2rem;
}
</style>