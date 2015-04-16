define(['angular'], function(angular) {
	'use strict';

	var mod = angular.module('common.cards', []);

	mod.config(function ($httpProvider) {
		$httpProvider.defaults.headers.get = {
			'X-Mashape-Key': '3dVeS2dDqsmshUl9HoOVAFLRV7B3p1onhGTjsnjC9XsQ6W2XFc',
		};
		$httpProvider.defaults.cache = true;
	});

	mod.service('cards', function($http) {

		var url = 'https://irythia-hs.p.mashape.com/cards';

		this.get = function (id, opts) {
			opts = opts || {};
			opts.cache = true;
			if (id) {
				return $http.get(url + '/' + id, opts);
			}
			return $http.get(url, opts);
		};
	});

	return mod;
});
