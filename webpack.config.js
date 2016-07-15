const path = require('path'); //path utilities
const HtmlWebpackPlugin = require('html-webpack-plugin'); // for generating static index.html
const merge = require('webpack-merge');	//for merging our webpack schema, it is used for product flavors
const parts = require('./resources/assets/libs/parts');
const validate = require('webpack-validator');  // to check if webpack syntax is true
const pkg = require('./package.json');
const PATHS = {
		app: path.join(__dirname, 'resources/assets/js'),
		style: path.join(__dirname, 'resources/assets/sass'),
		build: path.join(__dirname, 'public/build')
};


const common = {
		entry: {
				app: PATHS.app,
				vendor: Object.keys(pkg.dependencies)
		},
		output: {
				path: PATHS.build,
				filename: '[name].js',
				sourceMapFilename: '[file].map', // Default
				devtoolModuleFilenameTemplate: 'webpack:///[resource-path]?[loaders]'
		},
		plugins: [
				new HtmlWebpackPlugin({
						title: 'Webpack demo'
				})
		]
};
var config;
switch (process.env.npm_lifecycle_event) {
		case 'build':
				config = merge(common,
						{devtool: 'source-map'},
						parts.setFreeVariable(
								'process.env.NODE_ENV',
								'production'
						),
						parts.extractBundle({
								name: 'vendor',
								entries: ['react']
						}),
						parts.minify(),
						parts.setupCSS(PATHS.style));
				break;
		default:
				config = merge(common,
						{devtool: 'eval-source-map'},
						parts.setupCSS(PATHS.style),
						parts.devServer({
								host: process.env.HOST,
								port: process.env.PORT
						}));
				break;
}
module.exports = validate(config);