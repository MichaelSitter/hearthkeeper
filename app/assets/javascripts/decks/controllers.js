define(['underscore'], function (_) {
	'use strict';

	var NewDeck = function ($scope, $routeParams, cardService) {

		$scope.className = $routeParams['class'];
		$scope.activeCategory = $routeParams['class'];
		$scope.loading = true;

		var classCards;
		var neutralCards;

		var filterByClass = function (c) {
			return function(card) {
				return card.card_class === c;
			};
		};

		var filterByCost = function (c) {
			return function(card) {
				return card.cost === c;
			};
		};

		var filterByName = function (c) {
			return function(card) {
				return card.name.indexOf(c) > -1;
			};
		};

		var orderByCost = function (card) {
			return card.cost;
		};

		var getActiveCardSet = function () {
			var cards = $scope.activeCategory === null ?
				_.clone(neutralCards) :
				_.clone(classCards);
			return _.sortBy(cards, orderByCost);
		};

		var res = cardService.get()
			.then(function (cards) {
				classCards = _.filter(cards, filterByClass($routeParams['class']));
				neutralCards = _.filter(cards, filterByClass(null));
				$scope.cards = _.clone(classCards);
			});

		res.finally(function () {
			$scope.loading = false;
		});

		$scope.clearFilters = function () {
			$scope.searchTerm = '';
			$scope.costFilter = null;
		};

		$scope.$watch('searchTerm', function (val) {
			$scope.cards = _.filter(getActiveCardSet(), filterByName(val));
		});

		$scope.$watch('costFilter', function (val) {
			$scope.cards = _.filter(getActiveCardSet(), filterByCost(val));
		});

		$scope.$watch('activeCategory', function () {
			$scope.cards = getActiveCardSet();
		});
	};

	NewDeck.$inject = ['$scope', '$routeParams', 'cards'];

	return {
		NewDeck: NewDeck,
	};
});