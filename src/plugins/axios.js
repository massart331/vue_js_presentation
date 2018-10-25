import Vue from 'vue';
import axios from 'axios';

let config = {
  baseURL: 'https://app.ecarsuite.com/api/',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'X-Partner-Key': 'W1eLAEFdxDuLiMeSKpNaMqmiN7hUAO5oITOER3Bt',
    'Content-Type': 'application/json',
  }
};

const AxiosPlugin = {
  install(Vue, options) {
    Vue.axios = window.axios = axios.create(options)
  }
}

Vue.use(AxiosPlugin, config)
