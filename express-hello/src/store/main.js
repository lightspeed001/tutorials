import Vue from 'vue'
import Vuex from 'vuex'
import fbscript from "./fbscript"
import vuexCache from 'vuex-cache'
import createMutationsSharer from 'vuex-shared-mutations'
import superagent from "superagent"

const main = {
	state: {
		uploadedImg: 0,
		uploadError: null,
		uploadedImgs: []
	},
	plugins: [vuexCache, createMutationsSharer({ predicate: ['AddImg', 'UpError'] })],
    mutations: {
        AddImg(state,url){
			state.uploadedImg = (state.uploadedImg + 1)
			state.uploadedImgs.push(url)
			console.log(state.uploadedImgs)
		},
		UpError(state, e){
			state.uploadError = e;
			console.log(e)
		}
    },
    actions: {   
		sendfile({commit},{file}){
		const cloudName = 'turndup';
let upReq = superagent.post("https://api.cloudinary.com/v1_1/"+cloudName+"/image/upload")

upReq.attach('file',file)
upReq.field('upload_preset','e3tyj5ga')

upReq.end(function(error, response){
if(error){throw new Error(error)}
else{console.log(response.body['url']);commit('AddImg',response.body['url'])}     
})
//context.rootState.user.currentUser add to updates
			}
	}
}

export default main