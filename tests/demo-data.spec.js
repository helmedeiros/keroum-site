'use strict';

var data = require('../js/app/demo/data.js');

describe('kerohum.demo data', function () {
	it('exposes a non-empty restaurant list', function () {
		expect(Array.isArray(data.restaurants)).toBe(true);
		expect(data.restaurants.length).toBeGreaterThan(0);
	});

	it('returns each restaurant with the required fields', function () {
		data.restaurants.forEach(function (r) {
			expect(typeof r.id).toBe('string');
			expect(typeof r.name).toBe('string');
			expect(typeof r.cuisine).toBe('string');
			expect(typeof r.emblem).toBe('string');
			expect(r.emblem.length).toBeGreaterThan(0);
			expect(typeof r.etaMin).toBe('number');
			expect(typeof r.distanceKm).toBe('number');
			expect(typeof r.rating).toBe('number');
		});
	});

	it('finds a restaurant by id', function () {
		var r = data.findRestaurant('maria-bonita');
		expect(r).not.toBeNull();
		expect(r.name).toBe('Maria Bonita');
	});

	it('returns null for an unknown restaurant id', function () {
		expect(data.findRestaurant('not-a-place')).toBeNull();
	});

	it('returns a menu for every restaurant', function () {
		data.restaurants.forEach(function (r) {
			var menu = data.menuFor(r.id);
			expect(menu).not.toBeNull();
			expect(Array.isArray(menu)).toBe(true);
			expect(menu.length).toBeGreaterThan(0);
			menu.forEach(function (cat) {
				expect(typeof cat.category).toBe('string');
				expect(Array.isArray(cat.items)).toBe(true);
				expect(cat.items.length).toBeGreaterThan(0);
			});
		});
	});

	it('returns null for an unknown menu', function () {
		expect(data.menuFor('not-a-place')).toBeNull();
	});

	it('listRestaurants returns a fresh copy each call', function () {
		var a = data.listRestaurants();
		var b = data.listRestaurants();
		expect(a).not.toBe(b);
		expect(a.length).toBe(b.length);
	});
});
