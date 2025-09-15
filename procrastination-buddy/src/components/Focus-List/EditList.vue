<script setup>
import InsertWebsite from './InsertWebsite.vue'
import { ref } from 'vue'

const props = defineProps({
    open_edit_list_dialog: Boolean,
    current_web_list: Array
})
const emit = defineEmits(['close'])

var open_new_list_dialog = ref(false)
var display_error_message = ref(false)

/**
 * Deletes website in the list
 * 
 * @param index - Position of selected website to delete
 */
function delete_website(index){
    props.current_web_list.splice(index, 1)
}

/**
 * Opens the dialog for inserting a website
 */
function openInsertWebDialog(){
    open_new_list_dialog.value = true
    display_error_message.value = false
}

/**
 * Inserts new website in current restricted websites list
 * 
 * @param state - Opens or closes dialog
 * @param website - Restricted website to insert into list
 */
function insertNewWebsite(website){
    let website_included = props.current_web_list.some((site) => {
        return site.link.toLowerCase() === website.toLowerCase()
    })

    if(website != "" && website_included == false){
        props.current_web_list.push({link: website, num_visited: 0})
    }
    else if(website_included == true){
        display_error_message.value = true
    }
    
    open_new_list_dialog.value = false
}

/**
 * Exits the Edit List dialog
 * 
 * @param writeData - Updates or does not update current user's restricted websites list
 */
function exitEditListDialog(writeData){
    emit('close', writeData)
}
</script>

<template>
    <v-app>
        <!-- Display dialog when user clicks on 'Edit List' button -->
        <v-dialog v-model="props.open_edit_list_dialog" width="500">
            <v-card
            width="500"
            title="Edit your current list of websites"
            >
                <div v-if="props.current_web_list.length != 0" class="font-weight-bold text-center mb-3" style="color: black;"> Restricted Websites </div>
                <div v-else class="font-weight-bold text-center mb-3" style="color: black;"> Please enter a website that you would like to restrict yourself from visiting </div>

                <div v-show="display_error_message">
                    <p class="mb-2 text-center" style="color: red;"> Please enter a different website </p>
                </div>
                
                <!-- Contains current list of websites that a user can edit and delete -->
                <div class="d-flex ml-4 mb-4" v-for="(item, i) in props.current_web_list">
                    <div>
                        <v-btn class="mr-5" @click="delete_website(i)" density="compact" icon="mdi-delete"></v-btn>
                    </div>
                    <div> {{ item.link }} </div>
                </div>

                <!-- Users can press this button to add another restricted website to their list -->
                <v-row class="mt-4">
                    <v-col></v-col>
                    <v-btn @click="openInsertWebDialog" density="compact" icon="mdi-plus"></v-btn>
                    <v-col></v-col>
                </v-row>

                <!-- Gives users the option to exit the dialog -->
                <v-card-actions class="mt-4 d-flex justify-space-between">
                    <v-btn
                    text="Back"
                    @click="exitEditListDialog(false)">
                    </v-btn> 
                    <v-btn
                    text="Save"
                    @click="exitEditListDialog(true)">
                    </v-btn> 
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Dialog for inserting a new restricted website into the list -->
         <v-container>
            <InsertWebsite :open_make_new_list_dialog="open_new_list_dialog" :current_web_list="props.current_web_list" @close="insertNewWebsite"/>
         </v-container>
    </v-app>
</template>