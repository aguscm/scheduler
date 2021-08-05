import { createApp } from 'vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import $ from 'jquery';
import "@/styles/global.scss";

//Font awesome
import { faBars, faHome, faBook, faSearch, faPlus, faPen, faFileUpload, faBuilding, faUsers, faCalendarAlt, faCalendarCheck, faCalendarPlus, faSkull, faCircle, faClipboardList, faFilter } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons'
library.add(faGoogle, faGithub, faBars, faClipboardList, faHome, faBook, faSearch, faPlus, faPen, faFileUpload, faBuilding, faUsers, faCalendarPlus, faCalendarAlt, faCalendarCheck, faSkull, faCircle, faFilter);



createApp(App).use(store).use($).use(router).component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
