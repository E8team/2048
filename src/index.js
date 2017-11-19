import Game from './Game';
import './assets/css/normalize.min.css';
import './assets/css/style.css';

document.addEventListener('touchmove', function(e) {
    e.preventDefault();
});
try {
	new Game();
}catch(e){
	alert(e);
}
