<style lang="scss">
  img:hover {
    cursor: pointer;
  }
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }
  
  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }
  
  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }
  
  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>   
<template>
    <div class="content">
	       <h2 class="content-head is-center" style="visibility:hidden;">Excepteur sint occaecat cupidatat.</h2>
 <div class="pure-g" style="margin-top:10%">
  
    <div class="pure-u-1 pure-u-md-1"> 
      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">        
        <div class="dropbox">
          <input type="file" multiple :name="uploadFieldName" :disabled="uploaded" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
            :accept="types" class="input-file">
            <p v-if="isInitial">
              Drag your file(s) here to begin<br> or click to browse
            </p>
            <p v-if="isSaving">
              Uploading {{ fileCount }} files...
            </p>
        </div>
      </form>
	</div>	
	</div>
    </div> 
</template>

<script>

  const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

  export default {
    name: 'app',
    data() {
      return {
        uploadedFiles: [],
        uploadError: null,
        currentStatus: 0,
		    uploadStatus : null,
        uploadFieldName: 'file',
		    imgText: null,
		    isDis: true,
        types: 'image/*',
        selected: null,
        uploaded: false
      }
    },
    computed: {
      isInitial(){
        return this.uploadStatus === STATUS_INITIAL;
      },
      isSaving(){
        return this.uploadStatus === STATUS_SAVING;
      },
      isSuccess(){
        return this.uploadStatus === STATUS_SUCCESS;
      },
      isFailed(){   
        return this.uploadStatus === STATUS_FAILED;
      }
    },   
    methods: {
	reset() {
        // reset form to initial state
        this.uploadStatus = STATUS_INITIAL;
        this.uploadedFiles = [];
        this.uploadError = null;
      },  
	  save(formFile, fileName){
	 try{	 
   this.uploaded = true
this.$store.dispatch({
   type: 'sendfile',
    file: formFile,
    name: fileName
    })
setTimeout(() => { 
   console.log('Should be a success now!')
   this.currentStatus = (this.currentStatus + 1)
   this.uploadedFiles = [];
   this.currentStatus = STATUS_SUCCESS;
   this.isDis  = false;
   this.$toasted.success('Upload success, pls wait..');
    },3000)	  
	  
	 } catch(error){
	 console.log(error)
this.$toasted.error('Sowwy, something went wrong!')
this.uploaded = false
this.uploadedFiles = [];
this.isDis  = true;
this.currentStatus = 0 
	 }
        	  
	  },
	  pushthis(){
	  console.log('The form is pushed here!!!')
	  },
      filesChange(fieldName, fileList) {
        // handle file changes
        if(!fileList.length) return;
		if(this.currentStatus>=0){
this.save(fileList[this.currentStatus], fileList[this.currentStatus].name)     
console.log(fileList[this.currentStatus].name)   
		}
      },
      pushUpdate(){
        try{
          this.isDis = true
if(this.selected==='image'){
  this.$store.dispatch('acUpdateP',{
img: this.$store.state.main.uploadedImgs[0],
data: imgText
  });

  setTimeout(()=>{this.$store.dispatch('acClear');},3000)
} else {
   this.$store.dispatch('acUpdateV',{
img: this.$store.state.main.uploadedVids[0],
data: imgText
  });

   setTimeout(()=>{this.$store.dispatch('acClear');},3000)
} 
this.$toasted.success('Success! Please wait..')
setTimeout(()=>{this.$router.push('profile')},4000)
        } catch(error){
this.$toasted.error('Sowwy, something went wrong!')
console.log(error);
        }
      }
    },
    mounted() {
      this.reset();
    }   
  }

</script>      