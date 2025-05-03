<script setup>
import AuthenticationService from '../../services/AuthenticationService'
import { userStore } from '../../stores/user'
import { ref, onMounted, watch } from 'vue'
import { current_imgs, current_selected_img, motivational_imgs } from '../../code/image_functions'
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

// Contains current images
var current_images_arr = ref([])

onMounted(() => {
    current_images_arr.value = motivational_imgs.value
})
</script>

<template>
    <v-app class="pa-6">
        <!-- Current selected images -->
        <v-container class="mt-10">
            <v-row>
                <v-col v-if="!show_all_images" v-for="(image, i) in current_imgs"
                        :key="i"
                        :value="image"
                        :cols="user.imageLayout"
                >
                    <v-row class="justify-center">
                        <img :src=image height="200px"></img>    
                    </v-row>
                    <v-row v-if="show_change_button == true">
                        <v-spacer></v-spacer>
                        <div v-if="show_change_button == true" class="mt-5 mb-8">
                            <v-btn @click="open_change_image_dialog = true">
                                Change
                            </v-btn>
                        </div>
                        <v-spacer></v-spacer>
                    </v-row>
                </v-col>

                <!-- Displays all available images -->
                <v-col v-if="show_all_images" v-for="(image, i) in current_images_arr"
                        :key="i"
                        :value="image"
                        cols="12"
                >
                    <v-row class="justify-center mb-12">
                        <img :src=image height="200px" :class="current_selected_img == i ? 'selected' : ''" @click="current_selected_img = i"></img>    
                    </v-row>
                    <v-row class="mt-5 mb-8">
                        <v-spacer></v-spacer>
                        <v-btn size="x-small" @click="imageToBeViewed = image, openImage = true">
                            View
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-row>
                </v-col>
                <ChangeImage :open_change_image_dialog="open_change_image_dialog" @close="(state) => open_change_image_dialog = state"/>
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