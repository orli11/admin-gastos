<script setup>

    import { formatearCantidad, formatearFecha } from '../helpers/index'; 
    const props = defineProps({
        gasto: {
            type: Object,
            required: true
        }
    })
</script>

<template>
    <div class="gasto sombra">
        <div class="contenido">
            <div class="detalles">
                <p class="categoria">{{ gasto.categoria }}</p>
                <p class="nombre">{{  gasto.nombre }}</p>

                <p class="fecha">{{ formatearFecha(gasto.fecha) }}</p>
            </div>
        </div>

        <p>{{ formatearCantidad(gasto.cantidad) }}</p>
    </div>
</template>

<style scoped>

</style>