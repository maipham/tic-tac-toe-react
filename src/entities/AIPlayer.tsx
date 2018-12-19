import {Player} from "./player";
import {Position} from './position';
import {Board} from "./board";
import GridSquare from "./gridSquare";
import {MarkerEnum} from "./marker.enum";
import {GameState} from "./GameState";
import {Game} from "./game";
import {Referee} from "./referee";

export default class AIPlayer extends Player {
    constructor() {
        super();
    }

    makeMove(game: Game, row?: number, col?: number): void {
        const bestMove: Position = this.generateMove(game);
        game.getBoard().fillSquare(bestMove, super.getPlayerMarker());
        console.log('moved');
        console.log(bestMove.getRow() + ' ' + bestMove.getCol());
    }

    generateMove(game: Game): Position {
        let startState = this.cloneBoard(game.getBoard());
        const originalMarker = game.getCurrentPlayer().getPlayerMarker();
        let currMarker = game.getCurrentPlayer().getPlayerMarker();
        let opponentMarker = MarkerEnum.X;
        let stack: GameState[] = [];
        let originalStates: any = {};
        let key = 1;
        let visited: GameState[] = [];
        startState.getGrid().forEach((row, i) => {
            row.forEach((square, j) => {
                if (square.getMarker() === MarkerEnum.NONE) {
                    const neighbor = new GameState(currMarker, new Position(i, j), this.cloneBoard(startState), key++);
                    neighbor.board.fillSquare(neighbor.position, currMarker);
                    stack.push(neighbor);
                    originalStates['' + key] = [neighbor, 0];
                }
            })
        });
        currMarker = this.switchMarker(currMarker);

        const referee = new Referee();
        while (stack.length > 0) {
            const currState = stack.pop();
            if (currState !== undefined) {
                if (referee.checkWin(currState.board, originalMarker)) {
                    originalStates['' + currState.key][1]++;
                } else if (referee.checkWin(currState.board, opponentMarker)) {
                    originalStates['' + currState.key][1]--;
                } else if (!this.contains(visited, currState)) {
                    visited.push(currState);
                    this.generateNeighbors(currState.board, currMarker, currState.key, stack);
                    currMarker = this.switchMarker(currMarker);
                }
            }
        }
        let bestScore = 0;
        let bestState: GameState = new GameState(MarkerEnum.NONE, new Position(0, 0), game.getBoard(), 0);
        for (let key in originalStates) {
            if (originalStates.hasOwnProperty(key)) {
                if (originalStates[key][1] > bestScore) {
                    bestScore = originalStates[key][1];
                    bestState = (originalStates[key][0] as GameState);

                }
            }
        }
        return bestState.position;
    }

    contains(visited: GameState[], currState: GameState): boolean {
        visited.forEach((state) => {
            state.board.getGrid().forEach((row, i) => {
                row.forEach((square, j) => {
                    if (currState.board.getGrid()[i][j].getMarker() !== square.getMarker()) {
                        return false;
                    }
                })
            })
        });
        return true;
    }

    switchMarker(currMarker: MarkerEnum): MarkerEnum {
        if (currMarker === MarkerEnum.X) {
            return MarkerEnum.O;
        }
        return MarkerEnum.X;
    }

    generateNeighbors(board: Board, marker: MarkerEnum, key: number, stack: GameState[]): GameState[] {
        let currMarker = marker;
        board.getGrid().forEach((row, i) => {
            row.forEach((square, j) => {
                if (square.getMarker() === MarkerEnum.NONE) {
                    const neighbor = new GameState(currMarker, new Position(i, j), this.cloneBoard(board), key);
                    neighbor.board.fillSquare(neighbor.position, neighbor.marker);
                    stack.push(neighbor);
                }
            })
        });
        return stack;
    }

    cloneBoard(board: Board): Board {
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
