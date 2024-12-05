<script lang="js">
    import AuthenticationService from '../services/AuthenticationService';
    import { RouterLink, RouterView } from 'vue-router'
    import {useRouter} from 'vue-router'
    import { ref, onMounted } from 'vue'
    import { useDate } from 'vuetify'



    export default {
        data () {
            return {
                dialog: false,
                dialog2: false,
                dialog3: false,
                calendar_dialog: false,
            }
        },
    }
</script>

<template>
    <v-app>
        <div class="mt-10" id="buttons-for-tasks">
            <v-btn @click="dialog = true"> Create Task </v-btn>
            <v-btn @click="dialog2 = true"> Edit Task </v-btn>
            <v-btn @click="dialog3 = true"> Completed Tasks </v-btn>
        </div>

        <v-dialog v-model="dialog" width="auto">
                <v-card
                width="500"
                title="Create a new task"
                >
                    <v-card-text>
                        <div>
                            <p> Name of task: </p>
                            <v-text-field></v-text-field>
                        </div>
                        <div class="mt-4">
                            <v-btn @click="calendar_dialog = true"> Schedule Task </v-btn>
                        </div>
                        <div class="mt-4">
                            <v-switch label="Set a reminder" inset></v-switch>
                            
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                        text="Back"
                        @click="dialog = false">
                        </v-btn> 

                        <v-btn
                        text="Confirm"
                        @click="dialog = false">
                        </v-btn> 
                    </v-card-actions>
                </v-card>
            </v-dialog>

        <v-dialog v-model="dialog2" width="500">
            <v-card
            width="500"
            title="Edit current task"
            >
                <v-card-actions>
                    <v-btn
                    text="Back"
                    @click="dialog2 = false">
                    </v-btn> 

                    <v-btn
                    text="Confirm"
                    @click="dialog2 = false">
                    </v-btn> 
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog3" width="500">
            <v-card
            width="500"
            title="Completed tasks so far"
            >
                <v-card-text>
                    <div>

                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                    text="Back"
                    @click="dialog3 = false">
                    </v-btn> 

                    <v-btn
                    text="Confirm"
                    @click="dialog3 = false">
                    </v-btn> 
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="calendar_dialog" width="500">
            <v-card
            width="500"
            >
                <v-card-text>
                    <v-date-picker color="red">
                        
                    </v-date-picker>
                    <v-text-field
                    label="Time"
                    model-value="12:30:00"
                    suffix="ET"
                    type="time"
                    ></v-text-field>
                    <!-- <input
                        type="datetime-local"
                        id="meeting-time"
                        name="meeting-time"
                        value="2018-06-12T19:30"
                        min="2018-06-07T00:00"
                        max="2018-06-14T00:00" /> -->

                </v-card-text>
                <v-card-actions>
                    <v-btn
                    text="Back"
                    @click="calendar_dialog = false">
                    </v-btn> 

                    <v-btn
                    text="Confirm"
                    @click="calendar_dialog = false">
                    </v-btn> 
                </v-card-actions>
            </v-card>
        </v-dialog>


    </v-app>

</template>

<style lang="css" scoped>
#buttons-for-tasks{
    display: flex;
    justify-content: center;
}
#buttons-for-tasks > button {
    margin-right: 45px;
}
</style>