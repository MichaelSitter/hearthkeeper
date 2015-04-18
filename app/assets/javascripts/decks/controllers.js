define(['underscore'], function (_) {
	'use strict';

	var NewDeck = function () {
	};

	var SearchCards = function ($scope, $routeParams, cardService, deckService) {

		deckService.clearCards();

		$scope.className = $routeParams['class'];
		$scope.activeCategory = $routeParams['class'];
		$scope.loading = true;

		var classCards;
		var neutralCards;

		var res = cardService.get()
			.then(function (cards) {
				classCards = _.filter(cards, filterByClass($routeParams['class']));
				neutralCards = _.filter(cards, filterByClass(null));
				$scope.cards = _.clone(classCards);
			});

		res.finally(function () {
			$scope.loading = false;
		});

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

	var CurrentDeck = function ($scope, deckService) {

		$scope.$watch(function () {
			return deckService.getCards();
		}, function (newDeck) {

			$scope.deck = newDeck;
			$scope.cardCount = deckService.cardCount();
			$scope.dust = deckService.dustCount();
		}, true);

		$scope.clear = function () {
			deckService.clearCards();
		};

		$scope.save = function () {
			deckService.saveDeck($scope.deckName);
		};
	};
	CurrentDeck.$inject = ['$scope', 'deckService'];

	var EditDeck = function () {
	};

	var Decks = function () {
	};

	return {
		NewDeck: NewDeck,
		SearchCards: SearchCards,
		CurrentDeck: CurrentDeck,
		EditDeck: EditDeck,
		Decks: Decks,
	};
});