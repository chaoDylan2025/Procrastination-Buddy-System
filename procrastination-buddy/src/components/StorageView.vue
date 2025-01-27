<script setup>
const props = defineProps({
    open_storage_view: Boolean
})
const emit = defineEmits('close')

function exitDialogModal(){
    emit('close', false)
}
</script>

<template>
    <v-dialog
    v-model="props.open_storage_view"
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
                <div>
                    <p class="text-center text-h4"> Current Storage </p>
                </div>
            </v-card-item>
            
            

        </v-card>
        

    </v-dialog>

</template>