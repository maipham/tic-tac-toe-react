import {Position} from "./position";
import {Game} from "./game";
import {GameStatus} from "./game-status.enum";
import BotPlayer from "./BotPlayer";
import {MarkerEnum} from "./marker.enum";

export class BotGame extends Game{
    constructor() {
        super();
        this.player2 = new BotPlayer();
        this.player1.setPlayerMarker(MarkerEnum.X);
        this.player2.setPlayerMarker(MarkerEnum.O);
        this.player2.setName('O');
        this.player1.setName('X');
    }

    tick(position: Position): void {
        if (this.getGameStatus() === GameStatus.PLAYING) {
            this.getCurrentPlayer().makeMove(this, position.getRow(), position.getCol());
            this.referee.observeGame(this);
        }
        if (this.getGameStatus() === GameStatus.PLAYING) {
            this.getCurrentPlayer().makeMove(this, position.getRow(), position.getRow());
            this.referee.observeGame(this);
        }
    }
    toString(): string {
        return "AI Game";
    }
}
