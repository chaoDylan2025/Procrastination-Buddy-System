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
            width="500"
        >
            <v-card>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-card-actions>

                    </v-card-actions>
                        <v-btn @click="exitDialogModal(false)">Back</v-btn>
                        <v-btn>Confirm</v-btn> 
                </v-row>
            </v-card>
        </v-dialog>
    </v-app>
</template>