import {Player} from "./player";
import {Position} from './position';
import {Board} from "./board";

export default class HumanPlayer extends Player {
    constructor() {
        super();
    }

    makeMove(board: Board, position: Position): void {
        if (position) {
            board.fillSquare(position, super.getMarker());
        }
    }
}