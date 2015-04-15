define([], function() {
	'use strict';

	var HomeCtrl = function() {
		console.log('home ctrl');
	};
	HomeCtrl.$inject = [];

	var HeaderCtrl = function(/*$scope*/) {
	};
	HeaderCtrl.$inject = ['$scope'];

	var FooterCtrl = function(/*$scope*/) {
	};
	FooterCtrl.$inject = ['$scope'];

	return {
		HeaderCtrl: HeaderCtrl,
		FooterCtrl: FooterCtrl,
		HomeCtrl: HomeCtrl,
	};

});
