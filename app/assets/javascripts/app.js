define(['angular',
	'home',
	'decks',
	'common',
	], function(angular) {
		'use strict';

		var mod = angular.module('app', [
			'hearth.home',
			'hearth.decks',
			'hearth.common',
			'ui.bootstrap',
		]);

		mod.run(function (cards) {
			// Pre-load card data
			cards.get();
		});
		return mod;
	});
