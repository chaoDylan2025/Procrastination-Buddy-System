<script lang="js">
    import AuthenticationService from '../services/AuthenticationService';
    import { RouterLink, RouterView } from 'vue-router'
    import {useRouter} from 'vue-router'
    import { ref, onMounted } from 'vue'
    export default {
        data () {
        return {
            dialog: false,
            dialog2: false,
            }
        },
    } 
</script>

<template>
    <v-app>
        <div id="buttons-for-personal-page" class="mt-10">
            <v-btn @click="dialog = true">
                Edit Content
            </v-btn>
            <v-dialog v-model="dialog"
            width="500">
                <v-card
                width="500"
                title="Select and edit current images on page"
                >
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

            <v-btn @click="dialog2 = true"> 
                Storage 
            </v-btn>
            <v-dialog v-model="dialog2"
            width="500">
                <v-card
                width="500"
                title="Current Storage"
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
        </div>
    </v-app>

</template>

<style lang="css" scoped>
#buttons-for-personal-page{
    display: flex;
    justify-content: center;
}
#buttons-for-personal-page > button {
    margin-right: 45px;
}
</style>