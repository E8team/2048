class FetchDir {
    constructor () {
        this.cbs = {
            up: [],
            down: [],
            left: [],
            right: [],
            any: []
        }
        var map = {
		    38: 'up', // Up
		    39: 'right', // Right
		    40: 'down', // Down
		    37: 'left', // Left
		    75: 'up', // Vim up
		    76: 'right', // Vim right
		    74: 'down', // Vim down
		    72: 'left', // Vim left
		    87: 'up', // W
		    68: 'right', // D
		    83: 'left', // S
		    65: 'down'  // A
		};

        this.mouseLastPoint = null;
        let checkerboardDom = document.querySelector('#game-container');
        checkerboardDom.addEventListener('mousedown', this.onTouchStart.bind(this));
        checkerboardDom.addEventListener('mouseup', this.onTouchEnd.bind(this));
        checkerboardDom.addEventListener('touchstart', this.onTouchStart.bind(this));
        checkerboardDom.addEventListener('touchend', this.onTouchEnd.bind(this));
        document.addEventListener('keydown', (event) => {
            event.preventDefault();
            let mapped = map[event.which];
            if(mapped){
                this.cbs['any'].forEach(fn => fn());
            
                switch(mapped){
                    case 'up':
                        this.cbs['up'].forEach(fn => fn());
                    break;
                    case 'right':
                        this.cbs['right'].forEach(fn => fn());
                    break;
                    case 'left':
                        this.cbs['left'].forEach(fn => fn());
                    break;
                    case 'down':
                        this.cbs['down'].forEach(fn => fn());
                    break;
                }
            }
        });
    }
    on (actionName, cb) {
        if(this.cbs.hasOwnProperty(actionName)){
            this.cbs[actionName].push(cb);
        }
    }
    onTouchStart (e) {
        this.mouseLastPoint = {
            x: e.pageX ? e.pageX : event.changedTouches[0].clientX,
            y: e.pageY ? e.pageY : event.changedTouches[0].clientY,
        };
    }
    onTouchEnd (e) {
        if (!this.mouseLastPoint) {
            return;
        }
        let dx = (e.pageX ? e.pageX : event.changedTouches[0].clientX) - this.mouseLastPoint.x;
        let dy = (e.pageY ? e.pageY : event.changedTouches[0].clientY) - this.mouseLastPoint.y;
        if(dx == 0 && dy == 0){
            return;
        }
        if (Math.abs(dx) > Math.abs(dy)) {
            // 左右
            if(dx > 0){
                // 右
                this.cbs['right'].forEach(fn => fn());
            }else{
                // 左
                this.cbs['left'].forEach(fn => fn());
            }
        } else {
            // 上下
            if(dy > 0){
                // 下
                this.cbs['down'].forEach(fn => fn());
            }else{
                // 上
                this.cbs['up'].forEach(fn => fn());
            }
        }
        this.cbs['any'].forEach(fn => fn());
        this.mouseLastPoint = null;
    }
}
export default FetchDir;