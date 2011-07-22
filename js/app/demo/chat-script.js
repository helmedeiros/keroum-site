/*
 * kerohum.demo chat script — pure JS, no Angular, unit-testable.
 *
 * Provides:
 *   - messagesForStatus(statusKey) -> scripted [{ sender, text }]
 *   - replyTo(userText) -> a templated auto-reply { sender, text }
 *   - SENDER constants
 */
/* global global, module */
(function (root) {
	'use strict';

	var SENDER = {
		RESTAURANT: 'restaurant',
		COURIER: 'courier',
		USER: 'user',
		SYSTEM: 'system'
	};

	var SCRIPTED = {
		received: [
			{ sender: SENDER.RESTAURANT, text: 'Recebemos seu pedido! Estamos passando para a cozinha.' }
		],
		preparing: [
			{ sender: SENDER.RESTAURANT, text: 'Em preparo. Tem que ficar bom — sabemos que você está com fome.' }
		],
		out_for_delivery: [
			{ sender: SENDER.COURIER, text: 'Oi! Sou o entregador. Acabei de sair com seu pedido. Estimativa: 6 minutos.' }
		],
		delivered: [
			{ sender: SENDER.COURIER, text: 'Entregue. Bom apetite!' },
			{ sender: SENDER.RESTAURANT, text: 'Conta com a gente sempre que bater a fome.' }
		]
	};

	function messagesForStatus(statusKey) {
		return (SCRIPTED[statusKey] || []).slice();
	}

	function replyTo(userText) {
		var t = String(userText || '').toLowerCase().trim();
		if (!t) { return null; }
		if (/(obrigad|valeu|tmj|brigad)/.test(t)) {
			return { sender: SENDER.RESTAURANT, text: 'Obrigado a você! 🙏' };
		}
		if (/(cad[eê]|onde|chega|atras|demora)/.test(t)) {
			return { sender: SENDER.COURIER, text: 'Estou a caminho! Acompanhe pelo mapa do pedido.' };
		}
		if (/(troc[oa]|gorjeta)/.test(t)) {
			return { sender: SENDER.COURIER, text: 'Combinado. Levo trocado quando der.' };
		}
		return { sender: SENDER.RESTAURANT, text: 'Beleza! Qualquer coisa, é só chamar por aqui.' };
	}

	var api = {
		SENDER: SENDER,
		SCRIPTED: SCRIPTED,
		messagesForStatus: messagesForStatus,
		replyTo: replyTo
	};

	root.kerohumChatScript = api;
	if (typeof module !== 'undefined' && module.exports) { module.exports = api; }
}(typeof window !== 'undefined' ? window : global));
