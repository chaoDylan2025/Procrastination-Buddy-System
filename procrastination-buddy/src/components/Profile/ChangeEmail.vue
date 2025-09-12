<script setup>
import { ref } from 'vue'

const props = defineProps({
    open_change_email_dialog: Boolean
})
const emit = defineEmits(['close', 'change'])

var new_email_address = ref("")

/**
 * Exits the dialog for changing email
 */
function exitDialogModal(){
    new_email_address.value = ""
    emit('close', false)
}

/**
 * Exits the dialog and changes the current user's email
 */
function changeEmail(){
    emit('change', false, new_email_address.value)
    new_email_address.value = ""
}
</script>

<template>
    <v-app>
        <v-dialog
            v-model="props.open_change_email_dialog"
            width="500"
            height="300"
        >
            <v-card>
                <h2 class="mt-8 text-center"> Enter a new email address to change to </h2>

                <!-- Textfield where current user enters a new email address -->
                <v-row class="ma-8">
                    <v-responsive
                            class="mx-auto"
                            m-height="345"
                    >
                        <v-text-field v-model="new_email_address" 
                        label="New Email Address"></v-text-field>
                    </v-responsive>
                </v-row>

                <v-card-actions>
                    <v-btn @click="exitDialogModal()">Back</v-btn>
                    <v-btn @click="changeEmail()">Confirm</v-btn> 
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>