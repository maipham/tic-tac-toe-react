import {Game} from "./game";
import {GameStatus} from "./game-status.enum";
import {Position} from "./position";

export class OfflineGame extends Game{
    constructor() {
        super();
    }

    tick(position: Position): void {
        if (this.getGameStatus() === GameStatus.PLAYING) {
            this.getCurrentPlayer().makeMove(this.board, position.getRow(), position.getCol());
            this.referee.observeGame(this);
        }
    }
}
