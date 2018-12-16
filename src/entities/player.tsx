import {PlayerStatus} from './player-status.enum';
import {Position} from './position';
import {MarkerEnum} from "./marker.enum";
import {Board} from "./board";

export abstract class Player {
    private name: string = '';
    private playerStatus: PlayerStatus = PlayerStatus.IDLE;
    private marker: MarkerEnum = MarkerEnum.NONE;
    private score: number = 0;
    private gameID: string = '';

    constructor() {
    }

    equal(otherPlayer: Player): boolean {
        return this.getMarker() === otherPlayer.getMarker();
    }

    abstract makeMove(board: Board, position?: Position): void;

    setMarker(_marker: MarkerEnum): void {
        this.marker = _marker;
    }

    getMarker(): MarkerEnum {
        return this.marker;
    }

    withDraw(): void {
    }

    addScore(): void {
        this.score += 1;
    }

    getScore(): number {
        return this.score;
    }
}
