<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import HelloWorld from './components/HelloWorld.vue'
import PersonalPage from './views/PersonalPage.vue'

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
      <div class="ml-10">
        <v-btn to="/login">
          Login
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

<style scoped>
header {
  line-height: 1.5;
  max-height: 50vh;
  place-items: center;
  margin-bottom: 30px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

header > h1{
  display: flex;
  justify-content: center;
}

nav {
  width: 100%;
  font-size: 12px;
  /* text-align: center; */
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

#below-nav-content{
  display: flex;
  justify-content: center;
}

#below-nav-content > div > p{
  margin-bottom: 30px;
}

/* @media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
