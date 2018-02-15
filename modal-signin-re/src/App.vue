<style>
    @import './assets/css/page-styles-main.css';
    @import './assets/css/vue2-animate.min.css';
</style>
       
<template>
       <div>
           <vue-progress-bar></vue-progress-bar> 
           <div class="header">
    <div class="home-menu pure-menu pure-menu-horizontal pure-menu-fixed">	
        <router-link class="pure-menu-heading" to="/">Your Site</router-link>
        <ul class="pure-menu-list">     
		     <li v-show="checkVis" class="pure-menu-item pure-form">
			 <input type="text"  name="someThing" placeholder="Search" class="pure-input-rounded">
			 <a id="searchB" href="#" class="pure-button"><icon name="search"></icon></a>   
			 </li>
            <li class="pure-menu-item"><router-link to="/" class="pure-menu-link">Home</router-link></li>
            <li class="pure-menu-item"><router-link to="explore" class="pure-menu-link">Tour</router-link></li>
            <li class="pure-menu-item"><router-link to="login" class="pure-menu-link">Login</router-link></li>
			<li class="pure-menu-item" v-show="checkMain"><router-link to="settings" class="pure-menu-link"><icon name="home" scale="2"></icon></router-link></li>
        </ul>
    </div>
</div>   
	   
        <div class="content-wrapper" >   
            <transition name="zoom">
                <router-view ></router-view>  
            </transition>
            <div class="footer l-box">	
   	<div class="pure-g is-center">
 <div class="pure-u-1 pure-u-md-1-8">
 <router-link to="/" style="color:grey">&copy; Company Inc.</router-link>
 </div>
<div class="pure-u-1 pure-u-md-1-8">
 <router-link to="explore" style="color:#1f8dd6;">Tour</router-link>
 </div>
<div class="pure-u-1 pure-u-md-1-8">
 <router-link to="terms" style="color:#1f8dd6;">Terms</router-link>
 </div>
<div class="pure-u-1 pure-u-md-1-8">
 <router-link to="privacy" style="color:#1f8dd6;">Privacy</router-link>
 </div>
<div class="pure-u-1 pure-u-md-1-8">
 <router-link to="cookies" style="color:#1f8dd6;">Cookies</router-link>
 </div>
<div class="pure-u-1 pure-u-md-1-8">
 <router-link to="copy" style="color:#1f8dd6;">Copyright</router-link>
 </div>
<div class="pure-u-1 pure-u-md-1-8">
 <router-link to="about" style="color:#1f8dd6;">About</router-link>
 </div>
<div class="pure-u-1 pure-u-md-1-8">
 <router-link to="faq" style="color:#1f8dd6;">Faq</router-link>
 </div>    
	</div>     			
    </div>
    </div>		 
    </div> 
</template>

<script>

export default {
  name: 'app',
 /**props: {
 * value: Boolean
 },**/
  data(){
      return {
          isHome: false,
		  isMain : ['/settings','/test']
      }
  },
  computed: {
  checkMain(){
 
  return  (this.isMain.indexOf(this.$route.path)>-1);   
  },
  checkVis(){
  if(this.$route.path.indexOf('/w/')>-1){
  //console.log('This is the user id: '+ this.$route.path.replace('/w/','')) => this is right
  return  true;   
  } else {return (this.isMain.indexOf(this.$route.path)>-1); }  
  }
  },
  methods: {
      checkHome: function(){
          return (this.$router.name==='home');
      }
  }
 /** ,
  computed:{
  dynamicComponent() {  
 switch(this.$route.name){
 case 'home':
 return MainNav;
 case 'profile':
 return NavInfo;
 
 }
  }
  }***/  
}
</script>

<style>

</style>
