<script setup>
import AuthenticationService from '../../services/AuthenticationService'
import { userStore } from '../../stores/user'
import { ref, onMounted, watch } from 'vue'
import { change_image, current_selected_img, display_confirm_btn, current_imgs, motivational_imgs, selected_img_index } from '../../code/image_functions'
import ChangeImage from './ChangeImage.vue'
import Image from './Image.vue'

const props = defineProps({
    show_check_boxes: Boolean,
    show_change_button: Boolean,
    show_all_images: Boolean,
    show_download_button: Boolean,
})

// Pinia store
const user = userStore()

// Opens change image dialog
var open_change_image_dialog = ref(false) 

// Opens dialog to view full image
var openImage = ref(false)

// Image to view
var imageToBeViewed = ref('')

// Click events
function changeButtonEvnt(index){
    change_image.value = index
    open_change_image_dialog.value = true
}

function displayConfirmButtonEvnt(index, selected_img){
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

function viewButtonEvnt(image){
    imageToBeViewed.value = image
    openImage.value = true
}

// Close event for the Image Changing dialog
function closeImageChangingDialog(state){
    change_image.value = -1
    open_change_image_dialog.value = state
}
</script>

<template>
    <v-app class="pa-6">
        <!-- Current selected images -->
        <v-container class="mt-10">
            <v-row>
                <v-col v-if="!show_all_images" v-for="(img, i) in current_imgs"
                        :key="i"
                        :value="img"
                        :cols="user.imageLayout"
                >
                    <v-row class="mt-4 justify-center">
                        <img :src=img.image height="200px"></img>    
                    </v-row>
                    <v-row v-if="show_change_button == true">
                        <v-spacer></v-spacer>
                        <div v-if="show_change_button == true" class="mt-5 mb-8">
                            <v-btn @click="changeButtonEvnt(i)">
                                Change
                            </v-btn>
                        </div>
                        <v-spacer></v-spacer>
                    </v-row>
                </v-col>

                <!-- Displays all available images -->
                <v-col v-if="show_all_images" v-for="(img, i) in motivational_imgs"
                        :key="i"
                        :value="img"
                        cols="12"
                >
                    <v-row class="justify-center mb-12">
                        <img :src=img.image height="200px" :class="img.styling" @click="displayConfirmButtonEvnt(i, img)"></img>    
                    </v-row>
                    <v-row class="mt-5 mb-8">
                        <v-spacer></v-spacer>
                        <v-btn size="x-small" @click="viewButtonEvnt(img.image)">
                            View
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-row>
                </v-col>
                <ChangeImage :open_change_image_dialog="open_change_image_dialog" @close="(state) => closeImageChangingDialog(state)"/>
                <Image :image="imageToBeViewed" :open_image="openImage" @close="(state) => openImage = state"/>
            </v-row>
        </v-container>
    </v-app>
</template>

<style scoped>
.selected {
  outline: 3px solid #2196F3;
  outline-offset: -2px;
  border-radius: 4px;
}
</style>