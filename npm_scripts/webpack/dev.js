var path = require('path');
var PackageJson = require(path.resolve('./package.json'));
var webpack = require('webpack');
var webpackDevServer = require("webpack-dev-server");
var devConfig = require('./webpack.config.js')('dev');
var notifier = require('node-notifier');

var notify = PackageJson.config.buildNotify.dev || true;

console.log(PackageJson.name + ' (v' + PackageJson.version + '):');
console.log('Development build');
console.log('-----------------');

console.log('Webpack: watch');
var compiler = webpack(devConfig);
compiler.watch({
	// poll: true
}, function(err, stats) {

	if (notify) notifier.notify({
		title: 'Development build.',
		message: "Hash: " + stats.hash,
		icon: path.resolve('./src/assets/img/logo.svg'),
		t: 1500
	}, function (err, response) {});

	console.log(stats.toString({
		assets: false,
		chunks: false,
		colors: true,
		hash: false,
		modules: false,
		reasons: false,
		source: false,
	}));
});

var WDS = new webpackDevServer(webpack(devConfig), {
	publicPath: devConfig.output.publicPath,
	contentBase: devConfig.contentBase,
	https: (devConfig.protocol === 'https'),
	watchOptions: {
		aggregateTimeout: 50,
		// poll: true
	},
	hot: true,
	quiet: false,
	noInfo: false,
	stats: {
		assets: false,
		chunks: false,
		colors: true,
		hash: false,
		modules: false,
		reasons: false,
		source: false,
	}
});

WDS.listen(devConfig.wds.port, devConfig.wds.host, function (err, result) {
	if (err) {
		console.log(err);
	} else {
		console.log('Webpack: dev-server' + ' (listening at ' + devConfig.output.publicPath + ")\n");
	}
});