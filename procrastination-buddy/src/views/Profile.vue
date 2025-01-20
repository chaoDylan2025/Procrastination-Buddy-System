<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import { ref, onMounted } from 'vue'
    import AuthenticationService from '../services/AuthenticationService'

    // Importing components
    import ChangeEmail from '../components/ChangeEmail.vue'
    import ChangePassword from '../components/ChangePassword.vue'
    import DeleteAccount from '../components/DeleteAccount.vue'

    var open_email_change_dialog = ref(false)
    var open_change_password_dialog = ref(false)
    var open_delete_account_dialog = ref(false)

</script>

<template>
    <v-container>
        <v-row class="mt-10">
            <v-col></v-col>
            <v-col>
                <v-btn class="ml-16" @click="open_email_change_dialog = true"> Change Email Address </v-btn>
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
                <v-btn class="ml-16"> Logout </v-btn>
            </v-col>
            <v-col></v-col>
        </v-row>
    </v-container>

    <ChangeEmail :open_change_email_dialog="open_email_change_dialog" @close="(state) => open_email_change_dialog = state" />
    <ChangePassword :open_change_password_dialog="open_change_password_dialog" @close="(state) => open_change_password_dialog = state" />
    <DeleteAccount :open_delete_account_dialog="open_delete_account_dialog" @close="(state) => open_delete_account_dialog = state"/>

</template>