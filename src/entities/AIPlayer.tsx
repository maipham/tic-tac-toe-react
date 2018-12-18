import {Player} from "./player";
import {Position} from './position';
import {Board} from "./board";
import GridSquare from "./gridSquare";

export default class AIPlayer extends Player {
    constructor() {
        super();
    }

    makeMove(board: Board, row?: number, col?: number): void {
        const bestMove: Position = this.generateMove(board);
        board.fillSquare(bestMove, super.getMarker());
    }

    generateMove(board: Board): Position {

        return new Position(0, 0);
    }

    cloneBoard(board: Board): Board{
        const newBoard = new Board();
        board.getGrid().forEach((row, i) => {
            row.forEach((square, j) => {
                const newSquare = new GridSquare(new Position(i, j));
                newSquare.setMarker(board.getGrid()[i][j].getMarker());
                newBoard.getGrid()[i][j] = newSquare;
            })
        });
        return newBoard;
    }

}
