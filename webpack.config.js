const path = require('path')

module.exports = {
	entry: {
		app: './src/index.js',
		functions: './src/functions.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader'
                }
            }]
	},
	devServer: {
		overlay: true,
	}

}