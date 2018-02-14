var path = require('path')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var PrerenderSpaPlugin = require('prerender-spa-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
    
module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/dist/',
	   filename: '[name].[chunkhash].js'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {}
					// other vue-loader options go here
				}
			},
{
test: /\.css$/,
				use: [
{loader: "style-loader"},
{loader: "css-loader"}
]
},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
						{
				test: /\.json$/,
			use: [{loader: "json-loader"}]
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			}
		]
	},
  plugins: [
    new CopyWebpackPlugin([{
      from: 'src/static'
    }]),
			new HtmlWebpackPlugin({
  filename: 'index.html',
  template: 'index.html',
  inject: true,
  chunksSortMode: 'dependency'
}),    
    new PrerenderSpaPlugin(
      path.join(__dirname, 'dist'),
//you can add more urls
      [ '/']
    )
  ],
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js'
		}
	},
	performance: {
		hints: false
	},
	devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map'
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin(),    
		new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  minChunks: function (module) {
    return module.context && module.context.indexOf('node_modules') !== -1;
  }    
}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
		

	])
}
