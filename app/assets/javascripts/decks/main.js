define(['angular',
	'./controllers',
	'./routes',
	], function(angular, controllers) {
	'use strict';

	var mod = angular.module('hearth.decks', [
		'ngRoute',
		'deck.routes',
	]);

	mod.controller('NewDeck', controllers.NewDeck);
	mod.controller('SearchCards', controllers.SearchCards);
	mod.controller('CurrentDeck', controllers.CurrentDeck);
	mod.controller('EditDeck', controllers.EditDeck);
	mod.controller('Decks', controllers.Decks);

	return mod;
});
