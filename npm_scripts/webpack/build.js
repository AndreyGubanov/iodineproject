var path = require('path');
var PackageJson = require(path.resolve('./package.json'));
var webpack = require('webpack');
var buildConfig = require('./webpack.config.js')('build');
var notifier = require('node-notifier');

var notify = PackageJson.config.buildNotify.production || true;

console.log(PackageJson.name + ' (v' + PackageJson.version + '):');
console.log('Production build.');
console.log('-----------------');

var compiler = webpack(buildConfig);
compiler.run(function (err, stats) {

	if (notify) notifier.notify({
		title: 'Production build (v' + PackageJson.version + ').',
		message: "Hash: " + stats.hash,
		icon: path.resolve('./app/src/icons/48.png'),
	}, function (err, response) {});

	console.log(stats.toString({
		assets: true,
		chunks: false,
		colors: true,
		hash: false,
		modules: false,
		reasons: false,
		source: false,
	}));
});
