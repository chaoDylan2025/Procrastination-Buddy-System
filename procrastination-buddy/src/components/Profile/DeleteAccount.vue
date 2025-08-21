<script setup>
const props = defineProps({
    open_delete_account_dialog: Boolean
})

const emit = defineEmits('exitDialog')

/**
 * Exits the dialog for deleting the current user's account
 */
function exitDialogModal(){
    emit('close', false)
}
</script>

<template>
    <v-app>
        <v-dialog
            v-model="props.open_delete_account_dialog"
            height="200"
            width="500"
        >
            <v-card>
                <v-card-title class="text-h6 font-weight-black"> Are you sure you want to delete your account? </v-card-title>

                <!-- Current user enters their password to delete their account -->
                <v-row class="mt-5">
                    <v-responsive
                        class="ml-10 mr-10"
                        height="auto"
                    >
                        <v-text-field label="Current password"></v-text-field>
                    </v-responsive>
                </v-row>

                <v-card-actions>
                    <v-btn @click="exitDialogModal(false)">No</v-btn>
                    <v-btn>Yes</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>