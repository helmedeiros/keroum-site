/*
 * Toggles the "Telas originais" gallery from the demo navbar.
 * jQuery is assumed to be loaded.
 */
(function ($) {
	'use strict';

	var SCROLL_OFFSET = 60;
	var SCROLL_DURATION = 450;

	$(function () {
		var $toggle = $('#toggle-telas');
		var $gallery = $('#telas-originais');
		if (!$toggle.length || !$gallery.length) { return; }

		$toggle.on('click', function (e) {
			e.preventDefault();
			var expanded = $toggle.attr('aria-expanded') === 'true';
			if (expanded) {
				$gallery.attr('hidden', '');
				$toggle.attr('aria-expanded', 'false');
			} else {
				$gallery.removeAttr('hidden');
				$toggle.attr('aria-expanded', 'true');
				$('html, body').animate(
					{ scrollTop: $gallery.offset().top - SCROLL_OFFSET },
					SCROLL_DURATION
				);
			}
			var $openNav = $('.navbar-collapse.in');
			if ($openNav.length) { $openNav.collapse('hide'); }
		});
	});
}(jQuery));
