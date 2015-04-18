define(['angular',
	'./controllers',
	], function(angular, controllers) {
	'use strict';

	var mod = angular.module('deck.routes', ['hearth.common']);
	mod.config(['$routeProvider', function($routeProvider) {
		$routeProvider
		.when('/decks/new/:class', {
			templateUrl: '/assets/javascripts/decks/views/newDeck.html',
			controller: controllers.NewDeck,
		})
		.when('/decks/edit/:deckName', {
			templateUrl: '/assets/javascripts/decks/views/editDeck.html',
			controller: controllers.EditDeck,
		})
		.when('/decks', {
			templateUrl: '/assets/javascripts/decks/views/decks.html',
			controller: controllers.Decks,
		});
	}]);
	return mod;
});
