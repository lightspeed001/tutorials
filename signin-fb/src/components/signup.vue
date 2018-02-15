<template>
<div class="content">   
        <h2 class="content-head is-center" style="visibility:hidden;">Excepteur sint occaecat cupidatat.</h2>
 <div class="pure-g ">
    <div class="pure-u-1 pure-u-md-1-8"> 
   
	</div>
    <div class="pure-u-1 l-box pure-u-md-3-4">
	      <h2 class="content-subhead is-center">Signup</h2>
	      <form class="pure-form is-center" @submit.prevent="signup">
		<fieldset>
		<div class="pure-control-group">		
			<input id="email" class="pure-input-3-4" type="text" v-model="email" @input="$v.email.$touch()" placeholder="Email" required/>
			<input id="name" type="text" class="pure-input-3-4" v-model="username" @input="$v.username.$touch()" placeholder="Username" required/>			
			<input id="password" v-model="password" class="pure-input-3-4" type="password" @input="$v.password.$touch()" placeholder="Password" required/>
			<input id="rep_pass" v-model="passwordConfirm" class="pure-input-3-4" type="password" @input="$v.passwordConfirm.$touch()" placeholder="Repeat Password" required/>		    
		</div>    
		<label for="cd" class="pure-checkbox">
				<input id="cd" type="checkbox" @click="swAccept"  value="someVal" > I understood the Terms and Conditions
			</label>    
		</fieldset>
		
        <button class="pure-button pure-input-3-4 pure-button-primary" :disabled="isDis">Submit</button>
	</form>  
	
	</div>
    <div class="pure-u-1 pure-u-md-1-8">    
   
	</div>
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
				passwordConfirm: '',
				username:'',
				accept:false,
				isDis:false
			}			
		},		
		methods: {
		signup() {		
			if(this.accept){
if(this.$v.$invalid) { this.$v.$touch(); return }   

		var pp = this.$Progress
        pp.start()
		try{
		this.isDis = true
		 this.$store.dispatch({
					type: 'signup',
					email: this.email,
					password: this.password,
					username: this.username
				})
							 							
				setTimeout(()=>{
                				this.email = ''
				this.password = ''
				this.passwordConfirm = ''  
				this.username = ''  				
pp.finish(); 				
				this.isDis = false    
this.$toasted.success('Success! Please wait..')          				
this.$store.dispatch('acSignError',0)
			this.$router.push('home');
this.$v.$reset()
				},6000);  
		}  catch(error) {
                    this.$toasted.error('Sowwy, something went wrong!')
					console.log(error)
				
					pp.fail()
				this.$store.commit('AuthError')
		            this.isDis = false
  	                this.swAccept()        
			}    
			
			} else {
			   this.$toasted.info('Please accept terms!')
			}
	
			},
			signupTest(){   	
var pp = this.$Progress			
			 pp.start()
			if(this.accept){
console.log(this.email+' '+this.username+' '+this.password)
setTimeout(function(){pp.finish();},4000)
				} else {
setTimeout(function(){ pp.fail();},4000)
				}   
			},
			swAccept(){			
				return this.accept = !this.accept;
			}
		},
		validations: {
                username: {
                    required,
                    minLength: minLength(3)
                },
                email: {
                    required,
                    email
                },
                password: {
                    required,
                    minLength: minLength(8)
                },
                passwordConfirm: {
                    sameAs: sameAs('password')
                }    	 
			}
	}
</script>