module.exports = {
	// 'main' script of the app, use [] for multiple entries or {}
	entry: './src/index.js',

	// where to put result bundle?
	// 'path' can be useful for multiple files: `path: __dirname + '/dist'`
	output: {
		path: __dirname + '/dist',
		library: 'reduxPromise',
		libraryTarget: 'umd'
	},

	// what and how to change before saving to bundle
	module: {
		rules: [
			// ES2015 --> ES5
			{
				// `require('babel-loader?presets[]=es2015!./index.js')`
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: [{
					loader: 'babel-loader',
					options: { presets: ['es2015'] }
				}]
			}
		]
	}
}