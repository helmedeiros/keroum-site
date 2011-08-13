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
			emblem: 'MB',
			brandColor: '#c0392b',
			avgTicket: 25,
			etaMin: 30,
			distanceKm: 1.2,
			rating: 4.6
		},
		{
			id: 'sushi-konami',
			name: 'Sushi Konami',
			cuisine: 'Japonesa',
			emblem: 'SK',
			brandColor: '#2c3e50',
			avgTicket: 45,
			etaMin: 45,
			distanceKm: 2.4,
			rating: 4.8
		},
		{
			id: 'pizza-donatello',
			name: 'Pizza Donatello',
			cuisine: 'Italiana',
			emblem: 'PD',
			brandColor: '#e67e22',
			avgTicket: 38,
			etaMin: 35,
			distanceKm: 1.8,
			rating: 4.4
		},
		{
			id: 'burger-house',
			name: 'Burger House',
			cuisine: 'Hamburgueria',
			emblem: 'BH',
			brandColor: '#8e3b1f',
			avgTicket: 28,
			etaMin: 25,
			distanceKm: 0.9,
			rating: 4.5
		},
		{
			id: 'cafe-verao',
			name: 'Café Verão',
			cuisine: 'Cafeteria',
			emblem: 'CV',
			brandColor: '#6e3a14',
			avgTicket: 18,
			etaMin: 20,
			distanceKm: 0.6,
			rating: 4.7
		},
		{
			id: 'taqueria-diablo',
			name: 'Taqueria Diablo',
			cuisine: 'Mexicana',
			emblem: 'TD',
			brandColor: '#d62828',
			avgTicket: 34,
			etaMin: 30,
			distanceKm: 1.5,
			rating: 4.6
		},
		{
			id: 'wok-imperial',
			name: 'Wok Imperial',
			cuisine: 'Chinesa',
			emblem: 'WI',
			brandColor: '#c1272d',
			avgTicket: 36,
			etaMin: 40,
			distanceKm: 2.1,
			rating: 4.3
		},
		{
			id: 'padaria-pao-quente',
			name: 'Padaria Pão Quente',
			cuisine: 'Padaria',
			emblem: 'PQ',
			brandColor: '#b9772e',
			avgTicket: 14,
			etaMin: 15,
			distanceKm: 0.4,
			rating: 4.5
		},
		{
			id: 'acai-tropical',
			name: 'Açaí Tropical',
			cuisine: 'Açaí & sucos',
			emblem: 'AT',
			brandColor: '#5b2a8c',
			avgTicket: 22,
			etaMin: 20,
			distanceKm: 0.8,
			rating: 4.8
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
		],
		'cafe-verao': [
			{ category: 'Cafés', items: [
				{
					id: 'cv-1', name: 'Cappuccino', price: 9.0, kcal: 180,
					desc: 'Espresso duplo, leite vaporizado e canela.',
					options: {
						choices: [
							{ id: 'leite', label: 'Tipo de leite', options: [
								{ id: 'integral',  label: 'Integral',          priceDelta: 0 },
								{ id: 'desnatado', label: 'Desnatado',         priceDelta: 0 },
								{ id: 'aveia',     label: 'Aveia barista',     priceDelta: 3 },
								{ id: 'amendoas',  label: 'Amêndoas',          priceDelta: 4 }
							]},
							{ id: 'tamanho', label: 'Tamanho', options: [
								{ id: 'p', label: 'Pequeno (180ml)', priceDelta: 0 },
								{ id: 'g', label: 'Grande (300ml)',  priceDelta: 3 }
							]}
						],
						extras: [
							{ id: 'baunilha', label: 'Xarope de baunilha',  priceDelta: 2 },
							{ id: 'caramelo', label: 'Xarope de caramelo',  priceDelta: 2 },
							{ id: 'avela',    label: 'Xarope de avelã',     priceDelta: 2 }
						]
					}
				},
				{ id: 'cv-2', name: 'Espresso duplo', price: 6.0, kcal: 5, desc: '60ml, blend casa.' },
				{ id: 'cv-3', name: 'Mocha gelado', price: 12.0, kcal: 280, desc: 'Café, chocolate meio amargo e leite gelado.' }
			]},
			{ category: 'Brunch', items: [
				{
					id: 'cv-4', name: 'Avocado toast', price: 22.0, kcal: 410,
					desc: 'Pão de fermentação natural, abacate, tomatinho confit.',
					options: {
						choices: [
							{ id: 'pao', label: 'Pão', options: [
								{ id: 'natural',  label: 'Fermentação natural', priceDelta: 0 },
								{ id: 'centeio',  label: 'Centeio integral',    priceDelta: 2 },
								{ id: 'sem-gluten', label: 'Sem glúten',         priceDelta: 4 }
							]}
						],
						extras: [
							{ id: 'ovo-mole', label: 'Ovo mollet',            priceDelta: 4 },
							{ id: 'queijo',   label: 'Queijo feta',           priceDelta: 5 },
							{ id: 'gergelim', label: 'Gergelim preto',        priceDelta: 1 }
						]
					}
				},
				{ id: 'cv-5', name: 'Granola da casa', price: 19.0, kcal: 460, desc: 'Iogurte natural, frutas vermelhas, mel.' }
			]},
			{ category: 'Doces', items: [
				{ id: 'cv-6', name: 'Croissant amanteigado', price: 9.0, kcal: 320, desc: 'Folhado em manteiga francesa.' },
				{ id: 'cv-7', name: 'Brownie de chocolate', price: 11.0, kcal: 420, desc: 'Chocolate belga 70%, nozes.' }
			]}
		],
		'taqueria-diablo': [
			{ category: 'Tacos', items: [
				{
					id: 'td-1', name: 'Taco de carnitas', price: 17.0, kcal: 360,
					desc: 'Carne suína desfiada, cebola, coentro e limão.',
					options: {
						choices: [
							{ id: 'tortilla', label: 'Tortilha', options: [
								{ id: 'milho',  label: 'Milho azul',  priceDelta: 0 },
								{ id: 'trigo',  label: 'Trigo',       priceDelta: 0 },
								{ id: 'sem-gluten', label: 'Sem glúten', priceDelta: 3 }
							]},
							{ id: 'picancia', label: 'Picância', options: [
								{ id: 'suave',  label: 'Suave',  priceDelta: 0 },
								{ id: 'media',  label: 'Média',  priceDelta: 0 },
								{ id: 'diablo', label: 'Diablo', priceDelta: 0 }
							]}
						],
						extras: [
							{ id: 'guacamole', label: 'Guacamole',       priceDelta: 4 },
							{ id: 'queijo',    label: 'Queijo cotija',   priceDelta: 3 },
							{ id: 'pico',      label: 'Pico de gallo',   priceDelta: 2 }
						]
					}
				},
				{ id: 'td-2', name: 'Taco al pastor', price: 18.0, kcal: 390, desc: 'Suíno marinado em achiote com abacaxi.' },
				{ id: 'td-3', name: 'Taco vegetariano', price: 16.0, kcal: 320, desc: 'Cogumelo portobello, feijão preto, abacate.' }
			]},
			{ category: 'Burritos', items: [
				{
					id: 'td-4', name: 'Burrito tradicional', price: 32.0, kcal: 780,
					desc: 'Arroz, feijão preto, proteína, salsa verde.',
					options: {
						choices: [
							{ id: 'proteina', label: 'Proteína', options: [
								{ id: 'frango', label: 'Frango grelhado', priceDelta: 0 },
								{ id: 'carne',  label: 'Carne moída',      priceDelta: 0 },
								{ id: 'barbacoa', label: 'Barbacoa lenta', priceDelta: 6 },
								{ id: 'vegetariano', label: 'Cogumelos + feijão', priceDelta: -2 }
							]}
						],
						extras: [
							{ id: 'queijo-extra',  label: 'Queijo extra',        priceDelta: 4 },
							{ id: 'sour-cream',    label: 'Sour cream',          priceDelta: 3 },
							{ id: 'jalapeno',      label: 'Jalapeño em conserva', priceDelta: 2 }
						]
					}
				}
			]},
			{ category: 'Acompanhamentos', items: [
				{ id: 'td-5', name: 'Nachos com guacamole', price: 19.0, kcal: 540, desc: 'Totopos crocantes e guacamole fresco.' }
			]},
			{ category: 'Bebidas', items: [
				{ id: 'td-6', name: 'Limonada de hibisco', price: 9.0, kcal: 120, desc: '400ml, gelada.' }
			]}
		],
		'wok-imperial': [
			{ category: 'Wok', items: [
				{
					id: 'wi-1', name: 'Frango xadrez', price: 34.0, kcal: 620,
					desc: 'Frango salteado com pimentões e amendoim.',
					options: {
						choices: [
							{ id: 'picancia', label: 'Picância', options: [
								{ id: 'suave',  label: 'Suave',          priceDelta: 0 },
								{ id: 'media',  label: 'Apimentado',     priceDelta: 0 },
								{ id: 'sichuan', label: 'Sichuan ardido', priceDelta: 0 }
							]},
							{ id: 'base', label: 'Base', options: [
								{ id: 'arroz-branco', label: 'Arroz branco',      priceDelta: 0 },
								{ id: 'arroz-jasmim', label: 'Arroz jasmim',       priceDelta: 3 },
								{ id: 'noodles',      label: 'Noodles de trigo',  priceDelta: 4 }
							]}
						],
						extras: [
							{ id: 'amendoim',  label: 'Amendoim extra',  priceDelta: 2 },
							{ id: 'shimeji',   label: 'Cogumelo shimeji', priceDelta: 6 },
							{ id: 'ovo',       label: 'Ovo mexido',       priceDelta: 4 }
						]
					}
				},
				{ id: 'wi-2', name: 'Wok de legumes', price: 28.0, kcal: 380, desc: 'Brócolis, cenoura, baby corn, cogumelos.' },
				{ id: 'wi-3', name: 'Beef teriyaki', price: 42.0, kcal: 720, desc: 'Mignon em molho teriyaki com gergelim.' }
			]},
			{ category: 'Dim sum', items: [
				{
					id: 'wi-4', name: 'Dim sum vapor (6 un)', price: 24.0, kcal: 420,
					desc: 'Massa fina recheada, cozida no vapor.',
					options: {
						choices: [
							{ id: 'recheio', label: 'Recheio', options: [
								{ id: 'porco',     label: 'Porco e gengibre',   priceDelta: 0 },
								{ id: 'camarao',   label: 'Camarão',             priceDelta: 6 },
								{ id: 'vegetariano', label: 'Cogumelos shitake', priceDelta: 0 }
							]}
						],
						extras: [
							{ id: 'shoyu-doce', label: 'Shoyu doce', priceDelta: 0 },
							{ id: 'pimenta-oleo', label: 'Pimenta no óleo', priceDelta: 2 }
						]
					}
				},
				{ id: 'wi-5', name: 'Rolinho primavera (4 un)', price: 18.0, kcal: 360, desc: 'Massa crocante, legumes e molho agridoce.' }
			]},
			{ category: 'Bebidas', items: [
				{ id: 'wi-6', name: 'Chá de jasmim', price: 7.0, kcal: 0, desc: 'Bule individual.' }
			]}
		],
		'padaria-pao-quente': [
			{ category: 'Salgados', items: [
				{
					id: 'pp-1', name: 'Coxinha', price: 7.0, kcal: 320,
					desc: 'Massa dourada, recheio cremoso.',
					options: {
						choices: [
							{ id: 'recheio', label: 'Recheio', options: [
								{ id: 'frango',          label: 'Frango',           priceDelta: 0 },
								{ id: 'frango-catupiry', label: 'Frango com Catupiry', priceDelta: 2 },
								{ id: 'carne-seca',      label: 'Carne seca',       priceDelta: 3 }
							]}
						],
						extras: [
							{ id: 'pimenta', label: 'Pimenta verde da casa', priceDelta: 1 }
						]
					}
				},
				{ id: 'pp-2', name: 'Pão de queijo', price: 4.0, kcal: 180, desc: 'Mineiro, quentinho.' },
				{ id: 'pp-3', name: 'Empada de palmito', price: 6.0, kcal: 240, desc: 'Massa amanteigada, recheio cremoso.' }
			]},
			{ category: 'Lanches', items: [
				{
					id: 'pp-4', name: 'Misto quente', price: 12.0, kcal: 380,
					desc: 'Presunto e queijo na chapa.',
					options: {
						choices: [
							{ id: 'pao', label: 'Pão', options: [
								{ id: 'frances',  label: 'Pão francês',  priceDelta: 0 },
								{ id: 'bisnaga',  label: 'Bisnaga doce', priceDelta: 1 },
								{ id: 'integral', label: 'Integral',     priceDelta: 2 }
							]}
						],
						extras: [
							{ id: 'ovo',         label: 'Ovo',           priceDelta: 2 },
							{ id: 'queijo-extra', label: 'Queijo extra', priceDelta: 3 },
							{ id: 'tomate',       label: 'Tomate',       priceDelta: 1 }
						]
					}
				}
			]},
			{ category: 'Doces', items: [
				{ id: 'pp-5', name: 'Bolo de cenoura com chocolate', price: 8.0, kcal: 410, desc: 'Fatia generosa, cobertura cremosa.' },
				{ id: 'pp-6', name: 'Brigadeiro gourmet', price: 5.0, kcal: 180, desc: 'Chocolate 70% com flor de sal.' }
			]},
			{ category: 'Bebidas', items: [
				{ id: 'pp-7', name: 'Suco natural de laranja', price: 8.0, kcal: 110, desc: '300ml, sem açúcar.' }
			]}
		],
		'acai-tropical': [
			{ category: 'Açaí', items: [
				{
					id: 'at-1', name: 'Açaí da casa', price: 18.0, kcal: 420,
					desc: 'Açaí cremoso batido na hora.',
					options: {
						choices: [
							{ id: 'tamanho', label: 'Tamanho', options: [
								{ id: 'p', label: 'Pequeno (300ml)', priceDelta: -4 },
								{ id: 'm', label: 'Médio (500ml)',   priceDelta: 0 },
								{ id: 'g', label: 'Grande (700ml)',  priceDelta: 5 }
							]}
						],
						extras: [
							{ id: 'banana',    label: 'Banana',         priceDelta: 2 },
							{ id: 'morango',   label: 'Morango',        priceDelta: 3 },
							{ id: 'granola',   label: 'Granola crocante', priceDelta: 2 },
							{ id: 'leite-cond', label: 'Leite condensado', priceDelta: 3 },
							{ id: 'paçoca',    label: 'Paçoca',          priceDelta: 2 }
						]
					}
				},
				{ id: 'at-2', name: 'Bowl proteico', price: 26.0, kcal: 520, desc: 'Açaí com whey, banana e pasta de amendoim.' }
			]},
			{ category: 'Tapiocas', items: [
				{
					id: 'at-3', name: 'Tapioca recheada', price: 16.0, kcal: 320,
					desc: 'Goma de mandioca crocante.',
					options: {
						choices: [
							{ id: 'recheio', label: 'Recheio', options: [
								{ id: 'queijo-coco',  label: 'Queijo + coco',       priceDelta: 0 },
								{ id: 'frango-cremoso', label: 'Frango cremoso',     priceDelta: 4 },
								{ id: 'chocolate',     label: 'Chocolate + banana', priceDelta: 3 }
							]}
						],
						extras: [
							{ id: 'mel',  label: 'Mel de abelha',       priceDelta: 2 },
							{ id: 'chia', label: 'Sementes de chia',     priceDelta: 1 }
						]
					}
				}
			]},
			{ category: 'Sucos', items: [
				{ id: 'at-4', name: 'Suco verde detox', price: 14.0, kcal: 140, desc: 'Couve, abacaxi, gengibre, limão.' },
				{ id: 'at-5', name: 'Suco de manga com hortelã', price: 13.0, kcal: 160, desc: 'Polpa fresca.' }
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
