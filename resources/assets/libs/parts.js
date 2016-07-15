//this part is used to handle webpack-dev-server
const webpack = require('webpack');
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
								compress: {
										warnings: false,
										/*beautify: false,
										comments: false,
										compress: {
												warnings: false,
												drop_console: true
										},
										mangle: {
												except: ['$', 'webpackJsonp'],
												screw_ie8: true,
												keep_fnames: true
										}*/
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
}