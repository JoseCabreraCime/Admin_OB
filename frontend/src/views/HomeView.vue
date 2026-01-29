<template>
  <div>
    <h1>Vue 3 + Laravel 12</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import api from '@/axios'

export default {
  name: 'HomeView',
  data() {
    return {
      message: 'Cargando...',
    }
  },
  mounted() {
    api.get('/ping')
      .then(response => {
        this.message = response.data.message
      })
      .catch(error => {
        this.message = 'Error al conectar con el backend'
        console.error(error)
      })
  },
}
</script>
