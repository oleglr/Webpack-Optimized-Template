/**
 * Webpack Plugins
 */
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HtmlElementsWebpackPlugin = require('html-elements-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const SpritesmithPlugin = require('webpack-spritesmith');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const helpers = require('./helpers');
const METADATA = require('./metadata-config');

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = (env) => {

	return {

		entry: {
			main: './src/scripts/index.js',
		},

		output: {
			path: helpers.root('dist'),
			filename: 'js/[name].bundle.js',
			sourceMapFilename: '[file].map',
			chunkFilename: '[name].[chunkhash].chunk.js',
			publicPath: '/',
		},

		performance: {
			hints: false,
		},

		stats: {
			children: false,
		},

		resolve: {
			extensions: ['.js', '.css', '.sass', '.scss', '.html'],
			modules: [
				'node_modules',
			],
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
						fallback: 'style-loader',
						use: ['css-loader', 'postcss-loader', 'sass-loader'],
					}),
				},
				{
					test: /\.html$/,
					use: 'html-loader',
				},
				{
					test: /\.(jpg|jpeg|gif|png|svg)$/,
					exclude: /node_modules/,
					use: 'url-loader?limit=100&name=img/[name].[ext]',
				},
				{
					test: /\.(woff|woff2|eot|ttf|svg)$/,
					exclude: /node_modules/,
					use: 'url-loader?limit=1024&name=fonts/[name].[ext]',
				},
			],

		},

		plugins: [
			/**
			 * @link https://github.com/webpack/extract-text-webpack-plugin
			 */
			new ExtractTextPlugin({
				filename: 'css/style.[hash].css',
			}),

			/**
			 * @link https://github.com/numical/script-ext-html-webpack-plugin
			 */
			new ScriptExtHtmlWebpackPlugin({
				defaultAttribute: 'defer',
			}),

			// new webpack.HotModuleReplacementPlugin(),

			/**
			 * @link https://github.com/AngularClass/angular2-webpack-starter/tree/master/config/html-elements-plugin
			 */
			new HtmlElementsWebpackPlugin({
				headTags: require('./head-config'),
			}),

			/**
			 * @link https://www.npmjs.com/package/copy-webpack-plugin
			 */
			new CopyWebpackPlugin([
				{ from: 'src/images', to: 'images' },
				{ from: 'src/icons', to: 'icons' },
				{ from: 'src/fonts', to: 'fonts' },
			]),

			/**
			 * @link https://www.npmjs.com/package/webpack-spritesmith
			 */
			new SpritesmithPlugin({
				src: {
					cwd: helpers.root('src', 'icons/sprites_src'),
					glob: '*.png',
				},
				target: {
					image: helpers.root('src', 'icons/sprites/sprite.[hash].png'),
					css: helpers.root('src', 'styles/helpers/_generated-sprites.sass'),
				},
				spritesmithOptions: {
					algorithm: 'top-down',
					padding: 10,
				},
				apiOptions: {
					cssImageRef: '~sprite.[hash].png',
				},
			}),

			/**
			 * @link https://webpack.github.io/docs/list-of-plugins.html#defineplugin
			 */
			new DefinePlugin({
				'ENV': JSON.stringify(ENV),
				'process.env': {
					'ENV': JSON.stringify(ENV),
				},
			}),
		],
	}
};
