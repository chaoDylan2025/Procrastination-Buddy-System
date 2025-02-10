<script setup>
    import AuthenticationService from '../services/AuthenticationService'
    import {ref} from 'vue'
    import { img_arr, getImageUrl } from '../code/image_functions'

    const props = defineProps({
        show_change_button: Boolean
    })

    // Contains current images
    var current_images_arr = ref(["/images/IMG_7112.JPG", "/images/IMG_7113.JPG", "/images/IMG_7117.WEBP", 
    "/images/MotivationalQuote.png","/images/ProcrastinationQuote.png", "../assets/images/einstein.png.webp",
    "../assets/images/getty_506910700_160576.webp", "../assets/images/IMG_7114.PNG", "../assets/images/IMG_7118.JPG",
    "../assets/images/IMG_7119.JPG", "../assets/images/MotivationalQuote2.png", "../assets/images/MotivationalQuote3.png"])
</script>

<template>
    <v-app>
        <v-container class="mt-10">
           <v-row>
            <v-col v-for="(image, i) in current_images_arr"
                    :key="i"
                    :value="image"
                    cols="2"
                >
                    <v-col>
                        <v-row class="mb-5">
                            <v-img :src=getImageUrl(image) height="100"></v-img>
                        </v-row>
                        <v-row>
                            <v-spacer></v-spacer>
                            <v-btn>
                                Change
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-row>
                    </v-col>
                </v-col>
            </v-row>
        </v-container>
    </v-app>

</template>