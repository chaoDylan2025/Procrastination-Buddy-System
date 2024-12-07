<script setup>
    import AuthenticationService from '../services/AuthenticationService'
    import { RouterLink, RouterView } from 'vue-router'
    import {useRouter} from 'vue-router'
    import { ref, onMounted } from 'vue'

    const dialog = ref(false)
    const dialog2 = ref(false)

    // Contains current user's images
    var current_user_arr = ref([])

    // Test email
    const user_email = "dylanchao64@gmail.com"
    

    async function getCurrentUserImages(){
        await AuthenticationService.getCurrentUserImages({
            email: user_email
        }).then((result) => {
            current_user_arr.value = result.data.images_arr
        })
    } 

    async function deleteCurrentUserImage(user_image){
        await AuthenticationService.deleteCurrentUserImage({
            email: user_email,
            image: user_image
        }).then((result) => {
            current_user_arr.value = result.data.images_arr
        })
    } 

    onMounted(() => {
        // Only call this function if array is empty
        if(current_user_arr.value.length == 0){
            getCurrentUserImages()
        }
    })
</script>

<template>
    <v-app>
        <v-container class="mt-10">
            <!-- Buttons for accessing Edit Content and Upload dialogs -->
             <v-row>
                <v-col></v-col>
                <v-col>
                    <v-btn @click="dialog = true" class="mr-4">
                        Edit Content
                    </v-btn>

                    <v-btn @click="dialog2 = true"> 
                        Upload 
                    </v-btn>
                </v-col>
                <v-col></v-col>
             </v-row>
            
             <!-- <v-row>
                <div>
                    <p> {{ current_user_arr }}</p>
                </div>
             </v-row> -->

             <v-row>
                <v-col 
                    v-for="(image, i) in current_user_arr"
                    :key="i"
                    :value="image.public_url"
                    cols="4"
                >
                    <v-img :src=image.public_url></v-img>
                </v-col>
             </v-row>

            <!-- Dialog for Edit Content -->
            <v-dialog v-model="dialog"
            width="500">
                <v-card
                width="500"
                title="Edit current images on page"
                >
                    <v-row v-for="(image, i) in current_user_arr"
                            :key="i"
                            :value="image.file">
                        <v-list-item>
                            <v-img :src=image.public_url width="250" class="mr-3"></v-img>
                            <template v-slot:append>
                                <v-btn @click="deleteCurrentUserImage(image.file)" density="compact" icon="mdi-delete"></v-btn>
                            </template>
                        </v-list-item>
                    </v-row>
                    <v-btn
                        text="Back"
                        @click="dialog = false"
                        class="mt-5">
                    </v-btn> 
                </v-card>
            </v-dialog>

            <!-- Dialog for Storage -->
            <v-dialog v-model="dialog2"
            width="500">
                <v-card
                width="500"
                title="Current Storage"
                >
                    <v-card-actions>
                        <v-btn
                        text="Back"
                        @click="dialog2 = false">
                        </v-btn> 
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
    </v-app>

</template>