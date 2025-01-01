<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import router from '../router/index'
    import { ref, onMounted } from 'vue'

    var completed_tasks = ref(0)
    var scheduled_tasks = ref(0)
    var rescheduled_tasks = ref(0)
    var deleted_tasks = ref(0)

</script>

<template>
    <v-container>
        <v-row>
            <v-col></v-col>
            <v-col>
                <p class="text-center text-h4"> Tasks Stats </p>
            </v-col>
            <v-col></v-col>
        </v-row>
        <v-row class="mt-10">
            <v-col>
                <div>
                    <v-avatar size="108" color="surface-variant">
                        <p> {{ completed_tasks }} </p>
                    </v-avatar>
                    <p class="mt-2"> Tasks Completed </p>
                </div>
            </v-col>
            <v-col>
                <div>
                    <v-avatar size="108" color="surface-variant">
                        <p> {{ scheduled_tasks }} </p>
                    </v-avatar>
                    <p class="mt-2"> Tasks Scheduled </p>
                </div>
            </v-col>
            <v-col>
                <div>
                    <v-avatar size="108" color="surface-variant">
                        <p> {{ rescheduled_tasks }} </p>
                    </v-avatar>
                    <p class="mt-2"> Tasks Rescheduled </p>
                </div>
            </v-col>
            <v-col>
                <div>
                    <v-avatar size="108" color="surface-variant">
                        <p> {{ deleted_tasks }} </p>
                    </v-avatar>
                    <p class="mt-2"> Tasks Deleted </p>
                </div>
            </v-col>
        </v-row>

        <v-row class="mt-10">
            <v-col></v-col>
            <v-col>
                <v-btn class="ml-16"> Change Email Address </v-btn>
            </v-col>
            <v-col></v-col>
        </v-row>

        <v-row class="mt-10">
            <v-col></v-col>
            <v-col>
                <v-btn class="ml-16"> Change Password </v-btn>
            </v-col>
            <v-col></v-col>
        </v-row>

        <v-row class="mt-10">
            <v-col></v-col>
            <v-col>
                <v-btn class="ml-16"> Delete Account </v-btn>
            </v-col>
            <v-col></v-col>
        </v-row>

        <v-row class="mt-10">
            <v-col></v-col>
            <v-col>
                <v-btn class="ml-16"> Logout </v-btn>
            </v-col>
            <v-col></v-col>
        </v-row>
    </v-container>


</template>