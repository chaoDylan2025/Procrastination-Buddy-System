<script setup>
    import AuthenticationService from '../services/AuthenticationService'
    import {ref} from 'vue'
    import Content from './Content.vue'

</script>

<template>
    <v-app>
        <v-container>
             <!-- Displays two buttons that users can choose -->
             <v-row class="ml-10">
                <v-spacer></v-spacer>
                <v-col class="mt-5">
                    <v-btn @click="" size="small">Edit Content</v-btn>
                </v-col>
                <v-spacer></v-spacer>
                <v-col class="mt-5">
                    <v-btn @click="open_storage_dialog_modal = true" size="small">Download Images</v-btn>
                </v-col>
                <v-spacer></v-spacer>
             </v-row>

             <!-- Display Motivational Page Content -->
             <v-row>
                <Content />
             </v-row>
             <v-row></v-row>
        </v-container>
    </v-app>
</template>