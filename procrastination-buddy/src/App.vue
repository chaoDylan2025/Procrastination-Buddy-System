<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import PersonalPage from './views/PersonalPage.vue'
import { onMounted } from 'vue';

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function randomString(){
  let arr = ["Hello", "World", "!"];
  return arr[getRandomInt(0,3)];
}

</script>

<template>
  <header>
    <div id="header-button-area">
      <RouterLink to="/login">
        <button id="login-button">Login</button>
      </RouterLink>
    </div>
    <h1>Procrastination Buddy System</h1>
    <nav class="nav_bar">
      <RouterLink to="/">About</RouterLink>
      <RouterLink to="/about">Resources</RouterLink>
      <RouterLink to="/about">Personal Page</RouterLink>
      <RouterLink to="/about">Tasks</RouterLink>
      <RouterLink to="/about">Focus List</RouterLink>
    </nav>
  </header>

  <!-- <div id="summary_of_procrastination_buddy">
    <p> Become focused with Procrastination Buddy! A system that will help you focus on work, so you can get a lot done!</p>
  </div> -->
  <div id="below-nav-content">
    <div>
      <p> Welcome to the Procrastination Buddy System! </p>
      <p> A system that is meant to help people stay focused on the tasks that they need to do</p>
    </div>
  </div>

  <RouterView />

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
