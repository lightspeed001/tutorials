import Vue from 'vue'
import Vuex from 'vuex'
import fbscript from './fbscript'
import vuexCache from 'vuex-cache'
import createMutationsSharer from 'vuex-shared-mutations'

const user = {
	  state: {
        authenticated: false,
        authError: null,
		currentUser: null
    },
    plugins: [vuexCache, createMutationsSharer({ predicate: ['AuthUser', 'AuthError'] })],
    mutations: {
        AuthUser(state) {
            state.authenticated = true
            state.authError = null
        },
        AuthError(state, e) {
            state.authError = e
			if(state.currentUser){state.currentUser = null}     
			if(state.authenticated){state.authenticated = false}  
        },
		AddUser(state,email){
			state.currentUser = email
			state.authenticated = true
			console.log(email)
		},
		DelUser(state){
			state.currentUser = null
		}
    },
    actions: {
    signin({ commit }, { email, password }) {
	 fbscript.si_Email(email, password)
	commit('AddUser',email)    	  
        },
    signup({ commit }, {email, password,username }) {
	fbscript.signUp(email,password,username)           
	commit('AddUser',email)
        },
		loginError({commit}){
		commit('AuthError')
		},
		isAuth({commit}){
		console.log(fbscript.isSignedIn())    
		},
        s_google() {
    
        },
        s_facebook() {

        }
    }    
}

export default user