define(['angular',
		'./routes',
		'./controllers',
	], function(angular) {
	'use strict';

	return angular.module('hearth.decks', [
		'ngRoute',
		'deck.routes',
	]);
});
