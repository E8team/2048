import Game from './Game';
import GameAudio from './GameAudio';
import 'normalize.css';
import './assets/css/style.css';

document.addEventListener('touchmove', function(e) {
    e.preventDefault();
});
try {
	const gameAudio = GameAudio.getInstance();
	gameAudio.loadAudio('bg', 'BACKGROUND',require('./assets/audio/bg.mp3'));
	gameAudio.loadAudio('move', 'EFFECT',require('./assets/audio/move.ogg'));

	Game.getInstance();
}catch(e){
	console.error(e);
}
