import fb from "firebase"
import "firebase/firestore"
var conf = {
    apiKey: "AIzaSyAc-3BK1LI5cFEgin1XHTI0-ia9glG_agY",
    authDomain: "fir-479ec.firebaseapp.com",
    databaseURL: "https://fir-479ec.firebaseio.com",
    projectId: "fir-479ec",
    storageBucket: "fir-479ec.appspot.com",
    messagingSenderId: "322792651330"
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