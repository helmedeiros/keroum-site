'use strict';

describe('smooth scroll helpers', function () {
	function isInPageAnchor(href) {
		return typeof href === 'string' && href.length > 1 && href.charAt(0) === '#';
	}

	it('accepts in-page anchors with at least one char after #', function () {
		expect(isInPageAnchor('#problema')).toBe(true);
		expect(isInPageAnchor('#a')).toBe(true);
	});

	it('rejects empty / bare-hash / external / undefined hrefs', function () {
		expect(isInPageAnchor('#')).toBe(false);
		expect(isInPageAnchor('')).toBe(false);
		expect(isInPageAnchor('demo.html')).toBe(false);
		expect(isInPageAnchor('http://example.com#x')).toBe(false);
		expect(isInPageAnchor(undefined)).toBe(false);
		expect(isInPageAnchor(null)).toBe(false);
	});
});
