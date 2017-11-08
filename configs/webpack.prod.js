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
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default

/**
 * Webpack Constants
 */
const METADATA = require('./metadata-config');

const ENV = process.env.ENV = process.env.NODE_ENV = 'production';

module.exports = () => {

	return webpackMerge(commonConfig(ENV), {

		devtool: 'source-map',

		plugins: [

			/**
			 * @link https://github.com/ampedandwired/html-webpack-plugin
			 */
			new HtmlWebpackPlugin({
				title: METADATA.title,
				env: ENV,
				description: METADATA.description,
				baseUrl: METADATA.baseUrl,
				metadata: METADATA,
				template: './src/index.html.ejs',
				chunksSortMode: 'dependency',
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
					minifyURLs: true,
				},
			}),

			/**
			 * @link http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
			 */
			new UglifyJsPlugin({
				parallel: true,
				uglifyOptions: {
					ie8: false,
					ecma: 6,
					warnings: true,
					mangle: true,
					output: {
						comments: false,
						beautify: false,
					},
				},
				warnings: true,
			}),

			/**
			 * @link https://github.com/NMFR/optimize-css-assets-webpack-plugin
			 */
			new OptimizeCssAssetsPlugin(),

			/**
			 * @link https://github.com/Klathmon/imagemin-webpack-plugin
			 */
			new ImageminPlugin({
				test: /\.(jpe?g|png|gif|svg)$/i,
				pngquant: {
					quality: '60-70',
				},
				optipng: {
					optimizationLevel: 3,
				},
				gifsicle: {
					optimizationLevel: 1,
				},
				jpegtran: {
					progressive: true,
				},
			}),
		],
	});
};
