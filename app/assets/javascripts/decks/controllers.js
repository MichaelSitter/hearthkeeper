define(['underscore'], function (_) {
	'use strict';

	var NewDeck = function ($routeParams, deckService) {
		deckService.clearCards();
		deckService.setHeroClass($routeParams.heroClass);
	};
	NewDeck.$inject = ['$routeParams', 'deckService'];

	var SearchCards = function ($scope, $routeParams, cardService, deckService) {

		$scope.heroClass = $routeParams.heroClass || deckService.getHeroClass();
		$scope.activeCategory = $scope.heroClass;
		$scope.loading = true;

		var classCards;
		var neutralCards;

		var res = cardService.get()
			.then(function (cards) {
				classCards = _.filter(cards, filterByClass($scope.heroClass));
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

	var CurrentDeck = function ($scope, $routeParams, deckService) {

		$scope.deckName = deckService.getDeckName();

		$scope.$watch(function () {
			return deckService.getCards();
		}, function (deckEntries) {
			$scope.deckEntries = deckEntries;
			$scope.cardCount = deckService.cardCount();
			$scope.dust = deckService.dustCount();
		}, true);

		$scope.clear = function () {
			deckService.clearCards();
		};

		$scope.save = function () {
			deckService.saveDeck($scope.deckName, $routeParams.heroClass);
		};

		$scope.addCard = function (card) {
			deckService.addCard(card);
		};

		$scope.removeCard = function (card) {
			deckService.removeCard(card);
		};
	};
	CurrentDeck.$inject = ['$scope', '$routeParams', 'deckService'];

	var EditDeck = function ($scope, $routeParams, deckService) {
		var deck = deckService.loadDeck($routeParams.deckName);

		$scope.cards = deck.cards;
		$scope.deckName = deck.name;
		$scope.heroClass = deck.heroClass;

		$scope.update = function () {
			deckService.saveDeck($scope.deckName, $scope.heroClass);
		};
	};
	EditDeck.$inject = ['$scope', '$routeParams', 'deckService'];

	var Decks = function ($scope, deckService) {
		$scope.decks = deckService.getDecks();
	};
	Decks.$inject = ['$scope', 'deckService'];

	return {
		NewDeck: NewDeck,
		SearchCards: SearchCards,
		CurrentDeck: CurrentDeck,
		EditDeck: EditDeck,
		Decks: Decks,
	};
});