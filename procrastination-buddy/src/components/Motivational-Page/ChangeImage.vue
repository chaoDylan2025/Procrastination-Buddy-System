<script setup>
import Content from './Content.vue'

const props = defineProps({
    open_change_image_dialog: Boolean
})

const emit = defineEmits('close')
function exitDialogModal(){
    emit('close', false)
}
</script>

<template>
    <v-app>
        <v-dialog
        v-model="props.open_change_image_dialog"
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
                    <Content :show_change_button="props.open_change_image_dialog" :show_all_images="props.open_change_image_dialog"/>
                </v-container> 
            </v-card>
        </v-dialog>
    </v-app>

</template>