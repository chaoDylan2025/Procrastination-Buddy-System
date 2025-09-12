<script setup>
import { ref } from 'vue'

const props = defineProps({
    open_make_new_list_dialog: Boolean,
    current_web_list: Array
})
const emit = defineEmits(['close'])

var new_restricted_wesbite = ref("")

/**
 * Exits the dialog to add a new restricted website to the list
 * 
 * @param new_restricted_wesbite - New restricted website to insert into the list 
 */
function exitDialogModal(new_restricted_wesbite=""){
    emit('close', false, new_restricted_wesbite)
}
</script>

<template>
    <v-app>
      <v-dialog v-model="props.open_make_new_list_dialog"
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
                    @click="exitDialogModal(), new_restricted_wesbite=''">
                    </v-btn> 

                    <v-btn
                    text="Confirm"
                    @click="exitDialogModal(new_restricted_wesbite), new_restricted_wesbite=''">
                    </v-btn> 
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>