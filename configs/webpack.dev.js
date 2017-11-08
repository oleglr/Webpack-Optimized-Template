const path = require('path');
const webpack = require('webpack');
/**
 * Used to merge webpack configs
*/
const webpackMerge = require('webpack-merge');

/**
 * The settings that are common to prod and dev
*/
const commonConfig = require('./webpack.common.js');

/**
 * Webpack Plugins
 */
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * Webpack Constants
 */
const METADATA = require('./metadata-config');

const helpers = require('./helpers');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = () => {
	return webpackMerge(commonConfig(ENV), {

		devtool: 'cheap-module-source-map',

		/**
		 * @link https://webpack.github.io/docs/webpack-dev-server.html
		 */
		devServer: {
			contentBase: helpers.root('src'),
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
			},
		},

		plugins: [
			new webpack.NamedModulesPlugin(),
			new webpack.HotModuleReplacementPlugin(),

			/**
			 * @link https://github.com/ampedandwired/html-webpack-plugin
			 */
			new HtmlWebpackPlugin({
				title: METADATA.title,
				env: ENV,
				baseUrl: METADATA.baseUrl,
				metadata: METADATA,
				template: './src/index.html.ejs',
				inject: 'body',
			}),
		],
	})
};
