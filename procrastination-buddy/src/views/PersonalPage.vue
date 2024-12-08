<script setup>
    import AuthenticationService from '../services/AuthenticationService'
    import { ref, onMounted } from 'vue'

    // Contains current images
    var current_images_arr = ref([])

    // Accesses backend to get images from Cloud Storage bucket
    async function getImages(){
        await AuthenticationService.getImages().then((result) => {
            current_images_arr.value = result.data.images_arr
        })
    } 

    // Call this function everytime user reloads page
    onMounted(() => {
        getImages()
    })
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
                    <v-img :src=image></v-img>
                </v-col>
             </v-row>
        </v-container>
    </v-app>

</template>