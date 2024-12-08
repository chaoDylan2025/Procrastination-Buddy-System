<script setup>
    import AuthenticationService from '../services/AuthenticationService';
    import { ref, onMounted } from 'vue'
    import { userStore } from "../stores/user";

    // Reactive variables
    const dialog = ref(false)
    const dialog2 = ref(false)
    const name_of_task = ref("")
    const due_date = ref("")

    // Pinia store
    const user = userStore()

    // List of current tasks
    var list_of_tasks = ref([{name: "Example", date: "09/15/2024"}])

    // Adds a task
    function addTask(task_name, task_due_date){
        list_of_tasks.value.push({name: task_name, date: task_due_date})
        dialog.value = false
    }

    // Completes task
    function completeTask(index){
        console.log("Removing task")
        test_list.value.splice(index, 1)
    }

</script>

<template>
    <v-app>
        <v-container class="mt-10" id="buttons-for-tasks" v-if="user.isLoggedIn == true">
            <v-row>
                <v-col>
                </v-col>
                <v-col>
                    <v-btn @click="dialog = true"> Create Task </v-btn>
                </v-col>
                <v-col></v-col>
            </v-row>
            <v-row>
                <v-col></v-col>
                <v-col>
                    <v-list>
                        <v-list-item
                            v-for="(item, i) in list_of_tasks"
                            :key="i"
                            :value="item"
                            color="primary"
                            variant="plain"
                        >
                            <template v-slot:prepend>
                                <v-btn @change="completeTask(i)" class="mr-4">Done</v-btn>
                            </template>
                            <v-card> 
                                <p class="font-weight"> Name of Task:  {{ item.name }}</p>
                                <p> Due Date: {{ item.date }}</p>
                            </v-card>
                        </v-list-item>
                    </v-list>
                </v-col>
                <v-col></v-col>
            </v-row>
        </v-container>

        <v-container v-else>
            <h2 class="text-center"> Please login to your account </h2>
        </v-container>


        <v-dialog v-model="dialog" width="auto">
                <v-card
                width="500"
                title="Create a new task"
                >
                    <v-card-text>
                        <div>
                            <p> Name of task: </p>
                            <v-text-field v-model="name_of_task"></v-text-field>
                        </div>
                        <div class="mt-4">
                            <p> Due Date: </p>
                            <v-text-field v-model="due_date"></v-text-field>
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                        text="Back"
                        @click="dialog = false">
                        </v-btn> 

                        <v-btn
                        text="Confirm"
                        @click="addTask(name_of_task, due_date)">
                        </v-btn> 
                    </v-card-actions>
                </v-card>
            </v-dialog>

    </v-app>

</template>