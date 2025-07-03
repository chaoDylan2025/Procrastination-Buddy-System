<script setup>
import AuthenticationService from '../services/AuthenticationService';  
import EditList from '../components/Focus-List/EditList.vue';
import { userStore } from '../stores/user'
import { ref, onMounted } from 'vue'

// Pinia store for user information
const user = userStore()

// Reactive variables
const edit_list_dialog = ref(false)
const dialog2 = ref(false)

//Test Array
var test_arr = ref(["https://www.youtube.com", "https://www.crunchyroll.com", "https://www.reddit.com/?rdt=33094"])
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
                        <v-btn class="rounded-pill" size="small" @click="dialog2 = true"> Log Sites Visited </v-btn>
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
                                <v-list-item-title v-text="item"></v-list-item-title>
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

        <!-- Dialog for when user clicks on 'Log Number Of Sites Visited' --> 
        <v-dialog v-model="dialog2"
            width="500">
            <v-card
            width="500"
            title="Log number of times you visited each website"
            >
                <v-container>
                    <v-row>
                        <v-list>
                        <v-list-subheader>Restricted Websites</v-list-subheader>
                            <v-list-item
                                v-for="(item, i) in test_arr"
                                :key="i"
                                :value="item"
                                color="primary"
                                variant="plain"
                            >
                                <template v-slot:prepend>
                                    <v-text-field>
                                        <template v-slot:prepend>
                                            <v-icon>
                                                mdi-minus
                                            </v-icon>
                                        </template>

                                        <template v-slot:append>
                                            <v-icon>
                                                mdi-plus
                                            </v-icon>
                                        </template>
                                    </v-text-field>
                                </template>
                                <v-list-item-title v-text="item" class="ml-2"></v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-row>
                </v-container>
                <v-card-actions>
                    <v-btn
                    text="Back"
                    @click="">
                    </v-btn> 

                    <v-btn
                    text="Confirm"
                    @click="">
                    </v-btn> 
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>