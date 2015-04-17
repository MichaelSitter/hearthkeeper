define(['underscore'], function (_) {
	'use strict';

	var SearchCards = function ($scope, $routeParams, cardService, deckService) {

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
				if (!c) {
					return true;
				}
				return card.cost === c;
			};
		};

		var filterByName = function (c) {
			return function(card) {
				if (!c) {
					return true;
				}
				return card.name
					.toLowerCase()
					.indexOf(c.toLowerCase()) > -1;
			};
		};

		var orderByCost = function (card) {
			return card.cost;
		};

		var getActiveCardSet = function () {
			var cards = $scope.activeCategory === null ?
				_.clone(neutralCards) :
				_.clone(classCards);

			cards = _.filter(cards, filterByName($scope.searchTerm));
			cards = _.filter(cards, filterByCost($scope.costFilter));
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

		$scope.$watch('searchTerm', function () {
			$scope.cards = getActiveCardSet();
		});

		$scope.$watch('costFilter', function () {
			$scope.cards = getActiveCardSet();
		});

		$scope.$watch('activeCategory', function () {
			$scope.cards = getActiveCardSet();
		});

		$scope.addCard = function (card) {
			deckService.addCard(card);
		};

		$scope.removeCard = function (card) {
			deckService.removeCard(card);
		};
	};
	SearchCards.$inject = ['$scope', '$routeParams', 'cards', 'deckService'];

	var CurrentDeck = function ($scope) {
		console.log($scope);
	};
	CurrentDeck.$inject = ['$scope'];

	return {
		SearchCards: SearchCards,
		CurrentDeck: CurrentDeck,
	};
});