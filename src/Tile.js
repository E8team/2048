import Game from './Game';
import {strToDom} from './utils';

let colors = [
    {//2
      fontSize: 55,
      color: '#726C62',
      bgColor: '#EFE7DE'
    },
    {//4
      fontSize: 55,
      color: '#726C62',
      bgColor: '#EFE3CE'
    },
    {//8
      fontSize: 55,
      color: '#fff',
      bgColor: '#F7B27B'
    },
    {//16
      fontSize: 46,
      color: '#fff',
      bgColor: '#F79663'
    },
    {//32
      fontSize: 46,
      color: '#fff',
      bgColor: '#F77D63'
    },
    {//64
      fontSize: 46,
      color: '#fff',
      bgColor: '#F76142'
    },
    {//128
      fontSize: 40,
      color: '#fff',
      bgColor: '#F76142'
    },
    {//256
      fontSize: 40,
      color: '#fff',
      bgColor: '#F29A39'
    },
    {//512
      fontSize: 40,
      color: '#fff',
      bgColor: '#E7CB5A'
    },
    {//1024
      fontSize: 32,
      color: '#fff',
      bgColor: '#E7C74A'
    },
    {//2048
      fontSize: 32,
      color: '#fff',
      bgColor: '#EFC229'
    }
  ];


let size;
let step;

if(window.innerWidth < 530){
  // 小屏幕
  colors.forEach(item => {
    item.fontSize = item.fontSize / 2;
  })
  size = 57.5;
  step = 10;
}else{
  // 大屏幕
  size = 106;
  step = 15;
}


class Tile{
  constructor (x, y, num) {
    this.x = x;
    this.y = y;
        
    this.setNum(num);

    this.render();
  }
  gridToPx (x, y) {
    return {
      top: x * size + x * step,
      left: y * size + y * step
    };
  }
  moveTo (x, y) {
    let tiles = Game.getInstance().tiles;

    let {left, top} = this.gridToPx(x, y);

    this.tileDom.style.transform = `translate(${left}px, ${top}px)`;
    if(this.x != x || this.y != y){
      tiles[this.x][this.y] = null;
      tiles[x][y] = this;
    }
    this.x = x;
    this.y = y;
    
  }
  scale () {
    let addAnimation = () => {
      this.tileDom.children[0].style.animation = 'scale .2s';
      this.tileDom.removeEventListener('transitionend', addAnimation);
    }
    this.tileDom.addEventListener('transitionend', addAnimation);
  }
  setNum (newNum) {
    let index = Math.log2(newNum) - 1;
    this.backgroundColor =  colors[index].bgColor;
    this.color = colors[index].color;
    this.fontSize = colors[index].fontSize;

    if(this.num){
      let innerDom = this.tileDom.children[0];
      innerDom.style.backgroundColor = this.backgroundColor;
      innerDom.style.color = this.color;
      innerDom.style.fontSize = this.fontSize;
      innerDom.innerHTML = newNum;
    }
    this.num = newNum;
  }
  merge (targetTile) {
    Game.getInstance().addScore(targetTile.num * 2);
    targetTile.moveTo(this.x, this.y);
    targetTile.setNum(targetTile.num * 2);
    targetTile.scale();
    this.remove();
  }
  // 移除自己
  remove () {
    let tiles = Game.getInstance().tiles;
    this.tileDom.remove();
    Game.getInstance().count --;
    delete this;
  }
  moveToRight () {
    if(this.y == 3) return;
    let tiles = Game.getInstance().tiles;
    for(let y = this.y + 1; y < 4; y++){
      if(tiles[this.x][y] != null){
        if(tiles[this.x][y].num == this.num){
          tiles[this.x][y].merge(this);
          return;
        }else{
          this.moveTo(this.x, y - 1);
          return;
        }
      }
    }
    this.moveTo(this.x, 3);
  }
  moveToLeft () {
    if(this.y == 0) return;
    let tiles = Game.getInstance().tiles;
    for(let y = this.y - 1; y >= 0; y--){
      if(tiles[this.x][y] != null){
        if(tiles[this.x][y].num == this.num){
          tiles[this.x][y].merge(this);
          return;
        }else{
          this.moveTo(this.x, y + 1);
          return;
        }
      }
    }
    this.moveTo(this.x, 0);
  }
  moveToTop(){
    if(this.x == 0) return;
    let tiles = Game.getInstance().tiles;
    for(let x = this.x - 1; x >= 0;x --){
      if(tiles[x][this.y] != null){
        if(tiles[x][this.y].num == this.num){
          tiles[x][this.y].merge(this);
          return;
        }else{
          this.moveTo(x + 1, this.y);
          return;
        }
      }
    }
    this.moveTo(0, this.y);
  }
  moveToDown(){
    if(this.x == 3) return;
    let tiles = Game.getInstance().tiles;
    
    for(let x = this.x + 1; x < 4; x++){
      if(tiles[x][this.y] != null){
        if(tiles[x][this.y].num == this.num){
          tiles[x][this.y].merge(this);
          return;
        }else{
          this.moveTo(x - 1, this.y);
          return;
        }
      }
    }
    this.moveTo(3, this.y);
  }
  render (root) {
    let rootDom;
    switch(typeof root){
      case 'string':
        rootDom = document.querySelector(root);
        break;
      case 'object':
        rootDom = root;
        break;
      case 'undefined':
        rootDom = document.querySelector('#tile-list');
        break;
    }
    

    let domStr = `
      <div class="tile-wrapper">
        <div class='tile' style='background-color: ${this.backgroundColor};font-size: ${this.fontSize}px; color: ${this.color};'>
          ${this.num}
        </div>
      </div>
    `;
    
    this.tileDom = strToDom(domStr);
    
    this.tileDom.children[0].addEventListener('animationend', (e) => {
      e.target.style.animation = '';
    })
    this.moveTo(this.x, this.y);
    rootDom.appendChild(this.tileDom);
    this.scale();
    return this;
  }
}

export default Tile;