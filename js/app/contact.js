/*
 * Client-side contact form validation.
 * On submit, opens the user's mail client with a prefilled mailto.
 */
(function ($) {
	'use strict';

	function isValidEmail(value) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
	}

	function validate($form) {
		var valid = true;

		$form.find('[data-validate]').each(function () {
			var $field = $(this);
			var $group = $field.closest('.form-group');
			var value = $.trim($field.val());
			var kind = $field.attr('data-validate');
			var fieldOk = true;

			if (kind === 'required' && value.length === 0) { fieldOk = false; }
			if (kind === 'email' && !isValidEmail(value)) { fieldOk = false; }

			$group.toggleClass('has-error', !fieldOk);
			if (!fieldOk) { valid = false; }
		});

		return valid;
	}

	function toMailto(name, email, message) {
		var subject = 'Plano de Negócio - contato pelo site';
		var body = 'Nome: ' + name + '\nEmail: ' + email + '\n\n' + message;
		return 'mailto:kerohum@gmail.com?subject=' + encodeURIComponent(subject) +
		       '&body=' + encodeURIComponent(body);
	}

	$(function () {
		var $form = $('#contato-form');
		if (!$form.length) { return; }

		$form.on('submit', function (e) {
			e.preventDefault();
			if (!validate($form)) { return; }

			var name = $.trim($form.find('[name="nome"]').val());
			var email = $.trim($form.find('[name="email"]').val());
			var message = $.trim($form.find('[name="mensagem"]').val());
			window.location.href = toMailto(name, email, message);
		});
	});

	if (typeof window !== 'undefined') {
		window.kerohumContact = { isValidEmail: isValidEmail, toMailto: toMailto };
	}
}(jQuery));
