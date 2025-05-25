import { change_image, current_selected_img, display_confirm_btn, motivational_imgs, selected_img_index, imageToBeViewed } from './image_functions.js'

// Click events
export function changeButtonEvnt(index, open_change_image_dialog){
    change_image.value = index
    console.log(open_change_image_dialog)
    return open_change_image_dialog == false ? true : false
}

export function viewButtonEvnt(image, openImage){
    imageToBeViewed.value = image
    console.log("imageToBeViewed.value = ", imageToBeViewed.value)
    return openImage == false ? true : false
}

export function displayConfirmButtonEvnt(index, selected_img){
    current_selected_img.value = index
    // Unselects the image that user just clicked
    if(selected_img.selected){
        selected_img.selected = false
        display_confirm_btn.value = false
        selected_img.styling = ""
    }
    else{
        selected_img.selected = true
        display_confirm_btn.value = true
        selected_img.styling = "selected"
    }

    // Unselects the previous selected image
    if(selected_img_index.value != -1){
        motivational_imgs.value[selected_img_index.value].selected = false
        motivational_imgs.value[selected_img_index.value].styling = ""
    }
    selected_img_index.value = index
}

// Close event for the Image Changing dialog
export function closeImageChangingDialog(state){
    change_image.value = -1
    return false
}