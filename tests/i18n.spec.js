'use strict';

describe('i18n lookup', function () {
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

	var catalog = {
		nav: { video: 'Vídeo', team: 'Equipe' },
		problem: { title: 'Quebrado' }
	};

	it('returns the value at a dotted path', function () {
		expect(lookup(catalog, 'nav.video')).toBe('Vídeo');
		expect(lookup(catalog, 'problem.title')).toBe('Quebrado');
	});

	it('returns undefined for missing keys', function () {
		expect(lookup(catalog, 'nope')).toBeUndefined();
		expect(lookup(catalog, 'nav.missing')).toBeUndefined();
		expect(lookup(catalog, 'problem.title.extra')).toBeUndefined();
	});

	it('handles null and empty inputs gracefully', function () {
		expect(lookup(null, 'a.b')).toBeUndefined();
		expect(lookup(catalog, '')).toBeUndefined();
	});
});
