define(['angular', 'underscore'], function(angular, _) {
	'use strict';

	var mod = angular.module('common.deckService', []);
	mod.service('deckService', function () {

		var cards = {};

		this.getCards = function () {
			return _.clone(cards);
		};

		this.addCard = function (card) {
			cards = cards || {};

			if (!isValidInsertion(card)) {
				return;
			}

			if (cards[card.name]) {
				cards[card.name].count++;
			} else {
				cards[card.name] = {
					card: card,
					count: 1,
				};
			}
		};

		this.removeCard = function (card) {
			var entry = cards[card.name];

			if (!entry) {
				return;
			}

			if (entry.count === 1) {
				delete cards[card.name];
			} else {
				entry.count--;
			}
		};

		this.clearCards = function () {
			cards = {};
		};

		this.saveDeck = function (deckName) {
			console.log(deckName);
		};

		this.loadDeck = function (deckName) {
			console.log(deckName);
		};

		var isValidInsertion = function (card) {
			var entry = cards[card.name];
			if (!entry) {
				return true;
			}
			if (entry.count > 1 || entry.card.rarity === 'Legendary' || cardCount() === 30) {
				return false;
			} else {
				return true;
			}
		};

		var cardCount = function () {
			var count = 0;
			_.values(function (entry) {
				count += entry.count;
			});
			return count;
		};
	});
	return mod;
});