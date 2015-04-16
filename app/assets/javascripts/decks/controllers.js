define(['underscore'], function (_) {
	'use strict';

	var NewDeck = function ($scope, $routeParams, cardService) {

		$scope.className = $routeParams['class'];
		$scope.loading = true;

		var filterByClass = function (c) {
			return function(card) {
				return card.card_class === c;
			};
		};

		var res = cardService.get()
			.success(function (cards) {
				$scope.neutralCards = _.filter(cards, filterByClass(null));
				$scope.currentClass = _.filter(cards, filterByClass($routeParams['class']));
			})
			.error(function () {
				console.log('api down?');
			});

		res['finally'](function () {
			$scope.loading = false;
		});
	};
	NewDeck.$inject = ['$scope', '$routeParams', 'cards'];

	return {
		NewDeck: NewDeck,
	};
});