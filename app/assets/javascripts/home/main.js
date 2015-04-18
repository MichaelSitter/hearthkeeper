define(['angular',
	'./routes',
	'./controllers',
	], function(angular, routes, controllers) {
		'use strict';
		var mod = angular.module('hearth.home', [
			'ngRoute',
			'home.routes',
		]);

		mod.controller('HomeCtrl', controllers.HomeCtrl);
		mod.controller('HeaderCtrl', controllers.HeaderCtrl);
		mod.controller('FooterCtrl', controllers.FooterCtrl);

		return mod;
	});