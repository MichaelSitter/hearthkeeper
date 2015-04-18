define(['angular',
	'home',
	'decks',
	'common',
	], function(angular) {
		'use strict';

		return angular.module('app', [
			'hearth.home',
			'hearth.decks',
			'hearth.common',
			'ui.bootstrap',
		]);

		// TODO: Re-add eager loading for card data
	});
