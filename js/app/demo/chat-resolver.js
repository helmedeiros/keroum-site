/*
 * kerohum.demo.resolvers — chatResolver: keeps an append-only message log,
 * pushes scripted messages on status transitions, and renders templated
 * auto-replies for user-typed messages.
 */
(function (angular, chatScript) {
	'use strict';

	angular.module('kerohum.demo.resolvers')
		.factory('chatResolver', ['$timeout', function ($timeout) {
			var messages = [];

			function append(msg) {
				messages.push(angular.extend({}, msg, { at: Date.now() }));
			}

			function onStatus(statusKey) {
				chatScript.messagesForStatus(statusKey).forEach(function (msg, index) {
					$timeout(function () { append(msg); }, 350 + index * 600);
				});
			}

			function send(userText) {
				var text = (userText || '').trim();
				if (!text) { return; }
				append({ sender: chatScript.SENDER.USER, text: text });
				var reply = chatScript.replyTo(text);
				if (reply) {
					$timeout(function () { append(reply); }, 700);
				}
			}

			function reset() {
				messages.length = 0;
			}

			return {
				messages: messages,
				onStatus: onStatus,
				send: send,
				reset: reset
			};
		}]);
}(window.angular, window.kerohumChatScript));
