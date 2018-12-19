import {MarkerEnum} from "./marker.enum";
import {Board} from "./board";
import {Position} from "./position";

export class GameState {
    public board: Board;
    public position: Position;
    public marker: MarkerEnum;
    public key: number;
    constructor(_marker: MarkerEnum, _position: Position, _board: Board, key: number ) {
        this.board = _board;
        this.marker = _marker;
        this.position = _position;
        this.key = key;
    }
}
