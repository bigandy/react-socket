const path = require('path');
module.exports = {
	entry: path.join(process.cwd(), 'client-render.js'),
	output: {
		filename: './public/js/build.js',
	},
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				loader: 'eslint-loader',
				exclude: /node_modules/,
			},
		],
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
		],
	},
	devtool: 'source-map',
};
