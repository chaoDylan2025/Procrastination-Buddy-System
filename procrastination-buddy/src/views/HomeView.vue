<script setup>
import { ref } from 'vue'

// Array of images
var img_arr = ref([
    "/images/IMG_7112.JPG",
    "/images/IMG_7113.JPG", 
    "/images/IMG_7117.WEBP", 
    "/images/MotivationalQuote.png",
    "/images/ProcrastinationQuote.png"
])

// Gets a new Image URL
function getImageUrl(url) {
  return new URL(`${url}`, import.meta.url).href
}
</script>

<template>
    <v-container>
        <v-row>
            <v-col></v-col>
            <v-col>
                <p class="text-h5 text-center mt-5"> Welcome to Procrastination Buddy </p>
            </v-col>
            <v-col></v-col>
        </v-row>

        <v-row>
            <v-col></v-col>
            <v-col cols="5">
                <p class="text-center"> Want to get started with using Procastination Buddy?</p>
                <RouterLink to="/SignUp">
                    <p class="mt-2 text-center"> Sign up for an account </p>
                </RouterLink>
            </v-col>
            <v-col></v-col>
        </v-row>
    </v-container>

    <v-carousel
        show-arrows="hover"
        cycle="1"
        hide-delimiter-background
    >
        <v-carousel-item
            v-for="(image, i) in img_arr"
            :key="i"
            :src="`${getImageUrl(image)}`"
        >
        </v-carousel-item>

    </v-carousel>
</template>
