<script setup>

const props = defineProps({
    image: String,
    open_image: Boolean,
})

const emit = defineEmits('close')
function exitDialogModal(){
    emit('close', false)
}

</script>
<template>
    <v-dialog
    v-model="props.open_image"
    height="500"
    width="500">
        <v-card>
            <v-card-item>
                <v-btn
                    @click="exitDialogModal"
                    icon="$close"
                    size="medium"
                    variant="text"
                    >
                    </v-btn>
            </v-card-item>

            <v-container>
                <v-img :src=props.image></v-img>
            </v-container>
        </v-card>
    </v-dialog>
</template>