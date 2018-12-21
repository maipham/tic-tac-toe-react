import {GameStatus} from './GameStatus.enum';
import {Position} from "./position";
import {Game} from "./game";
import {MarkerEnum} from "./marker.enum";

export class TwoPlayerGame extends Game{
    constructor() {
        super();
        this.player1.setPlayerMarker(MarkerEnum.X);
        this.player2.setPlayerMarker(MarkerEnum.O);
        this.player1.setName(MarkerEnum.X);
        this.player2.setName(MarkerEnum.O);
    }

    tick(position: Position): void {
        if (this.getGameStatus() === GameStatus.PLAYING) {
            this.getCurrentPlayer().makeMove(this, position.getRow(), position.getCol());
            this.referee.observeGame(this);
        }
    }
    toString(): string {
        return "Human Game";
    }
}
