<script setup>
import { current_imgs, current_selected_img, change_image, display_confirm_btn, motivational_imgs } from '../../frontend-code/image_functions.js'
import { is_images_and_layout_updated, checkUpdatedStatus, original_user_motivational_images, unselect_image } from '../../frontend-code/image_events.js'
import Content from './Content.vue'

const props = defineProps({
    open_change_image_dialog: Boolean
})

const emit = defineEmits(['close'])

/**
 * Checks if any motivational images have been changed
 * 
 * If any images have been changed, display update button
 */
function is_images_different(){
    let num_imgs_different = 0

    for(let i = 0; i < current_imgs.value.length; i++){
        if(current_imgs.value[i].image != original_user_motivational_images.value[i].image){
            num_imgs_different ++
        }
    }
    if(num_imgs_different >= 1){
        is_images_and_layout_updated.value[0] = true
    }
    else{
        is_images_and_layout_updated.value[0] = false
    }
    checkUpdatedStatus()
}

/**
 * Exit dialog for changing images
 * 
 * @param confirmed - Replaces the current image with the new selected image
 */
function exitDialogModal(confirmed){
    if(confirmed){
        current_imgs.value[change_image.value] = motivational_imgs.value[current_selected_img.value]
    }

    is_images_different()
    
    if(current_selected_img.value != -1){
        unselect_image(motivational_imgs.value[current_selected_img.value])
        current_selected_img.value = -1
        display_confirm_btn.value = false
    }
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