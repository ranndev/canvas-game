angular
	.module('App')
	.service('Playground', ($document) => {
		let context, canvas;

		let getCanvas = () => canvas;
		let getContext = () => canvas ? canvas.getContext('2d') : null;
		let init = id => { canvas = $document[0].querySelector(`#${id}`) };

		return { init, getCanvas, getContext };
	});
