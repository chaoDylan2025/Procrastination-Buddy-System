<script setup>
import { ref } from 'vue'

const props = defineProps({
    open_change_email_dialog: Boolean
})

var new_email_address = ref("")

const emit = defineEmits(['close', 'change'])

/**
 * Exits the dialog for changing email
 */
function exitDialogModal(){
    emit('close', false)
}

/**
 * Exits the dialog and changes the current user's email
 */
function changeEmail(){
    emit('change', false, new_email_address.value)
}
</script>

<template>
    <v-app>
        <v-dialog
            v-model="props.open_change_email_dialog"
            width="500"
            height="250"
        >
            <v-card>
                <v-card-title class="text-h5 text-center font-weight-black"> Enter a new email address to change to </v-card-title>

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