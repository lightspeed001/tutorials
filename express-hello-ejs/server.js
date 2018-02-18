const express = require('express')
const path = require('path');
const http = require('http')
const bodyParser = require('body-parser')

const app = express()
const cors = require('cors')({
  origin: true
});
app.set('view engine','ejs')
app.set('views',path.join( __dirname, './views'))

if(process.env.NODE_ENV === 'development'){
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const config = require('./webpack.config')
    const compiler = webpack(config)

    app.use(
        webpackDevMiddleware(compiler, {
            noInfo: true,
            publicPath: config.output.publicPath
        })
    )
	  app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));   
}

app.use(bodyParser.json());

app.get("/hello", (req, res) => {
 res.send("hello");
});


app.get("/hello-json", (req, res) => {
 res.json({"msg":"hello there"});
})


app.use('/dist', express.static(process.cwd() + '/dist'))

app.use((req, res) => res.sendFile(__dirname + '/index.html'))

app.listen(3000, () => console.log('Server Listening on PORT 3000'))