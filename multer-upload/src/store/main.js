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
	sendfile({commit},{file,name}){
let upReq = superagent.post("/image/upload") 

upReq.attach('file',file)
upReq.attach('name',name)
upReq.field('upload_preset','A_SIMPLE_PRESET')

upReq.end(function(error, response){
if(error){throw new Error(error)}
else{console.log(response.body['url']);commit('AddImg',response.body['url'])}     
})
			}
	}
}

export default main