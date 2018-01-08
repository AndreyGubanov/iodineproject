var path        = require('path');
var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var watch       = require('metalsmith-watch');
var assets      = require('metalsmith-assets');
var packageJson = require(path.resolve('./package.json'));
var siteConfig  = require(path.resolve('./src/globals/siteConfig.js'));

Metalsmith(path.resolve('./src'))
	.metadata({
		packageJson: packageJson,
		site: siteConfig,
		__ENV__: 'production'
	})
	.source('./pages')
	.destination(path.resolve('./build'))
	.use(assets({
		source: './assets',
		destination: './assets'
	}))
	.use(markdown())
	.use(permalinks({
		relative: false
	}))
	.use(layouts({
		engine: 'ejs',
		partials: "globals/blocks"
	}))
	.build(function(err, files) {
		if (err) { 
			throw err; 
		}
	});

