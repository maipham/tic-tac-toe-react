import {Player} from "./player";
import {Position} from './position';
import {Board} from "./board";

export default class HumanPlayer extends Player {
    constructor() {
        super();
    }

    // makeMove(board: Board, position: Position): void {
    //     if (position) {
    //         board.fillSquare(position, super.getMarker());
    //     }
    // }
    makeMove(board: Board, _row: number, _col: number): void {
        board.fillSquare(new Position(_row, _col), super.getMarker());
    }
}