import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import VueRouter from 'vue-router'
import Home from './components/Home'
import navbar from './components/navbar'

Vue.use(VueRouter);
Vue.component('App-nav',navbar);
const routes=[
   {path:'/',component:Home},
  
]
const router = new VueRouter({
  routes
})
Vue.use(BootstrapVue);

Vue.config.productionTip = false

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
