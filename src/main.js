import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Vue3EasyDataTable from 'vue3-easy-data-table';
//import 'vue3-easy-data-table/dist/style.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/js/bootstrap.min";

const app = createApp(App)
//app.component('EasyDataTable', Vue3EasyDataTable);

app.use(router)

app.mount('#app')
