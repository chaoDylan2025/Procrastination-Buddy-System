<script setup>
import {ref} from 'vue'
import EditContent from '../components/Motivational-Page/EditContent.vue'
import Content from '../components/Motivational-Page/Content.vue'

// Opens Edit Content dialog
var open_edit_content_dialog = ref(false)
</script>

<template>
    <v-app>
        <v-container>
             <!-- Displays option to edit content -->
             <v-row>
                <v-col></v-col>
                <v-col class="mt-5 text-center">
                    <v-btn @click="open_edit_content_dialog = true" size="small">Edit Content</v-btn>
                </v-col>
                <v-col></v-col>
             </v-row>

             <!-- Display Motivational Page Content -->
             <v-row>
                <v-col>
                    <Content :show_change_button="true"/>
                </v-col>
                
             </v-row>
             <EditContent :open_edit_dialog="open_edit_content_dialog" @close="(state) => open_edit_content_dialog = state"/>
        </v-container>
    </v-app>
    
</template>