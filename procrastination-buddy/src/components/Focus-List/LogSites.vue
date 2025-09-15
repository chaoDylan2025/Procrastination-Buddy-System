<script setup>
const props = defineProps({
    open_log_sites_dialog: Boolean,
    current_web_list: Array
})
const emit = defineEmits(['close'])

/**
 * Exits the dialog and inserts logged visits to the list
 * 
 * @param writeData - Updates or does not update current user's restricted websites list
 */
function exitLogSitesDialogModal(writeData=false){
    emit('close', writeData)
}
</script>

<template>
    <v-app>
        <v-dialog v-model="props.open_log_sites_dialog" width="500">
            <v-card
            width="500"
            title="Log number of times you visited each website"
            >
                <v-container>
                    <!-- Current row of restricted website -->
                    <div class="d-flex" v-for="(item, i) in props.current_web_list">
                        <!-- Decrement button -->
                        <v-col class="d-flex justify-center align-self-center">
                            <v-btn @click="item.num_visited != 0 ? item.num_visited -= 1 : 0" size="small" icon="mdi-minus" variant="plain"></v-btn>
                        </v-col>

                        <v-col>
                           <div> {{ item.link }} </div>
                           <v-text-field :model-value="item.num_visited"></v-text-field>
                        </v-col>

                        <!-- Increment button -->
                        <v-col class="d-flex justify-center align-self-center">
                            <v-btn @click="item.num_visited += 1" size="small" icon="mdi-plus" variant="plain"></v-btn>
                        </v-col>
                    </div>
                </v-container>
                
                <v-card-actions class="d-flex justify-space-between">
                    <v-btn
                    text="Back"
                    @click="exitLogSitesDialogModal(false)">
                    </v-btn> 

                    <v-btn
                    text="Confirm"
                    @click="exitLogSitesDialogModal(true)">
                    </v-btn> 
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>