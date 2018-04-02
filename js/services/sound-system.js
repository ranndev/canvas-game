function SoundSystem() {
	let sounds = [];
	let rootDirectory = '';

	let setRootDirectory = root => { rootDirectory = root };

	let add = (name, url) => {
		sounds.push({
			name: name,
			audio: new Audio(rootDirectory + url)
		});
	};

	let get = name => sounds.filter(sound => sound.name === name)[0];

	let play = name => {
		sounds.forEach(sound => {
			if (sound.name === name)
				angular.copy(sound.audio).play();
		});
	};

	return { setRootDirectory, add, get, play };
}

angular
	.module('App')
	.service('SoundSystem', SoundSystem);
