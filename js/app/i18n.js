/*
 * kerohum.i18n — small dictionary-based i18n with localStorage persistence.
 *
 * Markup contract:
 *   <h2 data-i18n="problem.title">Fallback PT text</h2>
 *   <input data-i18n-attr="placeholder:contact.email.placeholder"/>
 *
 * The default locale is pt-BR. Locale catalogs live in locales/<lang>.json.
 * Missing keys fall back to whatever text is already in the DOM.
 */
(function ($) {
	'use strict';

	var STORAGE_KEY = 'kerohum.locale';
	var DEFAULT_LOCALE = 'pt';
	var SUPPORTED = ['pt', 'en'];
	var cache = {};

	function getStored() {
		try { return window.localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
	}

	function setStored(loc) {
		try { window.localStorage.setItem(STORAGE_KEY, loc); } catch (e) { /* ignore */ }
	}

	function detectInitial() {
		var stored = getStored();
		if (SUPPORTED.indexOf(stored) !== -1) { return stored; }
		var nav = (navigator.language || DEFAULT_LOCALE).slice(0, 2).toLowerCase();
		return SUPPORTED.indexOf(nav) !== -1 ? nav : DEFAULT_LOCALE;
	}

	function lookup(catalog, key) {
		if (!catalog || !key) { return undefined; }
		var parts = key.split('.');
		var value = catalog;
		for (var i = 0; i < parts.length; i++) {
			if (value === null || typeof value !== 'object') { return undefined; }
			value = value[parts[i]];
		}
		return value;
	}

	function load(loc, cb) {
		if (cache[loc]) { cb(cache[loc]); return; }
		$.getJSON('locales/' + loc + '.json')
			.done(function (data) { cache[loc] = data; cb(data); })
			.fail(function () { cb({}); });
	}

	function apply(catalog) {
		$('[data-i18n]').each(function () {
			var $el = $(this);
			var v = lookup(catalog, $el.attr('data-i18n'));
			if (typeof v === 'string') { $el.html(v); }
		});
		$('[data-i18n-attr]').each(function () {
			var $el = $(this);
			var spec = $el.attr('data-i18n-attr');
			var pairs = spec.split(',');
			for (var i = 0; i < pairs.length; i++) {
				var p = pairs[i].split(':');
				var v = lookup(catalog, p[1]);
				if (typeof v === 'string') { $el.attr(p[0], v); }
			}
		});
		if (catalog && catalog._lang) {
			$('html').attr('lang', catalog._lang);
		}
		$('.lang-switcher .lang-option').removeClass('is-active');
		$('.lang-switcher .lang-option[data-lang="' + catalog._code + '"]').addClass('is-active');
	}

	function set(loc) {
		if (SUPPORTED.indexOf(loc) === -1) { loc = DEFAULT_LOCALE; }
		setStored(loc);
		load(loc, function (catalog) {
			catalog._code = loc;
			apply(catalog);
		});
	}

	function init() {
		set(detectInitial());
		$(document).on('click', '.lang-switcher .lang-option', function (e) {
			e.preventDefault();
			set($(this).attr('data-lang'));
		});
	}

	$(init);

	window.kerohumI18n = {
		lookup: lookup,
		detectInitial: detectInitial,
		set: set,
		_supported: SUPPORTED,
		_storageKey: STORAGE_KEY
	};
}(jQuery));
