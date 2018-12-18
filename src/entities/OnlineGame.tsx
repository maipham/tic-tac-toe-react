import {Game} from "./game";
import {Position} from "./position";
import {GameStatus} from "./game-status.enum";

export class OnlineGame extends Game{
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
