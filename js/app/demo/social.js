/*
 * kerohum.demo.social — three-phase pitch demo for ordering from inside a
 * social network. Shows the same fake Twitter feed under three different
 * integration depths: a public bot driving DMs, a browser extension that
 * injects controls into the timeline, and a native card contract with the
 * platform.
 */
(function (angular) {
	'use strict';

	var FEED = [
		{
			id: 't-helio',
			authorName: 'Hélio Medeiros',
			authorHandle: '@helio_md',
			authorAvatar: '🧔🏽',
			when: '12min',
			text: 'Dia frio em Boa Viagem, todo mundo aqui em casa querendo pedir comida. Alguma sugestão decente?',
			foodIntent: true,
			mentionsKeroum: false,
			ordered: null,
			intent: { cuisine: 'qualquer', area: 'Boa Viagem' }
		},
		{
			id: 't-hana',
			authorName: 'Hana Medeiros',
			authorHandle: '@hana_meds',
			authorAvatar: '👩🏻',
			when: '08min',
			text: '@KeroUm preciso de um sushi pra essa noite — algo entre R$ 50 e R$ 80, entrega rápida 🍣',
			foodIntent: true,
			mentionsKeroum: true,
			ordered: null,
			intent: { cuisine: 'sushi', budget: 80 }
		},
		{
			id: 't-pizza',
			authorName: 'Pizza Donatello',
			authorHandle: '@pizzadonatello',
			authorAvatar: '🍕',
			when: '20min',
			text: 'Promoção de quarta: pizza grande + refri 2L por R$ 39. Peça pelo @KeroUm e a gente leva em 35min 🍕🛵',
			foodIntent: true,
			mentionsKeroum: true,
			ordered: null,
			intent: { restaurantId: 'pizza-donatello', special: 'Pizza grande + refri 2L', price: 39 }
		},
		{
			id: 't-deco',
			authorName: 'Deco Oliveira',
			authorHandle: '@decoo',
			authorAvatar: '👨🏽‍💻',
			when: '35min',
			text: 'Acabei de pedir uma moqueca da Maria Bonita pelo @KeroUm. Em 30min na mesa 🐟 #domingoemcasa',
			foodIntent: true,
			mentionsKeroum: true,
			ordered: { restaurantId: 'maria-bonita', restaurantName: 'Maria Bonita', itemName: 'Moqueca de peixe', total: 45 }
		},
		{
			id: 't-philipe',
			authorName: 'Philipe Coutinho',
			authorHandle: '@philipec',
			authorAvatar: '🧑🏼‍🎨',
			when: '02min',
			text: '"Acabei de pedir uma moqueca..." — vou pedir essa mesma coisa! Obrigado pela dica @decoo 🙏',
			foodIntent: false,
			mentionsKeroum: false,
			quotedTweetId: 't-deco',
			ordered: null
		}
	];

	var DM_THREAD = [
		{ sender: 'bot',  text: 'Olá! Vi que você está em Boa Viagem (endereço salvo). Que tipo de comida quer pedir?' },
		{ sender: 'user', text: 'sushi' },
		{ sender: 'bot',  text: 'Achei 3 opções no seu raio. Responda 1, 2 ou 3:\n1️⃣ Sushi Konami — Combinado 20pç R$ 58 — 45min ⭐ 4.8\n2️⃣ Edo Sushi — Executivo R$ 62 — 50min ⭐ 4.5\n3️⃣ Yamada Sushi — Mini R$ 48 — 60min ⭐ 4.3' },
		{ sender: 'user', text: '1' },
		{ sender: 'bot',  text: 'Sushi Konami selecionado. Personalizar peixe? (responda "padrão" pra usar salmão)' },
		{ sender: 'user', text: 'padrão' },
		{ sender: 'bot',  text: 'Total R$ 64 (R$ 58 + R$ 6 entrega). Pagar com cartão final 1234? Responda "sim" pra confirmar.' },
		{ sender: 'user', text: 'sim' },
		{ sender: 'bot',  text: '✅ Pedido confirmado! Status: keroum.com.br/p/abc123 — você também recebe atualizações por aqui.' }
	];

	var QUOTE_CHAIN = [
		{ who: 'Deco',    avatar: '👨🏽‍💻', action: 'pediu',       what: 'Moqueca · Maria Bonita' },
		{ who: 'Philipe', avatar: '🧑🏼‍🎨', action: 'quote-pediu', what: 'mesma moqueca · Maria Bonita' },
		{ who: 'Hana',    avatar: '👩🏻',   action: 'quote-pediu', what: 'mesma moqueca · Maria Bonita' }
	];

	angular.module('kerohum.demo.social', [])
		.controller('SocialController', ['$timeout', function ($timeout) {
			var vm = this;
			vm.phase = 'p1';
			vm.feed = FEED;
			vm.dmThread = DM_THREAD;
			vm.quoteChain = QUOTE_CHAIN;
			vm.toast = null;

			vm.setPhase = function (p) {
				vm.phase = p;
				vm.toast = null;
			};

			vm.isPhase = function (p) {
				return vm.phase === p;
			};

			function showToast(text) {
				vm.toast = { text: text, ts: Date.now() };
				var ts = vm.toast.ts;
				$timeout(function () {
					if (vm.toast && vm.toast.ts === ts) { vm.toast = null; }
				}, 3500);
			}

			vm.orderViaExtension = function (tweet) {
				showToast('Configurador aberto sobre a timeline — sem sair do Twitter (Fase 2)');
			};

			vm.repeatOrderViaExtension = function (tweet) {
				showToast('Carrinho de ' + tweet.authorName + ' copiado pro seu checkout (Fase 2)');
			};

			vm.orderViaCard = function (tweet) {
				showToast('Pedido enviado direto do card nativo — 1 toque (Fase 3)');
			};

			vm.repeatOrderViaCard = function (tweet) {
				showToast('Quote-pedido publicado: você pediu o mesmo que ' + tweet.authorName + ' (Fase 3)');
			};

			vm.askBot = function (tweet) {
				showToast('Bot mandou DM pra ' + tweet.authorHandle + ' — fluxo continua no privado (Fase 1)');
			};

			vm.quotedTweet = function (tweet) {
				if (!tweet.quotedTweetId) { return null; }
				for (var i = 0; i < FEED.length; i++) {
					if (FEED[i].id === tweet.quotedTweetId) { return FEED[i]; }
				}
				return null;
			};

			vm.priceLabel = function (price) {
				return 'R$ ' + Number(price || 0).toFixed(2).replace('.', ',');
			};
		}]);
}(window.angular));
