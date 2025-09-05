<script setup>
const props = defineProps({
    image: String,
    open_image: Boolean,
})

const emit = defineEmits(['close'])

/**
 * Exit dialog for viewing full motivational image
 */
function exitDialogModal(){
    emit('close', false)
}
</script>

<template>
    <v-dialog
    v-model="props.open_image"
    height="500"
    width="500"
    @click="exitDialogModal()">
        <v-img :src=props.image></v-img>
    </v-dialog>
</template>