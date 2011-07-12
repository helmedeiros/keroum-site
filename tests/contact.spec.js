'use strict';

describe('contact form helpers', function () {
	function isValidEmail(value) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
	}

	it('accepts well-formed addresses', function () {
		expect(isValidEmail('foo@bar.com')).toBe(true);
		expect(isValidEmail('a.b+c@example.co')).toBe(true);
	});

	it('rejects malformed addresses', function () {
		expect(isValidEmail('')).toBe(false);
		expect(isValidEmail('no-at')).toBe(false);
		expect(isValidEmail('a@b')).toBe(false);
		expect(isValidEmail('a @b.com')).toBe(false);
	});

	it('builds a mailto with encoded subject and body', function () {
		var subject = 'Plano de Negócio';
		var body = 'Nome: Ana\nEmail: a@b.com\n\nOlá!';
		var encoded = encodeURIComponent(subject);
		expect(encoded.indexOf('Plano%20')).toBe(0);
		expect(encodeURIComponent(body)).toContain('Nome%3A');
	});
});
