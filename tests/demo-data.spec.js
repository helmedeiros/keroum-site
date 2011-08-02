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

	function eachItem(visit) {
		data.restaurants.forEach(function (r) {
			data.menuFor(r.id).forEach(function (cat) {
				cat.items.forEach(function (item) { visit(item, r); });
			});
		});
	}

	it('exposes at least one configurable item per restaurant', function () {
		var configurableByRestaurant = {};
		eachItem(function (item, r) {
			if (item.options) { configurableByRestaurant[r.id] = true; }
		});
		data.restaurants.forEach(function (r) {
			expect(configurableByRestaurant[r.id]).toBe(true);
		});
	});

	it('each configurable item declares choices and extras arrays', function () {
		eachItem(function (item) {
			if (!item.options) { return; }
			expect(Array.isArray(item.options.choices)).toBe(true);
			expect(Array.isArray(item.options.extras)).toBe(true);
		});
	});

	it('every required choice carries at least two priced options', function () {
		eachItem(function (item) {
			if (!item.options) { return; }
			item.options.choices.forEach(function (c) {
				expect(typeof c.id).toBe('string');
				expect(typeof c.label).toBe('string');
				expect(Array.isArray(c.options)).toBe(true);
				expect(c.options.length).toBeGreaterThan(1);
				c.options.forEach(function (o) {
					expect(typeof o.id).toBe('string');
					expect(typeof o.label).toBe('string');
					expect(typeof o.priceDelta).toBe('number');
				});
			});
		});
	});

	it('every extra is a labelled add-on with a numeric price delta', function () {
		eachItem(function (item) {
			if (!item.options) { return; }
			item.options.extras.forEach(function (e) {
				expect(typeof e.id).toBe('string');
				expect(typeof e.label).toBe('string');
				expect(typeof e.priceDelta).toBe('number');
			});
		});
	});
});
