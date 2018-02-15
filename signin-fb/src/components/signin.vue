<style></style>

<template>
<div class="content">   
        <h2 class="content-head is-center" style="visibility:hidden;">Excepteur sint occaecat cupidatat.</h2>
 <div class="pure-g ">
    <div class="pure-u-1 pure-u-md-1-8"> 
   
	</div>
    <div class="pure-u-1 l-box pure-u-md-3-4">
	      <h2 class="content-subhead is-center">Login</h2>
	      <form class="pure-form is-center" @submit.prevent="signin">
		<fieldset>
		<div class="pure-control-group">		
		<input id="email" class="pure-input-3-4" type="text" v-model="email" @input="$v.email.$touch()" placeholder="Email" required/>
		<input id="password" v-model="password" class="pure-input-3-4" type="password" @input="$v.password.$touch()" placeholder="Password" required/>
		</div>      
		</fieldset>		
    <button :class="buttClass" :disabled="isDis">Submit</button>
	</form>	
	</div>
    <div class="pure-u-1 pure-u-md-1-8"></div>
</div> 
</div>          
</template>

<script>
import { required, minLength, sameAs, email } from 'vuelidate/lib/validators'

	export default {
		data() {   
			return {
				email: '',
				password: '',
				buttClass: ['pure-button pure-input-3-4 pure-button-primary'],
				isDis: false
			}
		},
		methods: {
		signin() {   
		var pp = this.$Progress		
	if (this.$v.$invalid) { this.$v.$touch(); return }   
		pp.start()   	
		try {
		this.$store.dispatch({
					type: 'signin',
					email: this.email,
					password: this.password
				})
			
				setTimeout(() =>{			
		
		console.log('Past ac get user!')
		this.$toasted.success('Success! Please wait..') 
				this.isDis = false
				this.email = ''
				this.password = ''				
			this.$router.push('home')
				var uu = localStorage.getItem('cu');
				pp.finish()
				},4000);
		} catch(error){
		console.log(error);
		this.$store.dispatch('loginError');
		this.$toasted.error('Whoops, something went wrong..');
		this.isDis = false;
		pp.fail()
		} 
			}		
		},
		validations: {
                email: {
                    required,
                    email
                },
                password: {
                    required,
                    minLength: minLength(8)
                }    	 
			}			
	}   
</script>   