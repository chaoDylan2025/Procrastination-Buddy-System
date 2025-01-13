import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const userStore = defineStore('user', {
  state: () => ({
    email: "",
    isLoggedIn: false,
  }),
  persist: true,
})
