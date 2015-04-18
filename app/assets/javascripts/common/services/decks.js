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
			localStorage.decks[deckName] = JSON.stringify(cards);
		};

		this.loadDeck = function (deckName) {
			cards = JSON.parse(localStorage.decks[deckName]);
		};

		this.deleteDeck = function (deckName) {
			delete localStorage.decks[deckName];
		};

		this.cardCount = function () {
			return cardCount();
		};

		this.dustCount = function () {
			return _.reduce(cards, function (total, entry) {
				var val;
				switch (entry.card.rarity) {
					case 'Common':
						val = 40;
						break;
					case 'Rare':
						val = 100;
						break;
					case 'Epic':
						val = 400;
						break;
					case 'Legendary':
						val = 1600;
						break;
					default:
						val = 0;
				}
				return total += val * entry.count;
			}, 0);
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
			_.each(cards, function (entry) {
				count += entry.count;
			});
			return count;
		};
	});
	return mod;
});