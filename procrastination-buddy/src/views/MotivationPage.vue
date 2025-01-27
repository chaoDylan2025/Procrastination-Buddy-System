<script setup>
    import AuthenticationService from '../services/AuthenticationService'
    import {ref} from 'vue'
    import Content from './Content.vue'
    import StorageView from '../components/StorageView.vue';

    // Opens Storage dialog modal
    var open_storage_dialog_modal = ref(false)

</script>

<template>
    <v-app>
        <v-container>
             <!-- Displays two buttons that users can choose -->
             <v-row class="ml-10">
                <v-spacer></v-spacer>
                <v-col class="mt-5">
                    <v-btn @click="">Edit Content</v-btn>
                </v-col>
                <v-spacer></v-spacer>
                <v-col class="mt-5">
                    <v-btn @click="open_storage_dialog_modal = true">Storage</v-btn>
                </v-col>
                <v-spacer></v-spacer>
             </v-row>

             <!-- Display Motivational Page Content -->
             <v-row>
                <Content />
             </v-row>
             <v-row></v-row>
        </v-container>

        <StorageView :open_storage_view="open_storage_dialog_modal" @close="(state) => open_storage_dialog_modal = state"/>


    </v-app>

</template>