<script setup>
import { ref, onMounted } from "vue";
import { userStore } from "./stores/user";
import AuthenticationService from './services/AuthenticationService'

const user = userStore()

const showWelcomeMsg = ref(true)

const links = ref([
  { text: "About", to: "/about"},
  { text: "Motivation Page", to: "/MotivationPage"},
  { text: "Focus List", to: "/FocusList"},
]);

const profile_tabs = ref([
  {text: 'Focus List Statistics', to: "/Stats"},
  {text: 'Profile Information', to: "/Profile"}
])

/**
 * Logout the current user
 */
async function logUserOut(){
  try{
    const result = await AuthenticationService.logoutUser()
    if(result.data.status == true){
      user.isLoggedIn = false
    }
  }
  catch (error){
    console.error(error)
  }
}

onMounted(() => {
  // Clear session storage if user is logged out
  if(user.isLoggedIn == false || user.email == null){
    sessionStorage.clear()
  }
})
</script>

<template>
  <v-app>
    <v-app-bar color="red">
      <div class="mx-3">
        <v-app-bar-title>
          <v-btn to="/">
            <p class="text-h6"> Procrastination Buddy System </p>
          </v-btn>
        </v-app-bar-title>
      </div>

      <div class="mx-10">
        <v-btn @click="showWelcomeMsg = false" v-for="link in links" :key="link.text" :to="link.to">
          {{ link.text }}
        </v-btn>
      </div>

      <div class="ml-10" v-if="user.isLoggedIn === false || user.email == null">
        <v-btn to="/login">
          Login
        </v-btn>
      </div>

      <div class="ml-10" v-else>
        <v-menu open-on-hover open-delay="1000"
        close-delay="1000">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props">
              Profile
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(tab, index) in profile_tabs"
              :key="index"
            >
              <v-list-item-title>
                <v-btn size="small" :to="tab.to">
                  {{ tab.text }}
                </v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        
        <v-btn to="/" @click="logUserOut">
          Logout
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </v-main>
  </v-app>
</template>