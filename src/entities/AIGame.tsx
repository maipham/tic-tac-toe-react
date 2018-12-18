import {Position} from "./position";
import {Game} from "./game";
import {GameStatus} from "./game-status.enum";

export class AIGame extends Game{
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
