<script setup>
import AuthenticationService from '../../services/AuthenticationService'
import { userStore } from '../../stores/user'
import { ref, onMounted, watch } from 'vue'
import { motivational_imgs } from '../../code/image_functions'
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
        <!-- Styling for not downloading images -->
        <v-container class="mt-10">
            <v-row>
                <v-col v-if="!show_all_images" v-for="(image, i) in current_images_arr"
                        :key="i"
                        :value="image"
                        :cols="user.imageLayout"
                >
                    <v-row>
                        <v-img :src=image height="100px"></v-img>    
                    </v-row>
                    <v-row v-if="show_change_button == true">
                        <v-spacer></v-spacer>
                        <div v-if="show_change_button == true" class="mt-3">
                            <v-btn @click="open_change_image_dialog = true">
                                Change
                            </v-btn>
                        </div>
                        <v-spacer></v-spacer>
                    </v-row>
                </v-col>

                <v-col v-if="show_all_images" v-for="(image, i) in current_images_arr"
                        :key="i"
                        :value="image"
                        :cols="user.imageLayout"
                >
                    <v-row>
                        <v-img :src=image height="100px"></v-img>    
                    </v-row>
                    <v-row v-if="show_change_button == true">
                        <v-spacer></v-spacer>
                        <div v-if="show_change_button == true" class="mt-3">
                            <v-btn @click="open_change_image_dialog = true">
                                Change
                            </v-btn>
                        </div>
                        <v-spacer></v-spacer>
                    </v-row>
                </v-col>
                <ChangeImage :open_change_image_dialog="open_change_image_dialog" @close="(state) => open_change_image_dialog = state"/>
                <Image :image="imageToBeViewed" :open_image="openImage" @close="(state) => openImage = state"/>

            </v-row>
        </v-container>
    </v-app>
</template>