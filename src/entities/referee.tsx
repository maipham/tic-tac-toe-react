import {Game} from './game';
import {GameStatus} from './game-status.enum';
import {Board} from './board';
import {MarkerEnum} from "./marker.enum";

export class Referee {
    constructor() {}

    observeGame(game: Game): GameStatus {
        if (this.checkWin(game.getBoard(), game.getCurrentPlayer().getMarker())) {
            game.setGameStatus(GameStatus.WIN);
            game.setWinner(game.getCurrentPlayer());
            game.getCurrentPlayer().addScore();
        } else if (game.getBoard().getFillCount() === game.getBoard().getMaxFill()) {
            game.setGameStatus(GameStatus.DRAW);
        } else {
            // Player1 = X     Player2 = O
            if (game.getCurrentPlayer().equal(game.getPlayer1())) {
                game.setCurrentPlayer(game.getPlayer2());
            } else {
                game.setCurrentPlayer(game.getPlayer1());
            }
        }
        return game.getGameStatus();
    }

    checkWin(board: Board, _marker: MarkerEnum): boolean {
        const win = [_marker, _marker, _marker];
        return board.getRow(0) === win
            || board.getRow(1) === win
            || board.getRow(2) === win
            || board.getCol(0) === win
            || board.getCol(1) === win
            || board.getCol(2) === win
            || board.getDiagonal('left') === win
            || board.getDiagonal('right') === win;
    }
}
