const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlElementsWebpackPlugin = require('html-elements-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const SpritesmithPlugin = require('webpack-spritesmith');

const config = {

	entry: './src/js/index.js',

	output: {
		publicPath: '/',
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].bundle.js'
	},

	performance: {
		hints: false,
	},

	stats: {
		children: false,
	},

	resolve: {
		extensions: ['.js', '.jsx', '.sass', '.scss', '.html'],
		modules: [
			'node_modules',
		],
	},

	/**
	 * @link https://webpack.github.io/docs/webpack-dev-server.html
	 */
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		compress: true,
		historyApiFallback: true,
		port: 8080,
		inline: true,
		open: true,
		stats: {
			colors: true,
			hash: false,
			version: false,
			timings: false,
			assets: false,
			chunks: false,
			modules: false,
			reasons: false,
			children: false,
			source: false,
			errors: true,
			errorDetails: true,
			warnings: true,
			publicPath: false,
		}
	},

	module: {
		rules: [
			{
				test: /\.js?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(sass|scss|css)$/,
				use: ExtractTextPlugin.extract({
					use: ['css-loader', 'sass-loader'],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.html$/,
				use: 'html-loader'
			},
			{
				test: /\.(jpg|jpeg|gif|png|svg)$/,
				exclude: /node_modules/,
				use: 'url-loader?limit=100&name=img/[name].[ext]'
			},
		]
	},

	plugins: [

		new ExtractTextPlugin({
			filename: 'css/style.[hash].css'
		}),

		new HtmlWebpackPlugin({
			title: 'Webpack-Optimized-Template',
			description: 'Webpack-Optimized-Template',
			baseUrl: '/',
			template: './src/index.html.ejs',
			inject: 'body',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
		}),

		new webpack.HotModuleReplacementPlugin(),

		/**
		 * @link https://www.npmjs.com/package/copy-webpack-plugin
		 */
		new CopyWebpackPlugin([
			{ from: 'src/img', to: 'img' }
		]),

	]

};

module.exports = config;
