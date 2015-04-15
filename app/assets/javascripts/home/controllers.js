define([], function() {
	'use strict';

	var HomeCtrl = function() {
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
