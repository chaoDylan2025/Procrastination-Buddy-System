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
//var test_arr = ref([{link: "https://www.youtube.com", num_visted: 0}, {link: "https://www.crunchyroll.com", num_visted: 0}, {link: "https://www.reddit.com/?rdt=33094", num_visted: 0}])

// Actual array from database
var list_of_sites = ref([])
var previous_list_of_sites = ""

// Current message to display
var msgs_to_display = ["Please insert a restricted website in your list", "Must have at least one restricted website in your list"]
var current_msg = ref(msgs_to_display[0])

// Opens the dialog for logging sites if current list is not empty
function openLogSitesDialog(){
    if(list_of_sites.value.length == 0){
        current_msg.value = msgs_to_display[1]
    }
    else{
        log_sites_dialog.value = true
    }
}

// Closes the dialogs
function exitEditListDialog(state, writeData){
    if(writeData){
        updateRestrictedSitesList()
        previous_list_of_sites = JSON.stringify(list_of_sites.value)
    }
    else{
        list_of_sites.value = JSON.parse(previous_list_of_sites)
    }

    edit_list_dialog.value = state
}

function exitLogSitesDialog(state, writeData){
    if(writeData){
        updateRestrictedSitesList()
    }

    log_sites_dialog.value = state
}

// Adds the updated restricted websites list to the database
async function updateRestrictedSitesList(){
    console.log(list_of_sites.value)
    await AuthenticationService.settingRestrictedWebsitesList(list_of_sites.value).then((result) => {
        if(result.data.status){
            return true
        }
        else{
            console.log("Something went wrong...")
        }
    })
}

onMounted(async () => {
    let result = await AuthenticationService.restrictedWebsitesList();
    list_of_sites.value = result.data.list
    previous_list_of_sites = JSON.stringify(list_of_sites.value)
})
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
                        <v-btn class="rounded-pill" size="small" @click="openLogSitesDialog()"> Log Sites Visited </v-btn>
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

                            <v-container v-if="list_of_sites.length != 0">
                                <v-list-item
                                v-for="(item, i) in list_of_sites"
                                :key="i"
                                :value="item"
                                class="text-center"
                                color="primary"
                                variant="plain"
                                >
                                    <v-list-item-title v-text="item.link"></v-list-item-title>
                                </v-list-item>
                            </v-container>

                            <v-container v-else>
                                <p> {{ current_msg }} </p>
                            </v-container>
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
            <EditList :open_edit_list_dialog="edit_list_dialog" :current_web_list="list_of_sites" @close="exitEditListDialog"/>
        </v-container>

        <v-continer>
            <LogSites :open_log_sites_dialog="log_sites_dialog" :current_web_list="list_of_sites" @close="exitLogSitesDialog"/>
        </v-continer>   
    </v-app>
</template>