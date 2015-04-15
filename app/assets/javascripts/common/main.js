define(['angular',
	'./services/helper',
	'./services/playRoutes',
	'./filters',
	'./directives/example'
	],
	function(angular) {
		'use strict';

		return angular.module('hearth.common',
			[
				'common.cards',
				'common.helper',
				'common.playRoutes',
				// 'common.filters',
				// 'common.directives.example'
			]);
	});
