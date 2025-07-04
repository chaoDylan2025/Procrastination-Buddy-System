<script setup>
import AuthenticationService from '../services/AuthenticationService';  
import EditList from '../components/Focus-List/EditList.vue';
import LogSites from '../components/Focus-List/LogSites.vue';
import { userStore } from '../stores/user'
import { ref, onMounted } from 'vue'

// Pinia store for user information
const user = userStore()

// Reactive variables
const edit_list_dialog = ref(false)
const log_sites_dialog = ref(false)

//Test Array
var test_arr = ref([{link: "https://www.youtube.com", num_visted: 0}, {link: "https://www.crunchyroll.com", num_visted: 0}, {link: "https://www.reddit.com/?rdt=33094", num_visted: 0}])
</script>

<template>
    <v-app>
        <v-container v-if="user.isLoggedIn == true">
            <v-row class="mt-10">
                <v-col cols="4"></v-col>
                <!-- Contains buttons that will each show a different dialog window -->
                <v-col cols="4">
                    <!-- Buttons are only shown if user is logged in -->
                    <div class="d-flex flex-column">
                        <v-btn class="rounded-pill" size="small" @click="log_sites_dialog = true"> Log Sites Visited </v-btn>
                        <v-btn class="rounded-pill mt-4" size="small" @click="edit_list_dialog = true"> Edit List </v-btn>
                    </div>

                    <div>
                        <v-list class="mt-5">
                            <div class="mt-4">
                                <span class="text-center"> 
                                    <h3>
                                        Current Focus List: 
                                    </h3>
                                </span>
                            </div>

                            <v-list-item
                                v-for="(item, i) in test_arr"
                                :key="i"
                                :value="item"
                                class="text-center"
                                color="primary"
                                variant="plain"
                            >
                                <v-list-item-title v-text="item.link"></v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </div>
                </v-col>
                <v-col cols="4"></v-col>
            </v-row>
        </v-container>
        
        <v-container v-else>
            <h2 class="text-center"> Please login to your account </h2>
        </v-container>
        
        <v-container>
            <EditList :open_edit_list_dialog="edit_list_dialog" :current_web_list="test_arr" @close="(state) => edit_list_dialog=state"/>
        </v-container>

        <v-continer>
            <LogSites :open_log_sites_dialog="log_sites_dialog" :current_web_list="test_arr" @close="(state) => log_sites_dialog=state"/>
        </v-continer>   
    </v-app>
</template>