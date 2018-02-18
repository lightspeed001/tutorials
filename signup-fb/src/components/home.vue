<template >
<div class="content">   
        <h2 class="content-head is-center" style="visibility:hidden;">Excepteur sint occaecat cupidatat.</h2>
 <div class="pure-g ">
    <div class="pure-u-1 pure-u-md-1-8"> 
   
	</div>
    <div class="pure-u-1 l-box pure-u-md-3-4">
 <h2 class="content-head is-center">Hello Vue</h2>
<div class="is-center">
 <button class="" @click="bbLog">Signup Here</button>
</div>
	</div>
    <div class="pure-u-1 pure-u-md-1-8">    
   
	</div>
</div>
</div>
</template>

<script>
export default {
data(){},
methods: {
		signin(){   
		var pp = this.$Progress;		
	if (this.$v.$invalid) { this.$v.$touch(); return }   
		pp.start()   	
		try {
		this.$store.dispatch({
					type: 'signin',
					email: this.email,
					password: this.password
				})
			
setTimeout(() =>{
this.$modal.hide('log-mod');
console.log('Past ac get user!');
this.$toasted.success('Success! Please wait..');
				this.isDis = false
				this.email = ''
				this.password = ''				
				this.$router.push('profile')  
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
},
bbLog(){
this.$router.push('signup')
}
}
}
</script>
