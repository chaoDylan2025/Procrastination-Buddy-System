<script setup>
import { ref } from 'vue'
const props = defineProps({
    open_change_password_dialog: Boolean
})

const emit = defineEmits('close')

function exitDialogModal(){
    emit('close', false)
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
                <v-row class="mt-5 ml-5 mr-5">
                    <v-responsive
                            class="mx-auto"
                            m-height="345"
                    >
                        <v-text-field label="Current password"></v-text-field>
                    </v-responsive>
                </v-row>

                <v-row class="mt-5 ml-5 mr-5">
                    <v-responsive
                            class="mx-auto"
                            m-height="345"
                    >
                        <v-text-field label="Enter new password"></v-text-field>
                    </v-responsive>
                </v-row>

                <v-row class="mt-5 ml-5 mr-5">
                    <v-responsive
                            class="mx-auto"
                            m-height="345"
                    >
                        <v-text-field label="Re-enter new password"></v-text-field>
                    </v-responsive>
                </v-row>

                <v-card-actions>
                    <v-btn @click="exitDialogModal(false)">Back</v-btn>
                    <v-btn>Confirm</v-btn>
                </v-card-actions> 
            </v-card>
        </v-dialog>
    </v-app>
</template>