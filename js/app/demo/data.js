/*
 * kerohum.demo data — fixed mock restaurant catalog and menus.
 * Plain JS (no Angular) so it stays unit-testable from a jasmine spec.
 */
/* global global, module */
(function (root) {
	'use strict';

	var restaurants = [
		{
			id: 'maria-bonita',
			name: 'Maria Bonita',
			cuisine: 'Brasileira',
			emblem: '🍛',
			avgTicket: 25,
			etaMin: 30,
			distanceKm: 1.2,
			rating: 4.6
		},
		{
			id: 'sushi-konami',
			name: 'Sushi Konami',
			cuisine: 'Japonesa',
			emblem: '🍣',
			avgTicket: 45,
			etaMin: 45,
			distanceKm: 2.4,
			rating: 4.8
		},
		{
			id: 'pizza-donatello',
			name: 'Pizza Donatello',
			cuisine: 'Italiana',
			emblem: '🍕',
			avgTicket: 38,
			etaMin: 35,
			distanceKm: 1.8,
			rating: 4.4
		},
		{
			id: 'burger-house',
			name: 'Burger House',
			cuisine: 'Hamburgueria',
			emblem: '🍔',
			avgTicket: 28,
			etaMin: 25,
			distanceKm: 0.9,
			rating: 4.5
		}
	];

	var menus = {
		'maria-bonita': [
			{ category: 'Pratos principais', items: [
				{ id: 'mb-1', name: 'Baião de dois', price: 28.0, kcal: 720, desc: 'Arroz e feijão verde com queijo coalho e carne de sol.' },
				{ id: 'mb-2', name: 'Moqueca de peixe', price: 39.0, kcal: 640, desc: 'Robalo no leite de coco com pirão e arroz.' },
				{ id: 'mb-3', name: 'Galinha caipira', price: 32.0, kcal: 590, desc: 'Galinha desfiada com farofa de cuscuz e quiabo.' }
			]},
			{ category: 'Sobremesas', items: [
				{ id: 'mb-4', name: 'Cartola', price: 12.0, kcal: 380, desc: 'Banana e queijo coalho com canela.' }
			]},
			{ category: 'Bebidas', items: [
				{ id: 'mb-5', name: 'Suco de cajá', price: 7.0, kcal: 120, desc: '300ml.' },
				{ id: 'mb-6', name: 'Guaraná Antarctica', price: 5.0, kcal: 130, desc: 'Lata 350ml.' }
			]}
		],
		'sushi-konami': [
			{ category: 'Combinados', items: [
				{ id: 'sk-1', name: 'Combinado 20 peças', price: 58.0, kcal: 880, desc: '8 sashimis, 8 niguiris, 4 uramaki.' },
				{ id: 'sk-2', name: 'Combinado 40 peças', price: 98.0, kcal: 1720, desc: 'Variedade chef.' }
			]},
			{ category: 'Pratos quentes', items: [
				{ id: 'sk-3', name: 'Yakisoba', price: 32.0, kcal: 680, desc: 'Macarrão com legumes e proteína à escolha.' }
			]},
			{ category: 'Bebidas', items: [
				{ id: 'sk-4', name: 'Chá verde', price: 6.0, kcal: 5, desc: 'Quente ou gelado.' }
			]}
		],
		'pizza-donatello': [
			{ category: 'Pizzas grandes', items: [
				{ id: 'pd-1', name: 'Margherita', price: 38.0, kcal: 1240, desc: 'Molho de tomate, mussarela de búfala, manjericão.' },
				{ id: 'pd-2', name: 'Calabresa', price: 36.0, kcal: 1380, desc: 'Calabresa, cebola roxa, orégano.' },
				{ id: 'pd-3', name: 'Quatro queijos', price: 44.0, kcal: 1520, desc: 'Mussarela, provolone, gorgonzola e parmesão.' }
			]},
			{ category: 'Bebidas', items: [
				{ id: 'pd-4', name: 'Refrigerante 2L', price: 12.0, kcal: 800, desc: 'Coca, Guaraná ou Sprite.' }
			]}
		],
		'burger-house': [
			{ category: 'Burgers', items: [
				{ id: 'bh-1', name: 'Classic', price: 24.0, kcal: 720, desc: 'Blend bovino 150g, queijo cheddar, alface, tomate.' },
				{ id: 'bh-2', name: 'Bacon Lover', price: 29.0, kcal: 920, desc: 'Bacon crocante, cheddar duplo, cebola caramelizada.' },
				{ id: 'bh-3', name: 'Veggie', price: 26.0, kcal: 540, desc: 'Hambúrguer de grão-de-bico com guacamole.' }
			]},
			{ category: 'Acompanhamentos', items: [
				{ id: 'bh-4', name: 'Fritas tradicionais', price: 12.0, kcal: 420, desc: '200g.' }
			]},
			{ category: 'Bebidas', items: [
				{ id: 'bh-5', name: 'Milk-shake de chocolate', price: 14.0, kcal: 540, desc: '400ml.' }
			]}
		]
	};

	function listRestaurants() {
		return restaurants.slice();
	}

	function findRestaurant(id) {
		for (var i = 0; i < restaurants.length; i++) {
			if (restaurants[i].id === id) { return restaurants[i]; }
		}
		return null;
	}

	function menuFor(restaurantId) {
		return menus[restaurantId] || null;
	}

	var api = {
		restaurants: restaurants,
		menus: menus,
		listRestaurants: listRestaurants,
		findRestaurant: findRestaurant,
		menuFor: menuFor
	};

	root.kerohumDemoData = api;
	if (typeof module !== 'undefined' && module.exports) { module.exports = api; }
}(typeof window !== 'undefined' ? window : global));
