define(['angular',
	'./services/cards',
	'./services/decks',
	'./services/helper',
	'./services/playRoutes',
	'./filters',
	'./directives/example',
	],
	function(angular) {
		'use strict';

		return angular.module('hearth.common',
			[
				'common.cards',
				'common.deckService',
				'common.helper',
				'common.playRoutes',
				'common.filters',
			]);
	});
