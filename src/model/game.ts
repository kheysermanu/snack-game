import moment from 'moment';

export default class Game {
    startGame: string | undefined;
    endGame: string | undefined;
    score = 0;
    constructor() {
        this.startGame = moment().format();
    }
}
