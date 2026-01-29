import { createStore } from 'vuex'

export default createStore({
  state: {
    token: localStorage.getItem('token') || null,
    user: null
  },

  getters: {
    isLoggedIn: state => !!state.token,
    getUser: state => state.user
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    SET_USER(state, user) {
      state.user = user
    },
    LOGOUT(state) {
      state.token = null
      state.user = null
      localStorage.removeItem('token')
    }
  }
})
