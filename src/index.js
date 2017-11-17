import Game from './Game';
document.addEventListener('touchmove', function(e) {
    e.preventDefault();
});
try {
	new Game()	
}catch(e){
	alert(e);
}
