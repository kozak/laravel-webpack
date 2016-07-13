const path = require('path'); //path utilities
const HtmlWebpackPlugin = require('html-webpack-plugin'); // for generating static index.html
const merge = require('webpack-merge');	//for merging our webpack schema, it is used for product flavors
const parts = require('./resources/assets/libs/parts');
const validate = require('webpack-validator');  // to check if webpack syntax is true
const PATHS = {
		app: path.join(__dirname, 'resources/assets/js/components'),
		build: path.join(__dirname, 'public/build')
};


const common = {
		entry: {
				app: PATHS.app
		},
		output: {
				path: PATHS.build
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
						parts.setupCSS(PATHS.app));
				break;
		default:
				config = merge(common,
						parts.setupCSS(PATHS.app),
						parts.devServer({
								host: process.env.HOST,
								port: process.env.PORT
						}));
				break;
}
module.exports = validate(config);