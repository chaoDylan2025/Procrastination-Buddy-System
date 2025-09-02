<script setup>
import { ref } from 'vue'

const props = defineProps({
    open_name_change_dialog: Boolean,
    current_name: String
})

let current_entered_name = ref(props.current_name)

const emit = defineEmits(['close', 'update'])

/**
 * Exits the dialog for changing display name
 */
function exitDialogModal(){
    emit('close', false)
}

/**
 * Exits the dialog and changes the current user's display name
 */
function exitAndUpdate(){
    emit('update', false, current_entered_name.value)
}
</script>

<template>
    <v-app>
        <v-dialog
            v-model="props.open_name_change_dialog"
            height="300"
            width="500"
        >
            <v-card>
                <h2 class="mt-8 text-center"> Change Name </h2>

                <!-- Textfield where current user enters a new display name -->
                <v-row class="mt-5">
                    <v-responsive class="pa-10">
                        <v-text-field v-model="current_entered_name" label="Enter new name"></v-text-field>
                    </v-responsive>
                </v-row>

                <v-card-actions>
                    <v-btn @click="exitDialogModal()">Back</v-btn>
                    <v-btn @click="exitAndUpdate()">Confirm</v-btn> 
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>