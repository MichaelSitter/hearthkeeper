define(['angular',
	'./controllers',
	], function(angular, controllers) {
	'use strict';

	var mod = angular.module('deck.routes', ['hearth.common']);
	mod.config(['$routeProvider', function($routeProvider) {
		$routeProvider
		.when('/decks/new/:class', {
			templateUrl: '/assets/javascripts/decks/newDeck.html',
			controller: controllers.NewDeck,
		});
	}]);
	return mod;
});
