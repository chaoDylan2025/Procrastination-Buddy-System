<script setup>
import { userStore } from '../../stores/user'
import { ref } from 'vue'
import { current_imgs, motivational_imgs, imageToBeViewed } from '../../frontend-code/image_functions.js'
import { changeButtonEvnt, viewButtonEvnt, displayConfirmButtonEvnt, closeImageChangingDialog } from '../../frontend-code/image_events.js'
import ChangeImage from './ChangeImage.vue'
import Image from './Image.vue'

const props = defineProps({
    show_check_boxes: Boolean,
    show_change_button: Boolean,
    show_all_images: Boolean,
    show_download_button: Boolean,
})
const user = userStore()

var open_change_image_dialog = ref(false) 
var openImage = ref(false)
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
                            <v-btn @click="open_change_image_dialog = changeButtonEvnt(i, open_change_image_dialog)">
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
                        <v-btn size="x-small" @click="openImage = viewButtonEvnt(img.image, openImage)">
                            View
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-row>
                </v-col>
                
                <ChangeImage :open_change_image_dialog="open_change_image_dialog" @close="(state) => open_change_image_dialog = closeImageChangingDialog(state)"/>
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