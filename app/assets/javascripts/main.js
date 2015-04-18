// `main.js` is the file that sbt-web will use as an entry point
(function (requirejs) {
	'use strict';

	// -- RequireJS config --
	requirejs.config({
		// Packages = top-level folders; loads a contained file named 'main.js"
		packages: [
			'common',
			'home',
			'decks',
		],
		shim: {
			'jsRoutes': {
				deps: [],
				exports: 'jsRoutes'
			},
			'angular': {
				deps: ['jquery'],
				exports: 'angular'
			},
			'angular-route': ['angular'],
			'angular-cookies': ['angular'],
			'angular-ui': ['angular'],
			'underscore': {
				exports: '_',
			},
			'bootstrap': ['jquery'],
		},
		paths: {
			'requirejs': ['../lib/requirejs/require'],
			'jquery': ['../lib/jquery/jquery'],
			'angular': ['../lib/angularjs/angular'],
			'underscore': ['../lib/underscorejs/underscore'],
			'angular-route': ['../lib/angularjs/angular-route'],
			'angular-cookies': ['../lib/angularjs/angular-cookies'],
			'angular-ui': ['../lib/angular-ui-bootstrap/ui-bootstrap-tpls'],
			'bootstrap': ['../lib/bootstrap/js/bootstrap'],
			'jsRoutes': ['/jsroutes']
		}
	});

	requirejs.onError = function (err) {
		console.log(err);
	};

	require(['angular',
			'angular-cookies',
			'angular-route',
			'angular-ui',
			'jquery',
			'underscore',
			'bootstrap',
			'./app',
		],
		function (angular) {
			angular.bootstrap(document, ['app']);
		}
	);
})(requirejs);
