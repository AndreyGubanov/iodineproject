var path = require("path");
var webpack = require('webpack');
var PackageJson = require(path.resolve('./package.json'));
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// Root Path
var Root = path.resolve(__dirname, "../../src");

 //Folder Locations
var wdsConfig = PackageJson.config.wds;
// Webpack Config
var getWebpackConfig = function (env) {
	var config = {
	 	// Basex
		context: Root,
		// Entry Points
		entry: {
			index: [path.resolve(Root, 'layouts/index/index.js')],
            solutions: [path.resolve(Root, 'layouts/solutions/solutions.js')],
            typography: [path.resolve(Root, 'layouts/typography/typography.js')],
            blocks: [path.resolve(Root, 'layouts/blocks/blocks.js')]
        },
		//  Output Points
		output: {
			path: path.resolve("./build/assets"),
			filename: "js/[name].js"
		},

		// Resolving Path
		resolve: {
			extensions: ['', '.scss', '.css', '.html', '.js', '.json'],
		    alias: {
		      styles: path.resolve(Root, 'globals/scss/'),
		      fonts: path.resolve(Root, 'assets/fonts/'),
		      elements: path.resolve(Root, 'globals/elements/'),
			  lib: path.resolve(Root,'lib/')
		    }
		},

		modules: [path.resolve(Root, "/"), "node_modules"],

		// Loaders
		module: {
			loaders: [
				{
					test: /\.js$/,
					loader: "babel-loader",
					query: { presets: ['es2015-webpack2'] },
					include: Root,
					exclude: /node_modules/,
				},
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract("style-loader", "css-loader")
				},
				{
					test: /\.scss$/,
					loader: ExtractTextPlugin.extract(
						'style-loader!',
						'css?sourceMap!' + 'sass?sourceMap',
            {	publicPath: '..'}
					)
				},
				{
					test: /\.(eot|woff|ttf|svg|png|jpg)$/,
					loader: 'url-loader?limit=5000&name=cache/[name]-[hash].[ext]'
				},
			]
		},

		// Plugins
		plugins: [
			new webpack.ProvidePlugin({
        		_: "underscore"
    		}),

			new ExtractTextPlugin("./css/[name].css", {allChunks: true, disable: (env === 'dev')}),

			new webpack.DefinePlugin({
				__PACKAGEJSON__: JSON.stringify(PackageJson),
				__ENV__: JSON.stringify(env)
			}),

			new webpack.NoErrorsPlugin()
		],
	};

	if (env === 'dev') {
		config.devtool = "inline-source-map";
		config.plugins.push(new webpack.HotModuleReplacementPlugin());
		config.wds = wdsConfig;
		config.output.publicPath = wdsConfig.protocol + '://' + wdsConfig.host + ':' + wdsConfig.port + '/';
		config.contentBase = "build";

		config.entry.index.unshift(
			'webpack-dev-server/client?' + config.output.publicPath,
			'webpack/hot/dev-server'
		);

	} else {
		config.plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
	}

	return config;
};

module.exports = getWebpackConfig;
