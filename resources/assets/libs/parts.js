//this part is used to handle webpack-dev-server
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');
exports.devServer = function(options) {
		return {
				watchOptions: {
						aggregateTimeout: 300,
						poll: 1000
				},
				devServer: {
						historyApiFallback: true,
						hot: true,
						inline: true,
						stats: 'errors-only',
						host: options.host, // Defaults to `localhost`
						port: options.port // Defaults to 8080
				},
				plugins: [
						new webpack.HotModuleReplacementPlugin({
								multiStep: true
						})
				]
		};
};
//this parts adds style modification HMR to webpack
exports.setupCSS = function(paths) {
		return {
				module: {
						loaders: [
								{
										test: /\.css$/,
										loaders: ['style', 'css?sourceMap'],
										include: paths
								}
						]
				}
		};
};
exports.minify = function() {
		return {
				plugins: [
						new webpack.optimize.UglifyJsPlugin({
								// Don't beautify output (enable for neater output)
								beautify: false,
								// Eliminate comments
								comments: false,
								// Compression specific options
								compress: {
										warnings: false,
										// Drop `console` statements
										drop_console: true
								},
								// Mangling specific options
								mangle: {
										// Don't mangle $
										except: ['$'],

										// Don't care about IE8
										screw_ie8 : true,

										// Don't mangle function names
										keep_fnames: true
								}
						})
				]
		};
};
exports.setFreeVariable = function(key, value) {
		const env = {};
		env[key] = JSON.stringify(value);
		return {
				plugins: [
						new webpack.DefinePlugin(env)
				]
		};
};
exports.extractBundle = function(options) {
		const entry = {};
		entry[options.name] = options.entries;

		return {
				// Define an entry point needed for splitting.
				entry: entry,
				plugins: [
						// Extract bundle and manifest files. Manifest is
						// needed for reliable caching.
						new webpack.optimize.CommonsChunkPlugin({
								names: [options.name, 'manifest']
						})
				]
		};
};
exports.clean = function(path) {
		return {
				plugins: [
						new CleanWebpackPlugin([path], {
								root: process.cwd()
						})
				]
		};
};
exports.extractCSS = function(paths) {
		return {
				module: {
						loaders: [
								{
										test: /\.css$/,
										loader: ExtractTextPlugin.extract('style', 'css'),
										include: paths
								}
						]
				},
				plugins: [
						// Output extracted CSS to a file
						new ExtractTextPlugin('[name].[chunkhash].css')
				]
		};
};
exports.purifyCSS = function(paths) {
		return {
				plugins: [
						new PurifyCSSPlugin({
								basePath: process.cwd(),
								paths: paths
						})
				]
		}
};