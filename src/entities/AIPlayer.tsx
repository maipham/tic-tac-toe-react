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
        console.log(bestMove.getRow() + ' ' + bestMove.getCol());
    }

    private generateMove(game: Game): Position {
        let startState = game.getBoard();
        const playerMarker = game.getCurrentPlayer().getPlayerMarker();
        let currMarker = game.getCurrentPlayer().getPlayerMarker();
        let opponentMarker = MarkerEnum.X;
        let stack: GameState[] = [];
        let originalStates: any = {};

        this.initializeGraph(startState, stack, currMarker, originalStates);
        currMarker = this.switchMarker(currMarker);

        let visited: GameState[] = [];
        const referee = new Referee();
        while (stack.length > 0) {
            const currState = stack.pop();
            if (currState !== undefined) {
                if (this.isGoal(currState.board, playerMarker, referee)) {
                    this.updateScore(originalStates, currState, true);
                    console.log('Win boards: ' + originalStates['' + currState.key][1]);
                } else if (this.isGoal(currState.board, opponentMarker, referee)) {
                    this.updateScore(originalStates, currState, false);
                    console.log('opponent win boards: ' + originalStates['' + currState.key][1]);
                } else if (currState.board.isFull()) {
                    console.log('DRAW');
                } else {
                    if (!this.contains(visited, currState)) {
                        visited.push(currState);
                        this.generateNeighbors(currState.board, currMarker, currState.key, stack);
                        currMarker = this.switchMarker(currMarker);
                    }
                }
            }
        }
        const bestState = this.getBestState(originalStates);
        return bestState.position;
    }

    private initializeGraph(startState: Board,
                    stack: GameState[],
                    currMarker: MarkerEnum,
                    originalStates: any) {
        let key = 0;
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
    }

    private getBestState(originalStates: any): GameState {
        let bestScore = 0;
        let bestState: GameState = new GameState(MarkerEnum.NONE, new Position(0, 0), new Board(), 0);
        for (let key in originalStates) {
            if (originalStates.hasOwnProperty(key)) {
                if (originalStates[key][1] > bestScore) {
                    bestScore = originalStates[key][1];
                    bestState = (originalStates[key][0] as GameState);
                }
            }
        }
        console.log('Best Score: ' + bestScore);
        return bestState;
    }

    private contains(visited: GameState[], currState: GameState): boolean {
        let equal = false;
        visited.forEach((state) => {
            state.board.getGrid().forEach((row, i) => {
                row.forEach((square, j) => {
                    equal = currState.board.getGrid()[i][j].getMarker().valueOf() === square.getMarker().valueOf();
                })
            })
        });
        return equal;
    }

    private switchMarker(currMarker: MarkerEnum): MarkerEnum {
        if (currMarker === MarkerEnum.X) {
            return MarkerEnum.O;
        }
        return MarkerEnum.X;
    }

    private generateNeighbors(board: Board, marker: MarkerEnum, key: number, stack: GameState[]): GameState[] {
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

    private updateScore(originalStates: any, currState: GameState, win: boolean): void {
        if (originalStates.hasOwnProperty(currState.key)) {
            if (win) {
                originalStates['' + currState.key][1] = originalStates['' + currState.key][1] + 1;
            } else {
                originalStates['' + currState.key][1] = originalStates['' + currState.key][1] - 1;
            }
        }
    }

    private cloneBoard(board: Board): Board {
        const newBoard = new Board();
        board.getGrid().forEach((row, i) => {
            row.forEach((square, j) => {
                newBoard.fillSquare(new Position(i, j), board.getGrid()[i][j].getMarker());
            })
        });
        return newBoard;
    }

    private isGoal(board: Board, marker: MarkerEnum, referee: Referee): boolean {
        return referee.checkWin(board, marker);
    }
}