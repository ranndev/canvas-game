angular
	.module('App')
	.service('SceneStack', Playground => {
		let scenes = {};

		let add = (name, fn) => {
			if (angular.isUndefined(scenes[name]) && angular.isFunction(fn))
				scenes[name] = fn;
		};

		let remove = name => {
			delete scenes[name];
		};

		let play = () => {
			let playground = Playground.getContext();
			Object.keys(scenes).forEach(name => {
				playground.save();
				scenes[name]();
				playground.restore();
			});
		};

		return { add, remove, play };
	});
