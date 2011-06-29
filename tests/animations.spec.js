'use strict';

describe('debounce (kerohum.animations)', function () {
	function debounce(fn, wait) {
		var t;
		return function () {
			var ctx = this, args = arguments;
			clearTimeout(t);
			t = setTimeout(function () { fn.apply(ctx, args); }, wait);
		};
	}

	beforeEach(function () { jasmine.clock().install(); });
	afterEach(function () { jasmine.clock().uninstall(); });

	it('collapses bursts of calls into a single trailing invocation', function () {
		var spy = jasmine.createSpy('handler');
		var fn = debounce(spy, 50);
		fn(); fn(); fn();
		jasmine.clock().tick(49);
		expect(spy).not.toHaveBeenCalled();
		jasmine.clock().tick(2);
		expect(spy.calls.count()).toBe(1);
	});

	it('forwards the latest arguments to the wrapped fn', function () {
		var spy = jasmine.createSpy('handler');
		var fn = debounce(spy, 20);
		fn('a'); fn('b');
		jasmine.clock().tick(25);
		expect(spy).toHaveBeenCalledWith('b');
	});
});
