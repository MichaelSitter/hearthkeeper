define(['angular',
	'./services/cards',
	'./services/decks',
	],
	function(angular) {
		'use strict';

		var mod = angular.module('hearth.common', [
			'common.cards',
			'common.decks',
		]);
		return mod;
	});
