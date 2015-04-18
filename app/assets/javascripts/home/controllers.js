define([], function() {
	'use strict';

	var HomeCtrl = function($scope) {
		console.log($scope);
	};
	HomeCtrl.$inject = ['$scope'];

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
