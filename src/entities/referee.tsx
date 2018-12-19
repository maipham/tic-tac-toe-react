import {Game} from './game';
import {GameStatus} from './game-status.enum';
import {Board} from './board';
import {MarkerEnum} from "./marker.enum";

export class Referee {
    constructor() {}

    observeGame(game: Game): GameStatus {
        if (this.checkWin(game.getBoard(), game.getCurrentPlayer().getPlayerMarker())) {
            game.setGameStatus(GameStatus.WIN);
            game.setWinner(game.getCurrentPlayer());
            game.getCurrentPlayer().addScore();
        } else if (game.getBoard().getFillCount() === game.getBoard().getMaxFill()) {
            game.setGameStatus(GameStatus.DRAW);
        } else {
            if (game.getCurrentPlayer().equal(game.getPlayer1())) {
                game.setCurrentPlayer(game.getPlayer2());
            } else {
                game.setCurrentPlayer(game.getPlayer1());
            }
        }
        // console.log(game.getGameStatus());

        return game.getGameStatus();
    }

    checkWin(board: Board, _marker: MarkerEnum): boolean {
        const win = [_marker, _marker, _marker];

        return this.compareMethod(board.getRow(0), win)
            || this.compareMethod(board.getRow(1),  win)
            || this.compareMethod(board.getRow(2),  win)
            || this.compareMethod(board.getCol(0),  win)
            || this.compareMethod(board.getCol(1),  win)
            || this.compareMethod(board.getCol(2),  win)
            || this.compareMethod(board.getDiagonal('left'),  win)
            || this.compareMethod(board.getDiagonal('right'),  win);
    }

    compareMethod(arr1: MarkerEnum[], arr2: MarkerEnum[]): boolean {
        let equal = true;
        arr1.forEach((marker, i) => {
            if (arr2[i] !== marker) {
                equal = false;
            }
        });
        return equal;
    }
}
