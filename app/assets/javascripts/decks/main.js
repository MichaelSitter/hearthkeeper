define(['angular',
	'./controllers',
	'./routes',
	], function(angular, controllers) {
	'use strict';

	var mod = angular.module('hearth.decks', [
		'ngRoute',
		'deck.routes',
	]);

	mod.controller('SearchCards', controllers.SearchCards);
	mod.controller('CurrentDeck', controllers.CurrentDeck);

	return mod;
});
