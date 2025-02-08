<script setup>
    import AuthenticationService from '../services/AuthenticationService'
    import {ref} from 'vue'
    import { img_arr, getImageUrl } from '../code/image_functions'

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
                <v-col 
                    v-for="(image, i) in current_images_arr"
                    :key="i"
                    :value="image"
                    width="100"
                    height="100"
                    cols="2"
                >
                    <v-img :src=getImageUrl(image)></v-img>
                </v-col>
             </v-row>
        </v-container>
    </v-app>

</template>