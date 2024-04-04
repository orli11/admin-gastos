<script setup >
    import { computed, ref } from 'vue'
    import Alerta from './Alerta.vue'
    import cerrarModal from '../assets/img/cerrar.svg'

    const error = ref('')
    const emit = defineEmits(['ocultar-modal', 'guardar-gasto', 'eliminar-gasto', 'update:nombre', 'update:cantidad', 'update:categoria'])
    const props = defineProps({
        modal: {
            type: Object,
            required: true
        },
        nombre: {
            type: String,
            required: true
        },
        cantidad: {
            type: [Number,String],
            required: true
        },
        categoria: {
            type: String,
            required: true
        },
        disponible: {
            type: Number,
            required: true
        },
        id: {
            type: [String, null],
            required: true
        }
    })

    const old = props.cantidad

    const agregarGasto = () => {
        // Validar que no haya campos vacíos 
       const { nombre, cantidad, categoria, disponible, id} = props
       if([nombre, cantidad, categoria].includes('')) {
            error.value = 'Todos los campos son obligatorios'

            setTimeout(() => {
                error.value = ''
            }, 3000)
            return 
       }
       // Validar que la cantidad sea mayor a cero
       if (cantidad <= 0) {
            error.value = 'Cantidad no valida'

            setTimeout(() => {
                error.value = ''
            }, 3000)
            return 
       }

       // Validar que lo disponible no exceda del presupuesto
       if(id) { //Validar un gasto que estamos editando
        //Tomar en cuenta el gasto ya realizado
            if ( cantidad > old + disponible ) {
                error.value = 'Excediste el presupuesto'
                setTimeout(() => {
                    error.value = ''
                }, 3000)
                return 
            }
       } else {
        if (cantidad > disponible) {
            error.value = 'Excediste el presupuesto'

            setTimeout(() => {
                error.value = ''
            }, 3000)
            return 
        }
       }
       emit('guardar-gasto')
        
    }

    const isEditing = computed(() => {
        return props.id
    })
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
       <div 
            class="contenedor contenedor-formulario"
            :class="[modal.animar ? 'animar' : 'cerrar']"
        >
            <form 
                class="nuevo-gasto"
                @submit.prevent="agregarGasto"
            >
                <legend>{{ id ? 'Guardar cambios' : 'Añadir gasto' }}</legend>

                <Alerta v-if="error">{{ error }}</Alerta>

                <div class="campo">
                    <label for="nombre">Nombre Gastos:</label>
                    <input 
                        type="text"
                        id="nombre"
                        placeholder="Añade el nombre del gasto."
                        :value="nombre"
                        @input="$emit('update:nombre',  $event.target.value)"
                    >
                </div>

                <div class="campo">
                    <label for="cantidad">Cantidad:</label>
                    <input 
                        type="number"
                        id="cantidad"
                        placeholder="Añade la cantidad del gasto."
                        :value="cantidad"
                        @input="$emit('update:cantidad',  +$event.target.value)"
                    >
                </div>

                <div class="campo">
                    <label for="categoria">Categoría:</label>
                    <select 
                        id="categoria"
                        :value="categoria"
                        @input="$emit('update:categoria',  $event.target.value)"
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

                <input type="submit" :value="[id ? 'Guardar cambios' : 'Añadir cambios']">
            </form>

            <button
                type="button"
                class="btn-eliminar"
                v-if="isEditing"
                @click="$emit('eliminar-gasto')"
            >
                Eliminiar gasto
            </button>
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
.contenedor-formulario {
    transition-property: all;
    transition-duration: 300ms;
    transition-timing-function: ease-in;
    opacity: 0;
}
.contenedor-formulario.animar {
    opacity: 1;
}
.contenedor-formulario.cerrar {
    opacity: 0;
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

.btn-eliminar {
    padding: 1rem;
    width: 100%;
    background-color: #ef4444;
    font-weight: 700;
    font-size: 1.2rem;
    color: var(--blanco);
    border: none;
    border-radius: 1rem;
    margin-top: 10rem;
    cursor: pointer;
}
</style>