define(['angular', './controllers', 'common'], function(angular, controllers) {
	'use strict';

	var mod = angular.module('home.routes', ['hearth.common']);
	mod.config(['$routeProvider', function($routeProvider) {
		$routeProvider
		.when('/',  {
			templateUrl: '/assets/javascripts/home/home.html',
			controller:controllers.HomeCtrl
		})
		.otherwise( {templateUrl: '/assets/javascripts/home/notFound.html'});
	}]);
	return mod;
});
