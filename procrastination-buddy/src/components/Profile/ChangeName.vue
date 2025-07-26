<script setup>
import { ref } from 'vue'
const props = defineProps({
    open_name_change_dialog: Boolean,
    current_name: String
})

let current_entered_name = ref(props.current_name)

const emit = defineEmits(['close', 'update'])

function exitDialogModal(){
    emit('close', false)
}
function exitAndUpdate(name){
    emit('update', false, name)
}
</script>

<template>
    <v-app>
        <v-dialog
            v-model="props.open_name_change_dialog"
            height="500"
            width="500"
        >
            <v-card>
                <v-spacer></v-spacer>
                <h2 class="mt-8 text-center"> Change Name </h2>
                <v-row class="mt-4">
                    <v-responsive class="mx-auto">
                        <v-text-field v-model="current_entered_name" class="pa-10" label="Enter new name"></v-text-field>
                    </v-responsive>
                </v-row>
                <v-card-actions class="mb-4 d-flex justify-space-around">
                    <v-btn class="ml-auto" @click="exitDialogModal(false)">Back</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="mr-auto" @click="exitAndUpdate(current_entered_name)">Confirm</v-btn> 
                </v-card-actions>
                <v-spacer></v-spacer>
            </v-card>
        </v-dialog>
    </v-app>
</template>