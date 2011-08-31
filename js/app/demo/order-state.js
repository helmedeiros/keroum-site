/*
 * kerohum.demo order state machine — pure JS, no Angular, unit-testable.
 *
 * Sequence: received -> preparing -> out_for_delivery -> delivered
 * Each transition has a delay (ms). The machine exposes:
 *   - createOrder({ items, paymentMethod, address }) -> order object
 *   - timeline() -> array of {status, label, delayFromStart}
 *   - nextStatus(current) -> the next status, or null at the end
 */
/* global global, module */
(function (root) {
	'use strict';

	var STATUSES = [
		{ key: 'received',         labelPt: 'Pedido recebido',       labelEn: 'Order received',     delayFromStart: 0     },
		{ key: 'preparing',        labelPt: 'Em preparo',            labelEn: 'Preparing',          delayFromStart: 3000  },
		{ key: 'out_for_delivery', labelPt: 'Saiu para entrega',     labelEn: 'Out for delivery',   delayFromStart: 8000  },
		{ key: 'delivered',        labelPt: 'Entregue',              labelEn: 'Delivered',          delayFromStart: 14000 }
	];

	function timeline() {
		return STATUSES.map(function (s) { return { key: s.key, labelPt: s.labelPt, labelEn: s.labelEn, delayFromStart: s.delayFromStart }; });
	}

	function statusIndex(key) {
		for (var i = 0; i < STATUSES.length; i++) {
			if (STATUSES[i].key === key) { return i; }
		}
		return -1;
	}

	function nextStatus(current) {
		var i = statusIndex(current);
		if (i === -1 || i === STATUSES.length - 1) { return null; }
		return STATUSES[i + 1].key;
	}

	function isTerminal(status) {
		return status === 'delivered';
	}

	function createOrder(input) {
		input = input || {};
		var items = input.items || [];
		var subtotal = items.reduce(function (acc, it) {
			return acc + (it.price * (it.quantity || 1));
		}, 0);
		var deliveryFee = subtotal > 0 ? 6 : 0;
		var total = subtotal + deliveryFee;

		return {
			id: 'order-' + (input.now || Date.now()),
			items: items,
			subtotal: subtotal,
			deliveryFee: deliveryFee,
			total: total,
			paymentMethod: input.paymentMethod || 'cash',
			address: input.address || '',
			status: STATUSES[0].key
		};
	}

	var api = {
		STATUSES: STATUSES,
		timeline: timeline,
		nextStatus: nextStatus,
		isTerminal: isTerminal,
		createOrder: createOrder
	};

	root.kerohumOrderState = api;
	if (typeof module !== 'undefined' && module.exports) { module.exports = api; }
}(typeof window !== 'undefined' ? window : global));
