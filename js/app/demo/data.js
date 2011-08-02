/*
 * kerohum.demo data — fixed mock restaurant catalog and menus.
 * Plain JS (no Angular) so it stays unit-testable from a jasmine spec.
 *
 * Item shape:
 *   { id, name, price, kcal, desc, options? }
 *
 * options (optional) describes per-product configurator:
 *   {
 *     choices: [ { id, label, options: [ { id, label, priceDelta } ] }, ... ],  // each choice is required
 *     extras:  [ { id, label, priceDelta }, ... ]                                // each extra is optional
 *   }
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
				{
					id: 'mb-1', name: 'Baião de dois', price: 28.0, kcal: 720,
					desc: 'Arroz e feijão verde com queijo coalho e carne de sol.',
					options: {
						choices: [
							{ id: 'porcao', label: 'Porção', options: [
								{ id: 'individual', label: 'Individual', priceDelta: 0 },
								{ id: 'dupla',      label: 'Para dois',  priceDelta: 14 }
							]}
						],
						extras: [
							{ id: 'farofa',  label: 'Farofa de cuscuz',    priceDelta: 4 },
							{ id: 'vinagre', label: 'Vinagrete de manga', priceDelta: 3 },
							{ id: 'extra-carne', label: 'Carne de sol extra', priceDelta: 9 }
						]
					}
				},
				{ id: 'mb-2', name: 'Moqueca de peixe', price: 39.0, kcal: 640, desc: 'Robalo no leite de coco com pirão e arroz.' },
				{ id: 'mb-3', name: 'Galinha caipira', price: 32.0, kcal: 590, desc: 'Galinha desfiada com farofa de cuscuz e quiabo.' }
			]},
			{ category: 'Sobremesas', items: [
				{
					id: 'mb-4', name: 'Cartola', price: 12.0, kcal: 380,
					desc: 'Banana e queijo coalho com canela.',
					options: {
						choices: [],
						extras: [
							{ id: 'doce-leite', label: 'Calda de doce de leite', priceDelta: 3 },
							{ id: 'sorvete',    label: 'Bola de sorvete de creme', priceDelta: 6 }
						]
					}
				}
			]},
			{ category: 'Bebidas', items: [
				{ id: 'mb-5', name: 'Suco de cajá', price: 7.0, kcal: 120, desc: '300ml.' },
				{ id: 'mb-6', name: 'Guaraná Antarctica', price: 5.0, kcal: 130, desc: 'Lata 350ml.' }
			]}
		],
		'sushi-konami': [
			{ category: 'Combinados', items: [
				{
					id: 'sk-1', name: 'Combinado 20 peças', price: 58.0, kcal: 880,
					desc: '8 sashimis, 8 niguiris, 4 uramaki.',
					options: {
						choices: [
							{ id: 'peixe', label: 'Peixe principal', options: [
								{ id: 'salmao', label: 'Salmão',  priceDelta: 0 },
								{ id: 'atum',   label: 'Atum',    priceDelta: 6 },
								{ id: 'misto',  label: 'Misto',   priceDelta: 4 }
							]}
						],
						extras: [
							{ id: 'shoyu-light', label: 'Shoyu light',       priceDelta: 0 },
							{ id: 'gengibre',    label: 'Gengibre extra',    priceDelta: 2 },
							{ id: 'wasabi',      label: 'Wasabi extra',      priceDelta: 2 }
						]
					}
				},
				{ id: 'sk-2', name: 'Combinado 40 peças', price: 98.0, kcal: 1720, desc: 'Variedade chef.' }
			]},
			{ category: 'Pratos quentes', items: [
				{
					id: 'sk-3', name: 'Yakisoba', price: 32.0, kcal: 680,
					desc: 'Macarrão com legumes e proteína à escolha.',
					options: {
						choices: [
							{ id: 'proteina', label: 'Proteína', options: [
								{ id: 'frango',     label: 'Frango',          priceDelta: 0 },
								{ id: 'carne',      label: 'Carne',           priceDelta: 4 },
								{ id: 'camarao',    label: 'Camarão',         priceDelta: 9 },
								{ id: 'vegetariano', label: 'Só legumes',     priceDelta: -3 }
							]}
						],
						extras: [
							{ id: 'shoyu-extra', label: 'Shoyu da casa', priceDelta: 0 }
						]
					}
				}
			]},
			{ category: 'Bebidas', items: [
				{ id: 'sk-4', name: 'Chá verde', price: 6.0, kcal: 5, desc: 'Quente ou gelado.' }
			]}
		],
		'pizza-donatello': [
			{ category: 'Pizzas grandes', items: [
				{
					id: 'pd-1', name: 'Margherita', price: 38.0, kcal: 1240,
					desc: 'Molho de tomate, mussarela de búfala, manjericão.',
					options: {
						choices: [
							{ id: 'tamanho', label: 'Tamanho', options: [
								{ id: 'media',  label: 'Média (6 fatias)',   priceDelta: -6 },
								{ id: 'grande', label: 'Grande (8 fatias)',  priceDelta: 0 },
								{ id: 'familia', label: 'Família (12 fatias)', priceDelta: 16 }
							]},
							{ id: 'borda', label: 'Borda', options: [
								{ id: 'tradicional', label: 'Tradicional',   priceDelta: 0 },
								{ id: 'catupiry',    label: 'Recheada catupiry', priceDelta: 8 },
								{ id: 'cheddar',     label: 'Recheada cheddar',  priceDelta: 8 }
							]}
						],
						extras: [
							{ id: 'azeitona', label: 'Azeitona preta', priceDelta: 3 },
							{ id: 'rucula',   label: 'Rúcula',          priceDelta: 4 },
							{ id: 'parmesao', label: 'Parmesão extra',  priceDelta: 5 }
						]
					}
				},
				{ id: 'pd-2', name: 'Calabresa', price: 36.0, kcal: 1380, desc: 'Calabresa, cebola roxa, orégano.' },
				{ id: 'pd-3', name: 'Quatro queijos', price: 44.0, kcal: 1520, desc: 'Mussarela, provolone, gorgonzola e parmesão.' }
			]},
			{ category: 'Bebidas', items: [
				{ id: 'pd-4', name: 'Refrigerante 2L', price: 12.0, kcal: 800, desc: 'Coca, Guaraná ou Sprite.' }
			]}
		],
		'burger-house': [
			{ category: 'Burgers', items: [
				{
					id: 'bh-1', name: 'Classic', price: 24.0, kcal: 720,
					desc: 'Blend bovino 150g, queijo cheddar, alface, tomate.',
					options: {
						choices: [
							{ id: 'ponto', label: 'Ponto da carne', options: [
								{ id: 'mal-passado',   label: 'Mal passado',  priceDelta: 0 },
								{ id: 'ao-ponto',      label: 'Ao ponto',     priceDelta: 0 },
								{ id: 'bem-passado',   label: 'Bem passado',  priceDelta: 0 }
							]}
						],
						extras: [
							{ id: 'bacon',   label: 'Bacon crocante',   priceDelta: 5 },
							{ id: 'cheddar', label: 'Cheddar extra',    priceDelta: 3 },
							{ id: 'cebola',  label: 'Cebola caramelizada', priceDelta: 3 },
							{ id: 'molho-bbq', label: 'Molho barbecue artesanal', priceDelta: 2 }
						]
					}
				},
				{ id: 'bh-2', name: 'Bacon Lover', price: 29.0, kcal: 920, desc: 'Bacon crocante, cheddar duplo, cebola caramelizada.' },
				{ id: 'bh-3', name: 'Veggie', price: 26.0, kcal: 540, desc: 'Hambúrguer de grão-de-bico com guacamole.' }
			]},
			{ category: 'Acompanhamentos', items: [
				{
					id: 'bh-4', name: 'Fritas tradicionais', price: 12.0, kcal: 420,
					desc: '200g.',
					options: {
						choices: [
							{ id: 'tamanho', label: 'Tamanho', options: [
								{ id: 'p', label: 'Pequena (150g)', priceDelta: -3 },
								{ id: 'm', label: 'Média (200g)',   priceDelta: 0 },
								{ id: 'g', label: 'Grande (320g)',  priceDelta: 5 }
							]}
						],
						extras: [
							{ id: 'cheddar-bacon', label: 'Cheddar + bacon', priceDelta: 6 },
							{ id: 'maionese',      label: 'Maionese da casa', priceDelta: 2 }
						]
					}
				}
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
