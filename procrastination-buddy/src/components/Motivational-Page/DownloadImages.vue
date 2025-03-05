<script setup>
import Content from './Content.vue'

const props = defineProps({
    open_download_images_dialog: Boolean,
})

const emit = defineEmits('close')
function exitDialogModal(){
    emit('close', false)
}

</script>
<template>
    <v-dialog
    v-model="props.open_download_images_dialog"
    height="800"
    width="1000">
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
                <Content :show_download_button="props.open_download_images_dialog"/>
            </v-container>
        </v-card>
    </v-dialog>
</template>