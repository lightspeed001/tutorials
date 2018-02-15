const express = require('express')
const path = require('path');
var readline = require('readline');
const http = require('http')
const google = require('googleapis')
const drive = google.drive('v3')
const bodyParser = require('body-parser')
const multer = require('multer')
const fs = require('fs')
const cors = require('cors')

var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './uploads')
	},
	filename: function(req, file, callback) {
		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})

const app = express()
app.use(bodyParser.json())

function emptyFiles(){
fs.readir('./uploads', (err,files) =>{
	if(err) throw err;
	if(files.length>=5){
		console.log('deleting happening!')
		for(const file of files){
			fs.unlink(path.join('./uploads', file), err => {
				if(err) throw err;
			})
		}
	} else {console.log('Sowwy, nothing to delete!')}
})
}

/**
app.set('view engine','ejs')
app.set('views',path.join( __dirname, './views'))
**/

if(process.env.NODE_ENV === 'development') {
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const config = require('./webpack.config')
    const compiler = webpack(config)

    app.use(
        webpackDevMiddleware(compiler, {
            noInfo: true,
            publicPath: config.output.publicPath
        });
    )
	  app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));   
}

app.get("/api/hello", (req, res) => {
    res.json({"msg":"hello there"});
	});
	
function uploadG(data,name){
//send to storage ;)
console.log('data',' name');
}

app.post("/api/upload", (req, res, next) => {
	var upload = multer({
		storage: storage
	}).single('file')
	
	upload(req, res, function(err){
	var bitmap = fs.createReadStream('./uploads/' + req.file.filename);
	var uu = uploadG(bitmap,req.file.filename);
})
})

app.use('/dist', express.static(process.cwd() + '/dist'))

app.use((req, res) => res.sendFile(__dirname + '/index.html'))

app.listen(3000, () => console.log('Server Listening on PORT 3000'))