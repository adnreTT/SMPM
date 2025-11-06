
import { defineStore } from 'pinia'
import { loginApi, parseToken } from '../services/auth'

const KEY = 'smpm_auth_token'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem(KEY) || null,
    user: null
  }),
  getters: {
    isAuthenticated: (state) => {
      if(!state.token) return false
      const payload = parseToken(state.token)
      if(!payload) return false
      const now = Math.floor(Date.now()/1000)
      return payload.exp && payload.exp > now
    },
    email: (state) => state.user?.email || '',
    name: (state) => state.user?.name || ''
  },
  actions: {
    async login(email, password){
      const { token, user } = await loginApi(email, password)
      this.token = token
      this.user = user
      localStorage.setItem(KEY, token)
    },
    logout(){
      this.token = null
      this.user = null
      localStorage.removeItem(KEY)
    },
    hydrateFromToken(){
      if(!this.token) return
      const payload = parseToken(this.token)
      if(payload){
        this.user = { id: payload.sub, name: 'Admin SMPM', email: payload.email, role:'gestor' }
      }
    }
  }
})
