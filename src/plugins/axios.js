// src/plugins/axios.js
import axios from 'axios';

// Set the base URL for your API
axios.defaults.baseURL = ''; // Replace with your API URL

export default {
  install: (Vue) => {
    Vue.prototype.$axios = axios;
  },
};
