export default class Game {
    startGame: Date;
    endGame: Date;
    score: number;
    constructor(start: Date, end: Date, score: number) {
        this.startGame = start;
        this.endGame = end;
        this.score = score;
    }
}
