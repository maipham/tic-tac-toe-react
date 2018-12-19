import {Position} from "./position";
import {Game} from "./game";
import {GameStatus} from "./game-status.enum";
import {Player} from "./player";

export class AIGame extends Game{
    constructor(_player1: Player, _player2: Player) {
        super(_player1, _player2);
    }

    tick(position: Position): void {
        if (this.getGameStatus() === GameStatus.PLAYING) {
            this.getCurrentPlayer().makeMove(this, position.getRow(), position.getCol());
            this.referee.observeGame(this);
        }
    }
}
