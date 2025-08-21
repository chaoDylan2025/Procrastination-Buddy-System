<script setup>
import { ref, onMounted } from 'vue'
import Content from '../components/Motivational-Page/Content.vue'
import { img_arr, getImageUrl, current_imgs } from '../frontend-code/personal-motivational-page/image_functions'
import AuthenticationService from '../services/AuthenticationService'
import { userStore } from "../stores/user"

const user = userStore()

var displayImages = ref(false)

/**
 * Checks if current user is logged in
 */
async function isLoggedIn(){
    let result = await AuthenticationService.userIsLoggedIn()
    return result.data.email
}

/**
 * Gets the image layout and images from current user
 */
async function getImagesAndLayout(){
    let result = await AuthenticationService.updateImagesAndLayout()
    return result.data.images
}

onMounted(async() => {
    user.email = await isLoggedIn()
    await getImagesAndLayout().then((result) => {
        current_imgs.value = result
        displayImages.value = true
    })
})
</script>

<template>
    <v-container>
        <v-container v-if="user.email == null">
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
        </v-container>

        <v-container v-else-if="displayImages && user.email != null">
            <v-row>
                <v-col></v-col>
                <v-col>
                    <p class="text-h5 text-center mt-5"> Hello! Here are some images to help motivate you :) </p>
                </v-col>
                <v-col></v-col>
            </v-row>
            <v-row>
                <Content :show_change_button="false" :show_all_images="false"/>
            </v-row>
        </v-container>
    </v-container>
</template>