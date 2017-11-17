import Tile from './Tile';
import FetchDir from './FetchDir';
class Game {
    static getInstance () {
        return Game._instance;
    }
    constructor () {
        Game._instance = this;
        this.tiles = [
            new Array(4),
            new Array(4),
            new Array(4),
            new Array(4)
        ];
        // 棋盘上棋子的个数
        this.count = 0;
        // 当前分数
        this.score = 0;
        // 最高分数
        let bastScore = localStorage.getItem('bastScore');
        this.bastScore =  bastScore ? bastScore : 0;
        // 初始生成2个棋子
        this.randomTile();
        this.randomTile();
        

        this.scoreDom = document.querySelector('#score');
        this.bastScoreDom = document.querySelector('#bast-score');
        this.scoreDom.innerHTML = 0;
        this.bastScoreDom.innerHTML = this.bastScore;

        let fetchDir = new FetchDir();
        fetchDir.on('up', this.up.bind(this));
        fetchDir.on('left', this.left.bind(this));
        fetchDir.on('right', this.right.bind(this));
        fetchDir.on('down', this.down.bind(this));
        fetchDir.on('any', () => {
            setTimeout(() => {
                this.randomTile();
            }, 100);
        });
    }
    up () {
        for(let x = 0; x < 4; x++){
            for(let y = 0; y < 4; y++){
                if(this.tiles[x][y]){
                    this.tiles[x][y].moveToTop();
                }
            }
        }
    }
    left () {
        for(let x = 0; x < 4; x++){
            for(let y = 0; y < 4; y++){
                if(this.tiles[x][y]){
                    this.tiles[x][y].moveToLeft();
                }
            }
        }
    }
    right () {
        for(let x = 0; x < 4; x++){
            for(let y = 3; y >= 0; y--){
                if(this.tiles[x][y]){
                    this.tiles[x][y].moveToRight();
                }
            }
        }
    }
    down () {
        for(let x = 3; x >= 0; x--){
            for(let y = 0; y < 4; y++){
                if(this.tiles[x][y]){
                    this.tiles[x][y].moveToDown();
                }
            }
        }
    }
    // 随机生成棋子
    randomTile () {
        if(this.count === 16){
            return;
        }
        let num = Math.floor( Math.random() * 100  % (16 - this.count));
        let count = 0;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if(this.tiles[i][j] == undefined){
                    if(count == num){
                        this.tiles[i][j] = new Tile(i, j, num % 2 === 0 ? 2 : 4);
                        this.count ++;
                    }
                    count ++;
                }
            }
        }
    }
    addScore (score) {
        this.score += score;
        this.scoreDom.innerHTML = this.score;
        if (this.score > this.bastScore) {
            this.bastScore = this.score;
            this.bastScoreDom.innerHTML = this.bastScore;
            localStorage.setItem('bastScore', this.bastScore);
        }
    }
}

export default Game;
