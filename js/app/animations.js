/*
 * Scroll-reveal and in-page smooth scroll.
 * jQuery is assumed to be loaded.
 */
(function ($) {
	'use strict';

	var SCROLL_OFFSET = 60;
	var SCROLL_DURATION = 450;

	function inViewport(el, threshold) {
		var rect = el.getBoundingClientRect();
		var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
		return rect.top < viewportHeight - threshold && rect.bottom > threshold;
	}

	function revealVisible() {
		$('.reveal').each(function () {
			if (!$(this).hasClass('is-visible') && inViewport(this, 60)) {
				$(this).addClass('is-visible');
			}
		});
	}

	function debounce(fn, wait) {
		var t;
		return function () {
			var ctx = this, args = arguments;
			clearTimeout(t);
			t = setTimeout(function () { fn.apply(ctx, args); }, wait);
		};
	}

	function smoothScrollTo($target) {
		$('html, body').animate(
			{ scrollTop: $target.offset().top - SCROLL_OFFSET },
			SCROLL_DURATION
		);
	}

	function isInPageAnchor(href) {
		return typeof href === 'string' && href.length > 1 && href.charAt(0) === '#';
	}

	$(function () {
		revealVisible();
		$(window).on('scroll resize', debounce(revealVisible, 40));

		$(document).on('click', 'a[href^="#"]:not([data-toggle])', function (e) {
			var href = $(this).attr('href');
			if (!isInPageAnchor(href)) { return; }
			var $target = $(href);
			if (!$target.length) { return; }
			e.preventDefault();
			smoothScrollTo($target);
			var $openNav = $('.navbar-collapse.in');
			if ($openNav.length) { $openNav.collapse('hide'); }
		});
	});
}(jQuery));
