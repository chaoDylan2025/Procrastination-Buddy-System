<script setup>
import { current_selected_img } from '../../code/image_functions.js'
import Content from './Content.vue'

const props = defineProps({
    open_change_image_dialog: Boolean
})

const emit = defineEmits(['close'])
function exitDialogModal(){
    emit('close', false)
}
</script>

<template>
    <v-app>
        <v-dialog
        v-model="props.open_change_image_dialog"
        height="800"
        width="800">
            <v-card>
                <v-card-item>
                    <v-col class="d-flex justify-space-between">
                        <div>
                            <v-btn
                            @click="current_selected_img = -1, exitDialogModal()"
                            icon="$close"
                            size="medium"
                            variant="text"
                            >
                            </v-btn>
                        </div>
                        <div>
                            <v-btn>
                                <span>
                                    Confirm
                                </span>
                            </v-btn>
                        </div>
                    </v-col>    
                </v-card-item>

                <v-container>
                    <Content :show_change_button="props.open_change_image_dialog" :show_all_images="props.open_change_image_dialog"/>
                </v-container> 
            </v-card>
        </v-dialog>
    </v-app>
</template>