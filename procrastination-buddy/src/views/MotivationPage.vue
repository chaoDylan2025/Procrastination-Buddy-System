<script setup>
    import AuthenticationService from '../services/AuthenticationService'
    import {ref} from 'vue'
    import EditContent from '../components/Motivational-Page/EditContent.vue'
    import Content from '../components/Motivational-Page/Content.vue'
    import DownloadImages from '../components/Motivational-Page/DownloadImages.vue'

    // Opens Edit Content dialog
    var open_edit_content_dialog = ref(false)
    // Opens Download Images dialog
    var open_download_images_dialog = ref(false)
</script>

<template>
    <v-app>
        <v-container>
             <!-- Displays two buttons that users can choose -->
             <v-row class="ml-10">
                <v-spacer></v-spacer>
                <v-col class="mt-5">
                    <v-btn @click="open_edit_content_dialog = true" size="small">Edit Content</v-btn>
                </v-col>
                <v-spacer></v-spacer>
                <v-col class="mt-5">
                    <v-btn @click="open_download_images_dialog = true" size="small">Download Images</v-btn>
                </v-col>
                <v-spacer></v-spacer>
             </v-row>

             <!-- Display Motivational Page Content -->
             <v-row>
                <v-col>
                    <Content />
                </v-col>
                
             </v-row>
             <EditContent :open_edit_dialog="open_edit_content_dialog" @close="(state) => open_edit_content_dialog = state"/>
             <DownloadImages :open_download_images_dialog="open_download_images_dialog" @close="(state) => open_download_images_dialog = state"/>
        </v-container>
    </v-app>
    
</template>