import { ref } from 'vue'
import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => ({
    name: "",
    email: "",
    isLoggedIn: false,
    imageLayout: ref(4) // For debugging
  }),
  persist: {
    storage: sessionStorage,
  },
})