import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import NotFound from './views/404'

import store from './store'

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '*',
      component: NotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  let resellerInfo = JSON.parse(localStorage.getItem('resellerInfo'));

  if (resellerInfo) {
    store.commit('reseller/setResellerInfo', resellerInfo)
  } else {
    axios.get('reseller')
        .then(response => {
          localStorage.setItem('resellerInfo', JSON.stringify(response.data))
          resellerInfo = response.data
          store.commit('reseller/setResellerInfo', response.data)
        })
  }

  if (to.params.hasOwnProperty('id')) store.commit('steps/setCurrentStep', to.meta.number)

  next()
});

export default router
