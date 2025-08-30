<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import AuthenticationService from '../../services/AuthenticationService'

</script>

<template>
    <v-container>
        <v-row>
            <v-col></v-col>
            <v-col>
                <p class="text-center text-h4"> Focus List Stats </p>
            </v-col>
            <v-col></v-col>
        </v-row>

        <v-row class="mt-10" justify="center">
            <div>
                <div class="mb-5 d-flex flex-column text-center">
                    <div>
                        
                    </div>

                    <div>
                        <p class="mt-2"> Number of restricted websites </p>
                    </div>
                </div>

                <div class="mb-5 d-flex flex-column text-center">
                    <div>
                    </div>
                    
                    <div>
                        <p class="mt-2"> Most visited restricted website </p>
                    </div>
                </div>

                <div class="d-flex flex-column text-center">
                    <div>
                    </div>
                    
                    <div>
                        <p class="mt-2"> Least visited restricted website </p>
                    </div>
                </div>
            </div>

            
        </v-row>
    </v-container>
</template>