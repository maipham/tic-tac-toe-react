import {Position} from "./position";
import {Game} from "./game";
import {GameStatus} from "./game-status.enum";
import AIPlayer from "./AIPlayer";
import {MarkerEnum} from "./marker.enum";

export class AIGame extends Game{
    constructor() {
        super();
        this.player2 = new AIPlayer();
        this.player1.setPlayerMarker(MarkerEnum.X);
        this.player2.setPlayerMarker(MarkerEnum.O);
        this.player2.setName('Bot');
        this.player1.setName('You');
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
