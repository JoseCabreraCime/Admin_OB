/******************NOTAS******************/

// 1.- SEPARAR LAS VISTAS DE LOS CATALOGOS CON LOS DE LOS MODULOS.
// 2.- LOS NOMBRES DE LOS COMPONENTES SIEMPRE IRAN CON MAYUSCULAS.
//     EL PATH Y EL COMPONENT COMIENZAN CON MAYUSCULA CADA INICIO DE PALABRA.
//     EL NAME COMIENZA CON MINUSCULA.
// 3.- SI REQUIERE PROPS, ACTIVARLO CON UN TRUE.

/**************FIN DE NOTAS**************/

// -------------------------------------------------------------------------- IMPORTACIONES PRINCIPALES -----------------------------------------------------------
import { createRouter, createWebHistory } from 'vue-router'
import Store from '@/store'


// -------------------------------------------------------------------------- IMPORTACIONES GENERALES --------------------------------------------------------------
import Login from '@/views/Login.vue'
import HomeView from '../views/HomeView.vue'


const routes = [
  { 
    path: "/",
    name: "login",
    component: Login,
  }, { 
     // ------------------------------------------------ RUTAS GENERALES ------------------------------------------------
    path: '/Home', 
    name: 'home', 
    component: HomeView,
    meta: { requiresAuth: true }

  }, { 
    path: '/About', 
    name: 'about', 
    meta: { requiresAuth: true },
    component: () => import(
      /* webpackChunkName: "about" */ 
      '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/* ---------------------------- GUARD GLOBAL (JWT) ---------------------------- */
router.beforeEach((to, from, next) => {

  // ¿La ruta requiere autenticación?
  if (to.matched.some(record => record.meta.requiresAuth)) {

    // ¿El usuario está logueado?
    if (Store.getters.isLoggedIn) {
      next()
      return
    }

    // No autenticado → regresar al login
    next({ name: 'login' })

  } else {
    next()
  }
})

export default router
