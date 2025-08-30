<script setup>
import AuthenticationService from '../../services/AuthenticationService'
import { ref, onMounted } from 'vue'

var list_of_sites = ref([]) // Actual array from database

// Results to display for each stat
var number_sites_result = ref("Please add a website")
var most_visited_result = ref("Please add a website")
var least_visited_result = ref("Please add a website")

// Gets the current user's restricted websites list
onMounted(async () => {
    let result = await AuthenticationService.restrictedWebsitesList();
    list_of_sites.value = result.data.list
    console.log("List of sites: ", list_of_sites.value)
    console.log("Number of restricted websites: ", list_of_sites.value.length)
    console.log("Most visited restricted website: ")
})
</script>

<template>
    <v-container>
        <v-row>
            <v-col></v-col>
            <v-col>
                <p class="mt-3 text-center text-h4"> Focus List Stats </p>
            </v-col>
            <v-col></v-col>
        </v-row>

        <v-row class="mt-10" justify="center">
            <div>
                <div class="mb-5 d-flex flex-column text-center">
                    <div>
                        <p class="mt-3 font-weight-bold"> Number of restricted websites </p>
                    </div>

                    <div>
                        <p class="mt-2"> {{ number_sites_result }} </p>
                    </div>
                </div>

                <div class="mb-5 d-flex flex-column text-center">
                    <div>
                        <p class="mt-3 font-weight-bold"> Most visited restricted website </p>
                    </div>

                    <div>
                        <p class="mt-2"> {{ most_visited_result }} </p>
                    </div>
                </div>

                <div class="d-flex flex-column text-center">
                    <div>
                        <p class="mt-3 font-weight-bold"> Least visited restricted website </p>
                    </div>

                    <div>
                        <p class="mt-2"> {{ least_visited_result }} </p>
                    </div>
                </div>
            </div>
        </v-row>
    </v-container>
</template>