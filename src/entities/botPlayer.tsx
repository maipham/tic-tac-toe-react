import {Player} from "./player";
import {Position} from './position';
import {Board} from "./board";
import {MarkerEnum} from "./marker.enum";
import {GameState} from "./gameState";
import {Game} from "./game";
import {Referee} from "./referee";

export default class BotPlayer extends Player {
    private fc = 0;
    constructor() {
        super();
    }

    makeMove(game: Game, row?: number, col?: number): void {
        const cloneboard = this.cloneBoard(game.getBoard());
        let bestMove: Position;     //////
        bestMove = this.evaluate(cloneboard);
        if (bestMove.getCol() >= 0 && bestMove.getRow() >= 0) {
            game.getBoard().fillSquare(bestMove, super.getPlayerMarker());
            console.log("bot move: " + bestMove.getRow() + ' ' + bestMove.getCol());
        } else {
            const startState = new GameState(game.getCurrentPlayer().getPlayerMarker(), cloneboard, new Position(-1, -1));
            const bestScore: GameScore = this.generateMove(startState, game.getReferee(), 0);
            // const bestScore: GameScore = this.generateMove2(startState, game.getReferee());
            bestMove = bestScore.state.position;
            game.getBoard().fillSquare(bestMove, super.getPlayerMarker());
        }
    }

    private generateMove(gameState: GameState, referee: Referee, _score: number): GameScore {
        let newGameState;
        let newBoard;
        const oppositeMarker = gameState.marker === MarkerEnum.O ? MarkerEnum.X : MarkerEnum.O;
        const scores: GameScore[] = [];
        gameState.board.emptySquares().forEach(emptySquare => {
            newBoard = this.cloneBoard(gameState.board);
            newBoard.fillSquare(emptySquare.getPosition(), oppositeMarker);
            newGameState = new GameState(gameState.marker, newBoard, emptySquare.getPosition());
            const newGameScore = new GameScore(newGameState, _score);
            newGameScore.score += this.getPath(newGameState, referee, _score).score;
            scores.push(newGameScore);
        });
        return this.getBestMove(scores);
    }
    private getBestMove(gameScores: GameScore[]): GameScore{
        let best: GameScore = gameScores[0];
        for (let i = 0; i < gameScores.length; i++) {
            if (gameScores[i].score > best.score) {
                best = gameScores[i];
            }
            if (this.isMiddleSquare(gameScores[i].state.position)) {
                return gameScores[i];
            }
        }
        return best;
    }

    private isMiddleSquare(position: Position): boolean {
        return position.getRow() === 1 && position.getCol() === 1;
    }


    private getPath(gameState: GameState, referee: Referee, _score: number): GameScore {
        if (referee.checkWin(gameState.board, MarkerEnum.X)) {
            return new GameScore(gameState, -1);
        }
        if (referee.checkWin(gameState.board, MarkerEnum.O)) {
            return new GameScore(gameState, 1);
        }
        if (gameState.board.isFull()) {
            return new GameScore(gameState, 0);
        }
        let newGameState;
        let newBoard;
        const oppositeMarker = gameState.marker === MarkerEnum.O ? MarkerEnum.X : MarkerEnum.O;
        const scores: GameScore[] = [];
        gameState.board.emptySquares().forEach(emptySquare => {
            newBoard = this.cloneBoard(gameState.board);
            newBoard.fillSquare(emptySquare.getPosition(), oppositeMarker);
            newGameState = new GameState(gameState.marker, newBoard, emptySquare.getPosition());
            const newGameScore = new GameScore(newGameState, _score);
            newGameScore.score += this.getPath(newGameState, referee, _score).score;
            scores.push(newGameScore);
        });
        return this.bestScore(scores, MarkerEnum.O);
    }

    private bestScore(scores: GameScore[], marker: MarkerEnum): GameScore {
        let bestScore: GameScore = scores[0];
        switch (marker) {
            case MarkerEnum.X:
                scores.forEach(gameScore => {
                    bestScore.score += gameScore.score
                });
                break;
            case MarkerEnum.O:
                scores.forEach(gameScore => {
                    bestScore.score += gameScore.score
                });
                break;
        }
        return bestScore;
    }

    private cloneBoard(board: Board): Board {
        const newBoard = new Board();
        board.getGrid().forEach((row, i) => {
            row.forEach((square, j) => {
                if (board.getGrid()[i][j].getMarker() !== MarkerEnum.NONE) {
                    newBoard.fillSquare(new Position(i, j), board.getGrid()[i][j].getMarker());
                }
            })
        });
        return newBoard;
    }

    private generateMove2(gameState: GameState, referee: Referee): GameScore {
        this.fc++;
        if (referee.checkWin(gameState.board, MarkerEnum.X)) {
            return new GameScore(gameState, 1);
        }
        if (referee.checkWin(gameState.board, MarkerEnum.O)) {
            return new GameScore(gameState, -1);
        }
        if (gameState.board.isFull()) {
            return new GameScore(gameState, 0);
        }
        let newGameState;
        let newBoard;
        const oppositeMarker = gameState.marker === MarkerEnum.O ? MarkerEnum.X : MarkerEnum.O;
        const scores: GameScore[] = [];
        gameState.board.emptySquares().forEach(emptySquare => {
            newBoard = this.cloneBoard(gameState.board);
            newBoard.fillSquare(emptySquare.getPosition(), oppositeMarker);
            newGameState = new GameState(oppositeMarker, newBoard, emptySquare.getPosition());
            scores.push(this.generateMove2(newGameState, referee));
        });
        return this.bestScore2(scores, gameState.marker);
    }

    private bestScore2(scores: GameScore[], marker: MarkerEnum): GameScore {
        let bestMove: GameScore = scores[0];
        switch (marker) {
            case MarkerEnum.X:
                scores.forEach(gameScore => {
                    if (gameScore.score > bestMove.score) {
                        bestMove = gameScore;
                    }
                });
                break;
            case MarkerEnum.O:
                scores.forEach(gameScore => {
                    if (gameScore.score < bestMove.score) {
                        bestMove = gameScore;
                    }
                });
                break;
        }
        return bestMove;
    }

    evaluate(board: Board): Position {
        let bestPos = new Position(-1, -1);
        const ref = new Referee();
        let cloneBoard: Board;
        for (let i = 0; i < board.getGrid().length; i++) {
            for (let j = 0; j < board.getGrid().length; j++) {
                cloneBoard= this.cloneBoard(board);
                if (cloneBoard.getGrid()[i][j].getMarker() === MarkerEnum.NONE) {
                    cloneBoard.fillSquare(new Position(i, j), MarkerEnum.O);
                    console.log(cloneBoard);
                    if (ref.checkWin(cloneBoard, MarkerEnum.O)) {
                        console.log("Im in here");
                        console.log(i + "  " + j);
                        return new Position(i, j);
                    }
                }
            }
        }
        return bestPos;
    }

}

class GameScore {
    state: GameState;
    score: number;

    constructor(_state: GameState, _score: number) {
        this.state = _state;
        this.score = _score;
    }
}