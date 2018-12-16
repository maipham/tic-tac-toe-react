import {Player} from "./player";
import {Position} from './position';
import {Board} from "./board";

export default class AIPlayer extends Player {
    constructor() {
        super();
    }

    makeMove(board: Board): void {
        const bestMove: Position = this.generateMove(board);
        board.fillSquare(bestMove, super.getMarker());
    }

    generateMove(board: Board): Position {
        return new Position(0, 0);
    }
}
