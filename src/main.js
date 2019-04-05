import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import VueResource from 'vue-resource';
import { routes } from './routes';
import { store } from './store/store';

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options.root = 'https://vuejs-1b1c4.firebaseio.com/';

Vue.filter('currency', (value) => {
  value = value.toFixed(2);
  return '$' + value.toLocaleString();
});

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
