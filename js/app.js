angular
	.module('App', [])
	.run(($window, Playground, ScreenWatcher, SceneStack) => {
		Playground.init('main');
		let canvas = Playground.getCanvas();
		let playground = Playground.getContext();
		
		function resizePlayground(screen) {
			canvas.width = screen.width;
			canvas.height = screen.height;
		}

		function clearPlayground() {
			screen = ScreenWatcher.getScreen();
			playground.clearRect(0, 0, screen.width, screen.height);
		}

		function animate() {
			clearPlayground();
			SceneStack.play();
			$window.requestAnimationFrame(animate);
		}

		ScreenWatcher.add('resize-playground', screen => {
			resizePlayground(screen);
		});

		resizePlayground(ScreenWatcher.getScreen());
		animate();
	});
