import { ref } from 'vue'
import AuthenticationService from '../services/AuthenticationService'
import { change_image, current_selected_img, display_confirm_btn, motivational_imgs, selected_img_index, imageToBeViewed, current_imgs, current_img_layout } from './image_functions.js'

// Current motivational images
export var original_user_motivational_images = ref([])
// Current image layout
export var original_user_image_layout = ref(12)
// Confirms if images and layout have been updated or not
export var is_images_and_layout_updated = ref([false, false])
// Displays cancel and confirm buttons
export var condition_for_displaying_buttons = ref(false)

// Click events
export function changeButtonEvnt(index, open_change_image_dialog){
    change_image.value = index
    return open_change_image_dialog == false ? true : false
}

/**
 * Functionality for View Button
 * 
 * @param image - Selected image
 * @param openImage -  Opens selected image
 */
export function viewButtonEvnt(image, openImage){
    imageToBeViewed.value = image
    return openImage == false ? true : false
}

/**
 * Functionality for Confirm Button
 * 
 * @param index - Index of selected image 
 * @param selected_img - Selected motivational image
 */
export function displayConfirmButtonEvnt(index, selected_img){
    const prev_index = selected_img_index.value
    const prev_img = motivational_imgs.value[prev_index]

    // Unselects the image that user just clicked
    if(selected_img.selected){
        unselect_image(selected_img)
        selected_img_index.value = -1
        display_confirm_btn.value = false
    }
    else{
        // Unselect previously selected image (if any)
        if(prev_index != -1 && prev_img != selected_img){
            unselect_image(prev_img)
        }
        selected_img.selected = true
        selected_img.styling = "selected"
        selected_img_index.value = index
        current_selected_img.value = index
        display_confirm_btn.value = true
    }
}

/**
 * Unselects the selected motivational image
 * 
 * @param selected_img - Selected motivational image 
 */
export function unselect_image(selected_img){
    selected_img.selected = false
    selected_img.styling = ""
}

/**
 * Close event for the Image Changing dialog
 */
export function closeImageChangingDialog(){
    change_image.value = -1
    return false
}

/**
 * Displays buttons based on modifications made to images or/and layout
 */
export function checkUpdatedStatus(){
    if(is_images_and_layout_updated.value[0] || is_images_and_layout_updated.value[1]){
        condition_for_displaying_buttons.value = true
    }
    else{
        condition_for_displaying_buttons.value = false
    }
}

/**
 * Sets the new motivational images and image layout for current user
 */
export async function setImagesAndLayout(){
    const result = await AuthenticationService.settingImagesAndImageLayout({image_layout: current_img_layout.value, images: current_imgs.value})
    return result.data.status
}