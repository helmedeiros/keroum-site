/*
 * kerohum.demo.resolvers — Angular services that wrap the static demo data
 * inside $timeout-deferred promises, simulating network latency.
 */
(function (angular, data) {
	'use strict';

	angular.module('kerohum.demo.resolvers', [])
		.factory('restaurantResolver', ['$q', '$timeout', function ($q, $timeout) {
			return {
				list: function () {
					var deferred = $q.defer();
					$timeout(function () { deferred.resolve(data.listRestaurants()); }, 320);
					return deferred.promise;
				},
				byId: function (id) {
					var deferred = $q.defer();
					$timeout(function () {
						var found = data.findRestaurant(id);
						if (found) { deferred.resolve(found); }
						else { deferred.reject({ code: 'not_found', id: id }); }
					}, 180);
					return deferred.promise;
				}
			};
		}])
		.factory('menuResolver', ['$q', '$timeout', function ($q, $timeout) {
			return {
				forRestaurant: function (restaurantId) {
					var deferred = $q.defer();
					$timeout(function () {
						var menu = data.menuFor(restaurantId);
						if (menu) { deferred.resolve(menu); }
						else { deferred.reject({ code: 'menu_missing', restaurantId: restaurantId }); }
					}, 280);
					return deferred.promise;
				}
			};
		}]);
}(window.angular, window.kerohumDemoData));
