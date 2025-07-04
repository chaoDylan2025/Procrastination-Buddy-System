<script setup>
import InsertWebsite from './InsertWebsite.vue'
import { ref } from 'vue'

const props = defineProps({
    open_edit_list_dialog: Boolean,
    current_web_list: Array
})

const emit = defineEmits(['close'])

var open_new_list_dialog = ref(false)

// Deletes website in the list
function delete_website(index){
    props.current_web_list.splice(index, 1)
}

// Inserts new website in current restricted websites list
function insertNewWebsite(state, website){
    if(website != ""){
        props.current_web_list.push(website);
    }
    open_new_list_dialog.value = state
}

function exitDialogModal(){
    emit('close', false)
}
</script>

<template>
    <v-app>
        <!-- Dialog for when user clicks on 'Edit List' button -->
        <v-dialog v-model="props.open_edit_list_dialog" width="500">
            <v-card
            width="500"
            title="Edit your current list of websites"
            >
                <div class="font-weight-bold text-center mb-3" style="color: black;"> Restricted Websites </div>
                
                <!-- Contains current list of websites that a user can edit and delete -->
                <div class="d-flex ml-4 mb-4" v-for="(item, i) in props.current_web_list">
                    <div>
                        <v-btn class="mr-5" @click="delete_website(i)" density="compact" icon="mdi-delete"></v-btn>
                    </div>
                    <div> {{ item.link }} </div>
                </div>

                <!-- Users can press this button to add another restricted website to their list -->
                <v-row>
                    <v-col></v-col>
                    <v-btn @click="open_new_list_dialog = true" density="compact" icon="mdi-plus"></v-btn>
                    <v-col></v-col>
                </v-row>

                <!-- Gives users the option to exit the dialog -->
                <v-card-actions>
                    <v-btn
                    text="Back"
                    @click="exitDialogModal()">
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