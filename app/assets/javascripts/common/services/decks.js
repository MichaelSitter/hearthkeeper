define(['angular', 'underscore'], function(angular, _) {
	'use strict';

	var mod = angular.module('common.deckService', []);
	mod.service('deckService', function () {

		var cards = {};
		var deckName = '';
		var heroClass;

		this.getCards = function () {
			return _.clone(cards);
		};

		this.getHeroClass = function () {
			return heroClass;
		};

		this.getDeckName = function () {
			return deckName;
		};

		this.setHeroClass = function (h) {
			heroClass = h;
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

		this.getDecks = function () {
			var decks = {};
			try {
				decks = JSON.parse(localStorage.decks);
			} catch (e) {}
			return decks;
		};

		this.saveDeck = function (deckName) {
			var decks = {};
			try {
				decks = JSON.parse(localStorage.decks);
			}
			catch (e) {
				delete localStorage.decks;
			}
			decks[deckName] = {
				name: deckName,
				cards: cards,
				heroClass: heroClass,
			};
			localStorage.decks = JSON.stringify(decks);
		};

		this.loadDeck = function (id) {
			var deck;
			try {
				deck = JSON.parse(localStorage.decks)[id];
			} catch (e) { }
			deckName = deck.name;
			cards = deck.cards;
			heroClass = deck.heroClass;

			return deck;
		};

		this.deleteDeck = function (deckName) {
			var decks;
			decks = JSON.parse(localStorage.decks);
			delete decks[deckName];
			localStorage.decks = JSON.stringify(decks);
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