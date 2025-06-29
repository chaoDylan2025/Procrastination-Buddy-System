<script setup>
    import AuthenticationService from '../services/AuthenticationService';  
    import { userStore } from '../stores/user'
    import { ref, onMounted } from 'vue'

    // Pinia store for user information
    const user = userStore()
    
    // Reactive variables
    const dialog = ref(false)
    const dialog2 = ref(false)
    const dialog3 = ref(false)
    const new_list_dialog = ref(false)
    

    var arr_of_tasks = ref([])
    var new_restricted_wesbite = ref("")

    //Test Array
    var test_arr = ref(["https://www.youtube.com", "https://www.crunchyroll.com", "https://www.reddit.com/?rdt=33094"])

    function dialog_confirm(){
        dialog.value = false
    }
    // Inserts new website in the list
    function new_list_dialog_confirm(website){
        test_arr.value.push(website)
        new_list_dialog.value = false
    }

    // Deletes website in the list
    function delete_website(index){
        test_arr.value.splice(index, 1)
        console.log(test_arr)
    }
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
                        <v-btn class="rounded-pill mt-4" size="small" @click="dialog = true"> Edit List </v-btn>
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

        <!-- Dialog for when user clicks on 'Edit List' -->
        <v-dialog v-model="dialog"
            width="500">
            <v-card
            width="500"
            title="Edit your current list of websites"
            >
                <!-- Contains current list of websites that a user can edit and delete -->
                <v-container>
                    <v-row>
                        <v-list>
                            <v-list-subheader>Restricted Websites</v-list-subheader>
                            <v-list-item
                                v-for="(item, i) in test_arr"
                                :key="i"
                                :value="item"
                                style="text-align: center;"
                                color="primary"
                                variant="plain"
                            >
                                <template v-slot:prepend>
                                    <v-btn @click="delete_website(i)" density="compact" icon="mdi-delete"></v-btn>
                                </template>
                                <v-list-item-title v-text="item"></v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-row>
                    
                    <v-row>
                        <v-col></v-col>
                        <v-btn @click="new_list_dialog = true" density="compact" icon="mdi-plus"></v-btn>
                        <v-col></v-col>
                    </v-row>
                </v-container>

                <!-- Gives users the option to exit dialog -->
                <v-card-actions>
                    <v-btn
                    text="Back"
                    @click="dialog = false">
                    </v-btn> 
                </v-card-actions>
            </v-card>
        </v-dialog>


        <!-- Dialog for user to enter a new site -->
        <v-dialog v-model="new_list_dialog"
            width="500">
            <v-card
            width="500"
            title="Enter a new site that you do not want to access"
            >
                <v-container>
                    <!-- Asks user to enter new restricted website -->
                    <v-text-field
                    v-model="new_restricted_wesbite"
                    hide-details="auto"
                    label="Website"
                    clearable
                    ></v-text-field>
                </v-container>

                <v-card-actions>
                    <v-btn
                    text="Back"
                    @click="new_list_dialog = false">
                    </v-btn> 

                    <v-btn
                    text="Confirm"
                    @click="new_list_dialog_confirm(new_restricted_wesbite)">
                    </v-btn> 
                </v-card-actions>
            </v-card>
        </v-dialog>


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
                    @click="dialog2 = false">
                    </v-btn> 

                    <v-btn
                    text="Confirm"
                    @click="dialog2 = false">
                    </v-btn> 
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>