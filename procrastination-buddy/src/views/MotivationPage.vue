<script setup>
import { onMounted, ref } from 'vue'
import AuthenticationService from '../services/AuthenticationService'
import { changeImageLayout, default_imgs } from '../code/image_functions'
import { userStore } from '../stores/user'
import Content from '../components/Motivational-Page/Content.vue'

// Contains options for changing image layout
var image_layout_options = ["1 per row", "3 per row"]

// Pinia store
const user = userStore()

// Gets the image layout and images from current user
async function getImagesAndLayout(){
    let result = await AuthenticationService.imagesAndLayOut()
    let image_layout = result.data.layout
    let images = result.data.images
    if(images == ""){
        console.log("Current images are missing")
        await setDefaultImages()
    }
}

async function setDefaultImages(){
    await AuthenticationService.settingDefaultImages({images: default_imgs.value}).then((result) => {
        if(result.data.status){
            return true
        }
    })
}

onMounted(() => {
    getImagesAndLayout()
})

</script>

<template>
    <v-app>
        <v-container>
             <!-- Displays option to change image layout -->
             <v-row>
                <v-col class="mt-5 text-center">
                    <v-btn size="small">
                        <span> Cancel </span>
                    </v-btn>
                </v-col>
                <v-col class="mt-5 text-center">
                    <v-menu open-on-hover>
                        <template v-slot:activator="{ props }">
                            <v-btn
                            size="small"
                            v-bind="props"
                            >
                            Change Image Layout
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item
                            class="pa-20"
                            v-for="(item, index) in image_layout_options"
                            :key="index"
                            :value="item"
                            @click="user.imageLayout = changeImageLayout(image_layout_options[index])"
                            >
                                <span class="text-caption text-center">
                                    {{ item }}
                                </span>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
                <v-col class="mt-5 text-center">
                    <v-btn size="small">
                        <span> Save </span>
                    </v-btn>
                </v-col>
             </v-row>

             <!-- Display Motivational Page Content -->
             <v-row>
                <v-col>
                    <Content :show_change_button="true"/>
                </v-col>  
             </v-row>
        </v-container>
    </v-app>
</template>