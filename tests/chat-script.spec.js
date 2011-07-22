'use strict';

var chat = require('../js/app/demo/chat-script.js');

describe('kerohum.demo chat script', function () {
	it('emits a restaurant ack on the received status', function () {
		var msgs = chat.messagesForStatus('received');
		expect(msgs.length).toBe(1);
		expect(msgs[0].sender).toBe(chat.SENDER.RESTAURANT);
		expect(msgs[0].text).toMatch(/recebemos|cozinha/i);
	});

	it('emits a courier intro when leaving for delivery', function () {
		var msgs = chat.messagesForStatus('out_for_delivery');
		expect(msgs.length).toBeGreaterThan(0);
		expect(msgs[0].sender).toBe(chat.SENDER.COURIER);
	});

	it('emits two messages on delivered (restaurant + courier)', function () {
		var msgs = chat.messagesForStatus('delivered');
		expect(msgs.length).toBe(2);
		var senders = msgs.map(function (m) { return m.sender; });
		expect(senders).toContain(chat.SENDER.COURIER);
		expect(senders).toContain(chat.SENDER.RESTAURANT);
	});

	it('emits no messages for an unknown status', function () {
		expect(chat.messagesForStatus('exploded')).toEqual([]);
	});

	it('returns null for empty user input', function () {
		expect(chat.replyTo('')).toBeNull();
		expect(chat.replyTo('   ')).toBeNull();
		expect(chat.replyTo(undefined)).toBeNull();
	});

	it('thanks back when the user thanks', function () {
		var reply = chat.replyTo('Obrigado!');
		expect(reply.sender).toBe(chat.SENDER.RESTAURANT);
		expect(reply.text).toMatch(/obrigad/i);
	});

	it('replies as courier when asked where the order is', function () {
		var reply = chat.replyTo('Cadê o pedido?');
		expect(reply.sender).toBe(chat.SENDER.COURIER);
		expect(reply.text).toMatch(/caminho|mapa/i);
	});

	it('falls back to a friendly restaurant reply for anything else', function () {
		var reply = chat.replyTo('Adicionar um suco também?');
		expect(reply.sender).toBe(chat.SENDER.RESTAURANT);
	});

	it('returns a fresh array each call to messagesForStatus', function () {
		var a = chat.messagesForStatus('received');
		var b = chat.messagesForStatus('received');
		expect(a).not.toBe(b);
		expect(a).toEqual(b);
	});
});
