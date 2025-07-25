<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import { ref, onMounted } from 'vue'
    import AuthenticationService from '../../services/AuthenticationService'
    import router from '../../router/index'
    import { userStore } from '../../stores/user'

    // Importing components
    import ChangeEmail from '../../components/Profile/ChangeEmail.vue'
    import ChangePassword from '../../components/Profile/ChangePassword.vue'
    import DeleteAccount from '../../components/Profile/DeleteAccount.vue'

    var open_email_change_dialog = ref(false)
    var open_change_password_dialog = ref(false)
    var open_delete_account_dialog = ref(false)

    const user = userStore()

    async function logUserOut(){
        try{
            const result = await AuthenticationService.logoutUser()
            if(result.data.status == true){
                user.isLoggedIn = false
                router.push('/')
            }
        }
        catch (error){
            console.error(error)
        }
    }

</script>

<template>
    <v-container>
        <v-row class="mt-10">
            <v-col></v-col>
            <v-col>
                <v-row class="mb-4">
                    <v-row>
                        <v-col>
                            <div class="text-h6 font-weight-black">
                                Name:
                            </div>
                        </v-col>
                    </v-row>
               
                    <v-row>
                        <v-col cols="auto">
                           <div style="width: auto;">
                                {{user.email}}
                           </div> 
                        </v-col>
                        <v-col>
                            <v-btn class="ml-16" size="x-small" @click="open_email_change_dialog = true"> Update </v-btn>
                        </v-col>
                    </v-row>
                </v-row>

                <v-row>
                    <v-row>
                        <v-col>
                            <div class="text-h6 font-weight-black">
                                Email:
                            </div>
                        </v-col>
                    </v-row>
               
                    <v-row>
                        <v-col cols="auto">
                           <div style="width: auto;">
                                {{user.email}}
                           </div> 
                        </v-col>
                        <v-col>
                            <v-btn class="ml-16" size="x-small" @click="open_email_change_dialog = true"> Update </v-btn>
                        </v-col>
                    </v-row>
                </v-row>
            </v-col>
            <v-col></v-col>
        </v-row>

        <v-row class="mt-10">
            <v-col></v-col>
            <v-col>
                <v-btn class="ml-16" @click="open_change_password_dialog = true"> Change Password </v-btn>
            </v-col>
            <v-col></v-col>
        </v-row>

        <v-row class="mt-10">
            <v-col></v-col>
            <v-col>
                <v-btn class="ml-16" @click="open_delete_account_dialog = true"> Delete Account </v-btn>
            </v-col>
            <v-col></v-col>
        </v-row>

        <v-row class="mt-10">
            <v-col></v-col>
            <v-col>
                <v-btn class="ml-16" @click="logUserOut"> Logout </v-btn>
            </v-col>
            <v-col></v-col>
        </v-row>
    </v-container>

    <ChangeEmail :open_change_email_dialog="open_email_change_dialog" @close="(state) => open_email_change_dialog = state" />
    <ChangePassword :open_change_password_dialog="open_change_password_dialog" @close="(state) => open_change_password_dialog = state" />
    <DeleteAccount :open_delete_account_dialog="open_delete_account_dialog" @close="(state) => open_delete_account_dialog = state"/>

</template>