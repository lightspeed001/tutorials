import fb from "firebase"
import "firebase/firestore"
var conf = {
/**
Your firebase details here :)
**/
}
fb.initializeApp(conf);    
var db = fb.firestore();

var fbscript = {
	isSignedIn: function(){
		console.log('Auth Trigger Here!')
		console.log(fb.auth().currentUser)   
			return (fb.auth().currentUser!==null);	
	},
signUp: function(email, password,username){
db.collection("users").add({
username: username,
email: email,
date: (new Date())
}).then(function(docRef) {
	fb.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        console.log('sign up error');   
		throw new Error(error);		
    });      
console.log("Document written with ID: ", docRef.id);
}).catch(function(error) {
console.error("Error adding document: ", error);
});    
	},
	si_Email: function(email, password){
	fb.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    console.log('sign in error!')   
   throw new Error(error);		
    });
	},
	postUpdate: function(update){
	db.collection("updates").add(update);
	}
		
}
export default fbscript