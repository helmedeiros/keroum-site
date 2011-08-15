/*
 * kerohum.demo — top-level Angular module for the interactive demo SPA.
 *
 * One main 'shop' view (restaurant strip + product grid + grouped cart, with an
 * inline product configurator). Checkout and status views still live behind a
 * single 'Finalizar' step so the post-cart flow (chat, timeline) is preserved.
 */
(function (angular) {
	'use strict';

	angular.module('kerohum.demo', ['kerohum.demo.resolvers'])
		.controller('DemoController', ['$scope', 'restaurantResolver', 'menuResolver', 'orderResolver', 'chatResolver',
			function ($scope, restaurantResolver, menuResolver, orderResolver, chatResolver) {
				var vm = this;
				vm.view = 'intro';
				vm.restaurants = null;
				vm.loadingList = true;
				vm.selectedRestaurantId = null;
				vm.selectedRestaurant = null;
				vm.menu = null;
				vm.loadingMenu = false;
				vm.error = null;
				vm.restaurantSearch = '';
				vm.productSearch = '';
				vm.cart = [];
				vm.configurator = null;
				vm.checkout = { name: '', address: '', paymentMethod: 'card' };
				vm.activeOrder = null;
				vm.statusHistory = [];
				vm.chatMessages = chatResolver.messages;
				vm.chatDraft = '';

				restaurantResolver.list().then(function (list) {
					vm.restaurants = list;
					vm.loadingList = false;
					if (list.length > 0) { vm.selectRestaurant(list[0]); }
				});

				/* Restaurant strip & product grid */

				function lower(s) { return (s || '').toString().toLowerCase(); }

				vm.filteredRestaurants = function () {
					if (!vm.restaurants) { return []; }
					var q = lower(vm.restaurantSearch).trim();
					if (!q) { return vm.restaurants; }
					return vm.restaurants.filter(function (r) {
						return lower(r.name).indexOf(q) !== -1 || lower(r.cuisine).indexOf(q) !== -1;
					});
				};

				vm.enterShop = function () {
					vm.view = 'shop';
				};

				vm.enterApp = function () {
					vm.view = 'app';
				};

				vm.backToIntro = function () {
					vm.view = 'intro';
				};

				vm.pageStrip = function (selector, direction) {
					var $el = window.jQuery && window.jQuery(selector);
					if (!$el || !$el.length) { return; }
					var step = Math.max(160, Math.floor($el.width() * 0.8));
					$el.stop(true).animate(
						{ scrollLeft: $el.scrollLeft() + direction * step },
						250
					);
				};

				vm.selectRestaurant = function (restaurant) {
					vm.selectedRestaurantId = restaurant.id;
					vm.selectedRestaurant = restaurant;
					vm.menu = null;
					vm.error = null;
					vm.loadingMenu = true;
					vm.productSearch = '';
					menuResolver.forRestaurant(restaurant.id).then(function (menu) {
						vm.menu = menu;
						vm.loadingMenu = false;
					}, function (err) {
						vm.error = err;
						vm.loadingMenu = false;
					});
				};

				vm.flatMenu = function () {
					if (!vm.menu) { return []; }
					var flat = [];
					vm.menu.forEach(function (cat) {
						cat.items.forEach(function (item) {
							flat.push({ category: cat.category, item: item });
						});
					});
					return flat;
				};

				vm.filteredProducts = function () {
					var flat = vm.flatMenu();
					var q = lower(vm.productSearch).trim();
					if (!q) { return flat; }
					return flat.filter(function (entry) {
						return lower(entry.item.name).indexOf(q) !== -1 ||
							lower(entry.item.desc).indexOf(q) !== -1 ||
							lower(entry.category).indexOf(q) !== -1;
					});
				};

				/* Configurator */

				vm.openConfigurator = function (item) {
					var choices = {};
					var opts = item.options || { choices: [], extras: [] };
					(opts.choices || []).forEach(function (c) {
						if (c.options && c.options.length) { choices[c.id] = c.options[0].id; }
					});
					var extras = {};
					(opts.extras || []).forEach(function (e) { extras[e.id] = false; });
					vm.configurator = {
						restaurant: vm.selectedRestaurant,
						item: item,
						quantity: 1,
						choices: choices,
						extras: extras
					};
				};

				vm.closeConfigurator = function () {
					vm.configurator = null;
				};

				vm.bumpQuantity = function (delta) {
					if (!vm.configurator) { return; }
					var next = vm.configurator.quantity + delta;
					if (next < 1) { next = 1; }
					if (next > 20) { next = 20; }
					vm.configurator.quantity = next;
				};

				function unitPriceFor(cfg) {
					if (!cfg) { return 0; }
					var price = cfg.item.price;
					var opts = cfg.item.options || { choices: [], extras: [] };
					(opts.choices || []).forEach(function (c) {
						var pickedId = cfg.choices[c.id];
						c.options.forEach(function (o) {
							if (o.id === pickedId) { price += o.priceDelta; }
						});
					});
					(opts.extras || []).forEach(function (e) {
						if (cfg.extras[e.id]) { price += e.priceDelta; }
					});
					return price;
				}

				vm.configuratorUnitPrice = function () {
					return unitPriceFor(vm.configurator);
				};

				vm.configuratorTotal = function () {
					if (!vm.configurator) { return 0; }
					return vm.configuratorUnitPrice() * vm.configurator.quantity;
				};

				vm.canConfirmConfigurator = function () {
					if (!vm.configurator) { return false; }
					var opts = vm.configurator.item.options || { choices: [] };
					var ok = true;
					(opts.choices || []).forEach(function (c) {
						if (!vm.configurator.choices[c.id]) { ok = false; }
					});
					return ok && vm.configurator.quantity > 0;
				};

				vm.confirmConfigurator = function () {
					if (!vm.canConfirmConfigurator()) { return; }
					var cfg = vm.configurator;
					var opts = cfg.item.options || { choices: [], extras: [] };
					var chosenChoices = (opts.choices || []).map(function (c) {
						var pickedId = cfg.choices[c.id];
						var picked = null;
						c.options.forEach(function (o) { if (o.id === pickedId) { picked = o; } });
						return { id: c.id, label: c.label, optionId: pickedId, optionLabel: picked ? picked.label : '' };
					});
					var chosenExtras = (opts.extras || []).filter(function (e) {
						return cfg.extras[e.id];
					}).map(function (e) {
						return { id: e.id, label: e.label, priceDelta: e.priceDelta };
					});

					vm.cart.push({
						id: cfg.item.id + ':' + Math.floor(Math.random() * 1e9).toString(36),
						itemId: cfg.item.id,
						name: cfg.item.name,
						restaurantId: cfg.restaurant.id,
						restaurantName: cfg.restaurant.name,
						price: unitPriceFor(cfg),
						quantity: cfg.quantity,
						choices: chosenChoices,
						extras: chosenExtras
					});
					vm.configurator = null;
				};

				/* Cart */

				vm.priceLabel = function (price) {
					return 'R$ ' + Number(price || 0).toFixed(2).replace('.', ',');
				};

				vm.removeFromCart = function (cartItem) {
					var idx = vm.cart.indexOf(cartItem);
					if (idx !== -1) { vm.cart.splice(idx, 1); }
				};

				vm.cartCount = function () {
					return vm.cart.reduce(function (acc, it) { return acc + it.quantity; }, 0);
				};

				vm.cartSubtotal = function () {
					return vm.cart.reduce(function (acc, it) { return acc + it.price * it.quantity; }, 0);
				};

				vm.cartByRestaurant = function () {
					var byId = {};
					var order = [];
					vm.cart.forEach(function (ci) {
						if (!byId[ci.restaurantId]) {
							byId[ci.restaurantId] = { restaurantId: ci.restaurantId, restaurantName: ci.restaurantName, items: [] };
							order.push(byId[ci.restaurantId]);
						}
						byId[ci.restaurantId].items.push(ci);
					});
					return order;
				};

				vm.cartRestaurantCount = function () {
					return vm.cartByRestaurant().length;
				};

				vm.cartItemConfigSummary = function (cartItem) {
					var parts = [];
					(cartItem.choices || []).forEach(function (c) { parts.push(c.optionLabel); });
					(cartItem.extras || []).forEach(function (e) { parts.push('+ ' + e.label); });
					return parts.join(' · ');
				};

				/* Checkout */

				vm.openCheckout = function () {
					if (vm.cart.length === 0) { return; }
					vm.view = 'checkout';
				};

				vm.cancelCheckout = function () {
					vm.view = 'shop';
				};

				vm.canSubmitCheckout = function () {
					return vm.checkout.name.length > 1 && vm.checkout.address.length > 4;
				};

				vm.submitCheckout = function () {
					if (!vm.canSubmitCheckout()) { return; }
					chatResolver.reset();
					var run = orderResolver.submit({
						items: vm.cart,
						paymentMethod: vm.checkout.paymentMethod,
						address: vm.checkout.address
					});
					vm.activeOrder = run.order;
					vm.statusHistory = [];
					vm.chatMessages = chatResolver.messages;
					vm.view = 'status';
					run.progress.then(null, null, function (event) {
						vm.statusHistory.push(event);
						chatResolver.onStatus(event.status);
					}).finally(function () {
						vm.activeOrder.status = 'delivered';
					});
				};

				vm.sendChat = function () {
					if (!vm.chatDraft || !vm.chatDraft.trim()) { return; }
					chatResolver.send(vm.chatDraft);
					vm.chatDraft = '';
				};

				vm.chatSenderLabel = function (sender) {
					switch (sender) {
						case 'restaurant':
							var groups = vm.cartByRestaurant();
							if (groups.length === 1) { return groups[0].restaurantName; }
							if (groups.length > 1)   { return 'Restaurantes'; }
							return 'Restaurante';
						case 'courier':    return 'Entregador';
						case 'user':       return 'Você';
						default:            return 'KeroUm';
					}
				};

				vm.statusHeading = function () {
					var groups = vm.cartByRestaurant();
					if (groups.length === 0) { return 'Seu pedido'; }
					if (groups.length === 1) { return groups[0].restaurantName; }
					return 'Seu pedido (' + groups.length + ' restaurantes)';
				};

				vm.startOver = function () {
					chatResolver.reset();
					vm.view = 'intro';
					vm.cart = [];
					vm.activeOrder = null;
					vm.statusHistory = [];
					vm.chatDraft = '';
					vm.chatMessages = chatResolver.messages;
					vm.checkout = { name: '', address: '', paymentMethod: 'card' };
				};

				/* Status helpers (unchanged from previous version) */

				vm.statusLabel = function (key) {
					if (!window.kerohumOrderState) { return key; }
					var found = null;
					window.kerohumOrderState.STATUSES.forEach(function (s) {
						if (s.key === key) { found = s; }
					});
					return found ? found.labelPt : key;
				};

				vm.timelineSteps = function () {
					return window.kerohumOrderState ? window.kerohumOrderState.STATUSES : [];
				};

				vm.isStatusReached = function (key) {
					if (!vm.activeOrder) { return false; }
					var idx = -1, currentIdx = -1, steps = vm.timelineSteps();
					for (var i = 0; i < steps.length; i++) {
						if (steps[i].key === key) { idx = i; }
						if (steps[i].key === vm.activeOrder.status) { currentIdx = i; }
					}
					return idx !== -1 && currentIdx !== -1 && idx <= currentIdx;
				};
			}
		]);
}(window.angular));
