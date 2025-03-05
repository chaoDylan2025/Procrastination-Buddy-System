<script setup>
    import AuthenticationService from '../../services/AuthenticationService'
    import {ref, onMounted, watch} from 'vue'
    import ChangeImage from './ChangeImage.vue'
    import Image from './Image.vue'

    const props = defineProps({
        show_check_boxes: Boolean,
        show_change_button: Boolean,
        show_download_button: Boolean,
    })

    // Opens change image dialog
    var open_change_image_dialog = ref(false) 

    // Opens dialog to view full image
    var openImage = ref(false)

    // Image to view
    var imageToBeViewed = ref('')

    // Contains current images
    var current_images_arr = ref([])

    // Contains all of the images from the Appwrite bucket
    var appWriteImages = ref([])

    // Download image from the Appwrite bucket
    async function imageDownload(imageId){
        try{
            // Contains download URL
            const result = await AuthenticationService.downloadImages({image: imageId})
            
            // Trigger download
            const link = document.createElement('a');
            link.href = result;
            link.download = imageId;
            document.body.appendChild(link)
            link.click();
            document.body.removeChild(link)

        }
        catch (error) {
            console.log(error)
        }
    }

    onMounted(() => {
        // Gets the default images of the personal motivational page
        const request = AuthenticationService.getDefaultImages()
        request.then((result) => {
            current_images_arr.value = result.data.default_images
        })

        // Gets all of the images from the Appwrite bucket
        const request2 = AuthenticationService.getAllImages()
        request2.then((result) => {
            appWriteImages.value = result.data.all_images
        })
    })
</script>

<template>
    <v-app class="pa-6">
        <!-- Styling for not downloading images -->
        <v-container class="mt-10">
           <v-row>
            <v-col v-if="show_download_button != true" v-for="(image, i) in current_images_arr"
                    :key="i"
                    :value="image"
                    cols="2"
                >
                    <v-col>
                        <v-row class="align-center">
                            <v-col v-if="show_check_boxes == true" cols="auto">
                                <v-checkbox></v-checkbox>
                            </v-col>
                            <v-img v-if="show_check_boxes == true || show_change_button == true" :src=image height="100"></v-img>
                            <v-img v-else :src=image height="100" cover></v-img>    
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
                </v-col>

                <v-col v-else v-for="(image, j) in appWriteImages"
                    :key="j"
                    :value="image"
                    cols="2"
                >
                    <v-col>
                        <v-row class="align-center">
                            <v-img :src=image.src height="150" cover @click="imageToBeViewed=image.src, openImage=true"></v-img>    
                        </v-row>
                        <v-row class="mt-5">
                            <v-spacer></v-spacer>
                                <v-btn @click="imageDownload(image.file_id)" prepend-icon="mdi-download" variant="plain" size="medium">
                                </v-btn>
                            <v-spacer></v-spacer>
                        </v-row>
                    </v-col>
                </v-col>
            </v-row>
            <p> {{ imageToBeViewed }}</p>
            <ChangeImage :open_change_image_dialog="open_change_image_dialog" @close="(state) => open_change_image_dialog = state"/>
            <Image :image="imageToBeViewed" :open_image="openImage" @close="(state) => openImage = state"/>
        </v-container>
    </v-app>
</template>