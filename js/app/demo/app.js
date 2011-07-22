/*
 * kerohum.demo — top-level Angular module for the interactive demo SPA.
 */
(function (angular) {
	'use strict';

	angular.module('kerohum.demo', ['kerohum.demo.resolvers'])
		.controller('DemoController', ['$scope', 'restaurantResolver', 'menuResolver',
			function ($scope, restaurantResolver, menuResolver) {
				var vm = this;
				vm.view = 'list';
				vm.restaurants = null;
				vm.loadingList = true;
				vm.selected = null;
				vm.menu = null;
				vm.loadingMenu = false;
				vm.error = null;

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
					return 'R$ ' + price.toFixed(2).replace('.', ',');
				};
			}
		]);
}(window.angular));
