<script setup>
import AuthenticationService from '../../services/AuthenticationService'
import { ref, onMounted } from 'vue'

var list_of_sites = ref([]) // Actual array from database

// Results to display for each stat
var number_sites_result = ref("")
var most_visited_result = ref("")
var least_visited_result = ref("")

/**
 * Retrieves the total length of current user's restricted websites list 
 */
function getTotalSites(){
    number_sites_result.value = list_of_sites.value.length
}

/**
 * Retrieves the most visited and least visited restricted websites
 */
function getVisitedResults(){
    let num_of_zero_visit_sites = 0

    list_of_sites.value.forEach((site) => {
        if(site.num_visited == 0){
            num_of_zero_visit_sites ++
        }
    })

    if(num_of_zero_visit_sites == list_of_sites.value.length){
        most_visited_result.value = "Please log any visits for restricted websites"
        least_visited_result.value = "Please log any visits for restricted websites"
    }
    else{
        let tempArr = list_of_sites.value.sort((a, b) => a.num_visited - b.num_visited)
        most_visited_result.value = tempArr[tempArr.length-1].link
        least_visited_result.value = tempArr[0].link
    }
}

// Gets the current user's restricted websites list
onMounted(async () => {
    let result = await AuthenticationService.restrictedWebsitesList();
    list_of_sites.value = result.data.list

    if(list_of_sites.value.length > 0){
        getTotalSites();
        getVisitedResults();
    }
    else{
        number_sites_result.value = "Please add a website"
        most_visited_result.value = "Please log any visits for restricted websites"
        least_visited_result.value = "Please log any visits for restricted websites"
    }
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