/*
 * kerohum.demo — top-level Angular module for the interactive demo SPA.
 */
(function (angular) {
	'use strict';

	angular.module('kerohum.demo', ['kerohum.demo.resolvers'])
		.controller('DemoController', ['$scope', 'restaurantResolver', 'menuResolver', 'orderResolver', 'chatResolver',
			function ($scope, restaurantResolver, menuResolver, orderResolver, chatResolver) {
				var vm = this;
				vm.view = 'list';
				vm.restaurants = null;
				vm.loadingList = true;
				vm.selected = null;
				vm.menu = null;
				vm.loadingMenu = false;
				vm.error = null;
				vm.cart = [];
				vm.checkout = { name: '', address: '', paymentMethod: 'card' };
				vm.activeOrder = null;
				vm.statusHistory = [];
				vm.chatMessages = chatResolver.messages;
				vm.chatDraft = '';

				restaurantResolver.list().then(function (list) {
					vm.restaurants = list;
					vm.loadingList = false;
				});

				vm.open = function (restaurant) {
					vm.selected = restaurant;
					vm.menu = null;
					vm.error = null;
					vm.loadingMenu = true;
					vm.view = 'menu';
					menuResolver.forRestaurant(restaurant.id).then(function (menu) {
						vm.menu = menu;
						vm.loadingMenu = false;
					}, function (err) {
						vm.error = err;
						vm.loadingMenu = false;
					});
				};

				vm.back = function () {
					vm.view = 'list';
					vm.selected = null;
					vm.menu = null;
					vm.error = null;
				};

				vm.priceLabel = function (price) {
					return 'R$ ' + Number(price || 0).toFixed(2).replace('.', ',');
				};

				vm.addToCart = function (item) {
					for (var i = 0; i < vm.cart.length; i++) {
						if (vm.cart[i].id === item.id) {
							vm.cart[i].quantity += 1;
							return;
						}
					}
					vm.cart.push({
						id: item.id,
						name: item.name,
						price: item.price,
						quantity: 1
					});
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

				vm.openCheckout = function () {
					if (vm.cart.length === 0) { return; }
					vm.view = 'checkout';
				};

				vm.cancelCheckout = function () {
					vm.view = 'menu';
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
						case 'restaurant': return vm.selected ? vm.selected.name : 'Restaurante';
						case 'courier':    return 'Entregador';
						case 'user':       return 'Você';
						default:            return 'KeroUm';
					}
				};

				vm.startOver = function () {
					chatResolver.reset();
					vm.view = 'list';
					vm.selected = null;
					vm.menu = null;
					vm.cart = [];
					vm.activeOrder = null;
					vm.statusHistory = [];
					vm.chatDraft = '';
					vm.chatMessages = chatResolver.messages;
					vm.checkout = { name: '', address: '', paymentMethod: 'card' };
				};

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
