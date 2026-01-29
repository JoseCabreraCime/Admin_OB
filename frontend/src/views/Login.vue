<template>
  <div class="login">
    <h2>Login</h2>

    <form @submit.prevent="login">
      <input
        type="email"
        v-model="form.email"
        placeholder="Correo"
        required
      />

      <input
        type="password"
        v-model="form.password"
        placeholder="Contraseña"
        required
      />

      <button type="submit">Entrar</button>

      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import api from '@/services/axios'

export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      error: null
    }
  },
  methods: {
    async login() {
      try {
        const res = await api.post('/login', this.form)

        localStorage.setItem('token', res.data.access_token)

        this.$router.push('/home')
      } catch (e) {
        this.error = 'Credenciales incorrectas'
      }
    }
  }
}
</script>

<style scoped>
.login {
  max-width: 300px;
  margin: 50px auto;
}
.error {
  color: red;
}
</style>