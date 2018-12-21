import {Player} from "./player";
import {Position} from './position';
import {Game} from "./game";

export default class HumanPlayer extends Player {
    constructor() {
        super();
    }

    makeMove(game: Game, _row: number, _col: number): void {
        game.getBoard().fillSquare(new Position(_row, _col), super.getPlayerMarker());
        console.log('human move: ' + _row + " " + _col);
    }
}