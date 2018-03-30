angular
	.module('App')
	.service('ScreenWatcher', $window => {
		let watchers = {};

		let add = (name, fn) => {
			if (angular.isFunction(fn)) {
				watchers[name] = fn;
				$window.onresize = e => {
					Object.keys(watchers).forEach(name => {
						watchers[name]({
							width: $window.innerWidth,
							height: $window.innerHeight
						}, e);
					});
				};
			}
		};

		let getScreen = () => {
			return {
				width: $window.innerWidth,
				height: $window.innerHeight
			};
		}

		return { add, getScreen };
	});