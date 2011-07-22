/*
 * kerohum.demo.resolvers — orderResolver: drives an order through its states
 * via $timeout, exposing the current status as a promise.notify stream.
 */
(function (angular, orderState) {
	'use strict';

	angular.module('kerohum.demo.resolvers')
		.factory('orderResolver', ['$q', '$timeout', function ($q, $timeout) {
			return {
				submit: function (input) {
					var order = orderState.createOrder(input);
					var deferred = $q.defer();

					deferred.notify({ status: order.status, at: 0 });

					orderState.timeline().slice(1).forEach(function (step) {
						$timeout(function () {
							order.status = step.key;
							deferred.notify({ status: step.key, at: step.delayFromStart });
							if (orderState.isTerminal(step.key)) {
								deferred.resolve(order);
							}
						}, step.delayFromStart);
					});

					return { order: order, progress: deferred.promise };
				}
			};
		}]);
}(window.angular, window.kerohumOrderState));
