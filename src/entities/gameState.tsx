import {MarkerEnum} from "./marker.enum";
import {Board} from "./board";
import {Position} from "./position";

export class GameState {
    public board: Board;
    public marker: MarkerEnum;
    public position: Position;
    constructor(_marker: MarkerEnum, _board: Board, _position: Position) {
        this.board = _board;
        this.marker = _marker;
        this.position = _position;
    }

}
