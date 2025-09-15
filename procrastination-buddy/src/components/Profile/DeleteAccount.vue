<script setup>
import { ref } from 'vue'

const props = defineProps({
    open_delete_account_dialog: Boolean
})
const emit = defineEmits('close', 'delete')

var current_password = ref("")
var showCurrentPassword = ref(false)

/**
 * Exits the dialog for deleting the current user's account
 */
function exitDialogModal(){
    current_password.value = ""
    emit('close')
}

/**
 * Exits the dialog for deleting the current user's account and sends the entered password to backend
 */
function deleteAccount(){
    current_password.value = ""
    emit('delete', current_password.value)
}
</script>

<template>
    <v-app>
        <v-dialog
            v-model="props.open_delete_account_dialog"
            height="300"
            width="500"
        >
            <v-card>
                <h2 class="mt-8 text-center"> Are you sure you want to delete your account? </h2>

                <!-- Current user enters their password to delete their account -->
                <v-row class="mt-5">
                    <v-responsive
                        class="ml-10 mr-10"
                        height="auto"
                    >
                        <v-text-field 
                        :append-icon="showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showCurrentPassword ? 'text' : 'password'"
                        class="input-group--focused"
                        @click:append="showCurrentPassword = !showCurrentPassword"
                        v-model="current_password" label="Current password"></v-text-field>
                    </v-responsive>
                </v-row>

                <v-card-actions>
                    <v-btn @click="exitDialogModal()">No</v-btn>
                    <v-btn @click="deleteAccount()">Yes</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>