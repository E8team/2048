
export default class GameAudio{
    static getInstance() {
        if (!GameAudio._instance) {
            GameAudio._instance = new GameAudio();
        }
        return GameAudio._instance;
    }
    constructor () {
        this.audioMap = {};
    }
    loadAudio (name, type, url) {
        if(type === 'BACKGROUND'){
            let bgAudio = new Audio(url);
            bgAudio.loop = true;
            this.audioMap[name] = bgAudio;
        }else if(type === 'EFFECT'){
            this.audioMap[name] = {};
            this.audioMap[name].lastIndex = 0;
            this.audioMap[name].audioList = [];
            for(let i = 0; i < 5; i++){
                let effectAudio = new Audio(url);
                effectAudio.loop = false;
                this.audioMap[name].audioList.push(effectAudio);
            }
        }
    }
    playBackground (name) {
        this.audioMap[name].play();
    }
    playEffect (name) {
        let lastIndex = this.audioMap[name].lastIndex;
        this.audioMap[name].lastIndex = (lastIndex + 1) % 5;
        this.audioMap[name].audioList[lastIndex].play();
    }
}
