import { ref } from 'vue'
import AuthenticationService from '../../services/AuthenticationService'
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

export function viewButtonEvnt(image, openImage){
    imageToBeViewed.value = image
    return openImage == false ? true : false
}

export function displayConfirmButtonEvnt(index, selected_img){
    current_selected_img.value = index
    // Unselects the image that user just clicked
    if(selected_img.selected){
        unselect_image(selected_img)
        display_confirm_btn.value = false
    }
    else{
        selected_img.selected = true
        display_confirm_btn.value = true
        selected_img.styling = "selected"
    }

    // Unselects the previous selected image
    if(selected_img_index.value != -1){
        unselect_image(motivational_imgs.value[selected_img_index.value])
    }
    selected_img_index.value = index
}

export function unselect_image(selected_img){
    selected_img.selected = false
    selected_img.styling = ""
}

// Close event for the Image Changing dialog
export function closeImageChangingDialog(state){
    change_image.value = -1
    return false
}

// Displays buttons based on modifications made to images or/and layout
export function checkUpdatedStatus(){
    if(is_images_and_layout_updated.value[0] || is_images_and_layout_updated.value[1]){
        condition_for_displaying_buttons.value = true
    }
    else{
        condition_for_displaying_buttons.value = false
    }
}

export async function setImagesAndLayout(){
    const result = await AuthenticationService.settingImagesAndImageLayout({image_layout: current_img_layout.value, images: current_imgs.value})
    return result.data.status
}