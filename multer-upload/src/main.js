import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('./components/home.vue')   
const NotFound = () => import('./components/404.vue') 
const Privacy = () => import('./components/privacy.vue')
const Upload = () => import('./components/avatar.vue')

import "./assets/css/pure-min.css"
import "./assets/css/grids-responsive-min.css"
import "./assets/css/pure-extras.css"

import "vue-awesome/icons/home"
import "vue-awesome/icons/search"
import Icon from "vue-awesome/components/Icon.vue"
Vue.component('icon',Icon);
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)

import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
    color: '#ADE027',
    failedColor: '#F43D41',
    thickness: '5px',
    transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
})

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import VModal from 'vue-js-modal'
Vue.use(VModal);

import Toasted from 'vue-toasted'
Vue.use(Toasted, {
    theme: 'bubble',
    position: 'top-right',
    duration: 2300
})   


Vue.use(Router);
const router = new Router({
    mode: 'history',
    routes: [
       { path: '/', component:Home, 
	   children: [
	   {path:'404', from: '*', component:NotFound}
	   ]
	   }, 
        { path: '/about', name: 'about', component: Privacy },
        { path: '/faq', name: 'faq', component:Privacy},
        { path: '/explore', name: 'explore', component: Privacy },
        { path: '/terms', name: 'terms', component: Privacy },
        { path: '/cookies', name: 'cookies', component: Privacy },
        { path: '/privacy', name: 'privacy', component: Privacy },
        { path: '/copy', name: 'copy', component: Privacy },
        { path: '/login', name: 'login', component: Privacy },
		{ path: '/signup', name: 'signup', component: Privacy },
		{ path: '/signin', name: 'signin', component: Privacy },
		{ path: '/test', name: 'test', component: Privacy },
		{ path: '/upload', name: 'upload', component: Upload}
    ]       
});     

import App from './App.vue'   


new Vue({
  el: '#app',
	router,   
  render: h => h(App)
})
