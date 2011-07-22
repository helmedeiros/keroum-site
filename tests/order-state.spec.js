'use strict';

var orderState = require('../js/app/demo/order-state.js');

describe('kerohum.demo order state', function () {
	it('exposes a four-step timeline with monotonically increasing delays', function () {
		var t = orderState.timeline();
		expect(t.length).toBe(4);
		for (var i = 1; i < t.length; i++) {
			expect(t[i].delayFromStart).toBeGreaterThan(t[i - 1].delayFromStart);
		}
		expect(t[0].key).toBe('received');
		expect(t[t.length - 1].key).toBe('delivered');
	});

	it('advances through the sequence with nextStatus', function () {
		expect(orderState.nextStatus('received')).toBe('preparing');
		expect(orderState.nextStatus('preparing')).toBe('out_for_delivery');
		expect(orderState.nextStatus('out_for_delivery')).toBe('delivered');
		expect(orderState.nextStatus('delivered')).toBeNull();
	});

	it('returns null when asked for the next of an unknown status', function () {
		expect(orderState.nextStatus('exploded')).toBeNull();
	});

	it('identifies delivered as the terminal status', function () {
		expect(orderState.isTerminal('delivered')).toBe(true);
		expect(orderState.isTerminal('received')).toBe(false);
		expect(orderState.isTerminal('preparing')).toBe(false);
	});

	it('createOrder computes subtotal, delivery fee and total', function () {
		var order = orderState.createOrder({
			items: [
				{ id: 'a', price: 20, quantity: 2 },
				{ id: 'b', price: 10, quantity: 1 }
			],
			paymentMethod: 'card',
			address: 'Rua 1',
			now: 12345
		});
		expect(order.id).toBe('order-12345');
		expect(order.subtotal).toBe(50);
		expect(order.deliveryFee).toBe(6);
		expect(order.total).toBe(56);
		expect(order.paymentMethod).toBe('card');
		expect(order.status).toBe('received');
	});

	it('createOrder defaults quantity to 1 and waives delivery fee on empty cart', function () {
		var order = orderState.createOrder({ items: [{ id: 'x', price: 15 }], now: 1 });
		expect(order.subtotal).toBe(15);
		expect(order.deliveryFee).toBe(6);

		var empty = orderState.createOrder({ items: [], now: 2 });
		expect(empty.subtotal).toBe(0);
		expect(empty.deliveryFee).toBe(0);
		expect(empty.total).toBe(0);
	});
});
