import Vue from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate';
import router from './router'
import store from './store'
import '@/plugins/axios'
import PreLoader from '@/components/helps/PreLoader'

require('./bootstrap');

Vue.use(VeeValidate);
VeeValidate.Validator.extend('phone', {
  validate: value => !!value.match(/^(\+?[0-9]+)$/)
});

Vue.config.productionTip = false;
Vue.component('pre-loader', PreLoader);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
