<script setup>
import { current_imgs, current_selected_img, change_image, display_confirm_btn, motivational_imgs } from '../../frontend-code/personal-motivational-page/image_functions.js'
import Content from './Content.vue'

const props = defineProps({
    open_change_image_dialog: Boolean
})

const emit = defineEmits(['close'])

function exitDialogModal(confirmed){
    // Replaces the current image with the new selected image
    if(confirmed){
        motivational_imgs.value[current_selected_img.value].selected = false
        motivational_imgs.value[current_selected_img.value].styling = ""
        current_imgs.value[change_image.value] = motivational_imgs.value[current_selected_img.value]
    }
    current_selected_img.value = -1
    display_confirm_btn.value = false
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
                            @click="exitDialogModal(false)"
                            icon="$close"
                            size="medium"
                            variant="text"
                            >
                            </v-btn>
                        </div>
                        <div v-if="display_confirm_btn">
                            <v-btn @click="exitDialogModal(true)">
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