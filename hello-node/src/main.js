import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('./components/home.vue')   
const NotFound = () => import('./components/404.vue') 
const Privacy = () => import('./components/privacy.vue')

import "./assets/css/pure-min.css"
import "./assets/css/grids-responsive-min.css"
import "./assets/css/pure-extras.css"

import "vue-awesome/icons/home"
import "vue-awesome/icons/search"
import Icon from "vue-awesome/components/Icon.vue"
Vue.component('icon',Icon);

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
		{ path: '/upload', name: 'upload', component: Privacy}
    ]       
});     

import App from './App.vue'   


new Vue({
  el: '#app',
	router,   
  render: h => h(App)
})
