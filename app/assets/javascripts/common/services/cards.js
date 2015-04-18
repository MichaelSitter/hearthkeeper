define(['angular'], function(angular) {
	'use strict';

	var mod = angular.module('common.cards', []);

	mod.config(['$httpProvider', function ($httpProvider) {
		$httpProvider.defaults.headers.get = {
			'X-Mashape-Key': '3dVeS2dDqsmshUl9HoOVAFLRV7B3p1onhGTjsnjC9XsQ6W2XFc',
		};
		$httpProvider.defaults.cache = true;
	}]);

	mod.service('cards', ['$http', '$q', function($http, $q) {

		var url = 'https://irythia-hs.p.mashape.com/cards';

		this.get = function (opts) {

			opts = opts || {};
			opts.cache = true;

			var cards;
			try {
				cards = JSON.parse(localStorage.cards);
			} catch (e) {}

			if (cards) {
				var def = $q.defer();
				def.resolve(cards);
				return def.promise;
			}

			return $http.get(url, opts)
				.then(function (result) {
					localStorage.cards = JSON.stringify(result.data);
					return result.data;
				});
		};
	}]);

	return mod;
});
