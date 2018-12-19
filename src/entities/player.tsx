import {PlayerStatus} from './player-status.enum';
import {Position} from './position';
import {MarkerEnum} from "./marker.enum";
import {Board} from "./board";
import {Game} from "./game";

export abstract class Player {
    private name: string = '';
    private playerStatus: PlayerStatus = PlayerStatus.IDLE;
    private marker: MarkerEnum = MarkerEnum.NONE;
    private score: number = 0;
    private gameID: string = '';

    constructor() {
    }

    equal(otherPlayer: Player): boolean {
        return this.getPlayerMarker() === otherPlayer.getPlayerMarker();
    }

    abstract makeMove(game: Game, _row?: number, _col?: number): void;

    setPlayerMarker(_marker: MarkerEnum): void {
        this.marker = _marker;
    }

    getPlayerMarker(): MarkerEnum {
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

    setName(_name: string): void {
        this.name = _name;
    }

    getName(): string {
        return this.name;
    }
}
