import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import router from './routes';
import { store } from './store/store';
import axios from 'axios';
import VueRouter from 'vue-router'
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'


axios.defaults.baseURL = 'https://vuejs-1b1c4.firebaseio.com/';


Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueChartkick, { adapter: Chart })

//Vue.http.options.root = '';

Vue.filter('currency', (value) => {
  value = value.toFixed(2);
  return '$' + value.toLocaleString();
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
