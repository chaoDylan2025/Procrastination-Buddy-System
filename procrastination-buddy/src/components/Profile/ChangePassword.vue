<script setup>
import { ref } from 'vue'
const props = defineProps({
    open_change_password_dialog: Boolean
})

const emit = defineEmits(['close', 'change'])

var current_password = ref("")
var new_password = ref("")
var reenter_new_password = ref("")

var showCurrentPassword = ref(false)
var showNewPassword = ref(false)
var showReenteredPassword = ref(false)

/**
 * Exits the dialog for changing current user's password
 */
function exitDialogModal(){
    emit('close', false)
}

/**
 * Changes the current user's password
 */
function changePassword(){
    emit('change', false, current_password.value, new_password.value, reenter_new_password.value)
}
</script>

<template>
    <v-app>
        <v-dialog
            v-model="props.open_change_password_dialog"
            height="500"
            width="500"
        >
            <v-card>
                <v-card-title class="text-h5 font-weight-black"> Change your current password </v-card-title>

                <!-- Enter current password -->
                <v-row class="mt-5 ml-5 mr-5">
                    <v-responsive
                            class="mx-auto"
                            m-height="345"
                    >
                        <v-text-field v-model="current_password" 
                        :append-icon="showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showCurrentPassword ? 'text' : 'password'"
                        class="input-group--focused"
                        @click:append="showCurrentPassword = !showCurrentPassword"
                        label="Current password"></v-text-field>
                    </v-responsive>
                </v-row>

                <!-- Enter new password -->
                <v-row class="mt-5 ml-5 mr-5">
                    <v-responsive
                            class="mx-auto"
                            m-height="345"
                    >
                        <v-text-field v-model="new_password" 
                        :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showNewPassword ? 'text' : 'password'"
                        class="input-group--focused"
                        @click:append="showNewPassword = !showNewPassword"
                        label="Enter new password"></v-text-field>
                    </v-responsive>
                </v-row>

                <!-- Reenter new password -->
                <v-row class="mt-5 ml-5 mr-5">
                    <v-responsive
                            class="mx-auto"
                            m-height="345"
                    >
                        <v-text-field 
                        v-model="reenter_new_password" 
                        :append-icon="showReenteredPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showReenteredPassword ? 'text' : 'password'"
                        class="input-group--focused"
                        @click:append="showReenteredPassword = !showReenteredPassword"
                        label="Re-enter new password"></v-text-field>
                    </v-responsive>
                </v-row>

                <v-card-actions>
                    <v-btn @click="exitDialogModal(false)">Back</v-btn>
                    <v-btn @click="changePassword">Confirm</v-btn>
                </v-card-actions> 
            </v-card>
        </v-dialog>
    </v-app>
</template>