<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { userStore } from "./stores/user";

const user = userStore()

const showWelcomeMsg = ref(true)

const links = ref([
  { text: "About", to: "/about"},
  { text: "Resources", to: "/about"},
  { text: "Personal Page", to: "/PersonalPage"},
  { text: "Tasks", to: "/Tasks"},
  { text: "Focus List", to: "/FocusList"},
]);

</script>

<template>
  <v-app>
    <v-app-bar>
      <div class="mx-3">
        <v-app-bar-title>Procrastination Buddy System</v-app-bar-title>
      </div>
      <div class="mx-10">
        <v-btn @click="showWelcomeMsg = false" v-for="link in links" :key="link.text" :to="link.to">
          {{ link.text }}
        </v-btn>
      </div>
      <div class="ml-10" v-if="user.isLoggedIn === false">
        <v-btn to="/login">
          Login
        </v-btn>
      </div>
      <div class="ml-10" v-else>
        <v-btn to="/">
          Profile
        </v-btn>
        <v-btn to="/">
          Logout
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <div v-show="showWelcomeMsg" id="below-nav-content" class="mt-10">
        <div>
          <p> Welcome to the Procrastination Buddy System! </p>
          <p> A system that is meant to help people stay focused on the tasks that they need to do</p>
        </div>
      </div>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </v-main>
  </v-app>

</template>
