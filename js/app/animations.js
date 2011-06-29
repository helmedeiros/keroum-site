/*
 * Scroll-reveal and in-page smooth scroll.
 * jQuery is assumed to be loaded.
 */
(function ($) {
	'use strict';

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

	$(function () {
		revealVisible();
		$(window).on('scroll resize', debounce(revealVisible, 40));

		$('a[href^="#"]').on('click', function (e) {
			var target = $(this).attr('href');
			if (target.length > 1 && $(target).length) {
				e.preventDefault();
				$.scrollTo(target, 450, { offset: -60 });
			}
		});
	});
}(jQuery));
