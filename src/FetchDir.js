class FetchDir {
    constructor () {
        this.cbs = {
            up: [],
            down: [],
            left: [],
            right: [],
            all: []
        }
        this.mouseLastPoint = null;
        let checkerboardDom = document.querySelector('#game-container');
        checkerboardDom.addEventListener('mousedown', this.onTouchStart.bind(this));
        checkerboardDom.addEventListener('mouseup', this.onTouchEnd.bind(this));
        checkerboardDom.addEventListener('touchstart', this.onTouchStart.bind(this));
        checkerboardDom.addEventListener('touchend', this.onTouchEnd.bind(this));
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
        this.cbs['all'].forEach(fn => fn());
        this.mouseLastPoint = null;
    }
}
export default FetchDir;