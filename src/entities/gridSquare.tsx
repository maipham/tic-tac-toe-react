import {MarkerEnum} from "./marker.enum";
import {Position} from "./position";

export default class GridSquare {
    private marker: MarkerEnum = MarkerEnum.NONE;
    private position: Position;

    constructor(_position: Position) {
        this.position = _position;
    }

    setPosition(_row: number, _col: number): void {
        this.position.setPosition(_row, _col);
    }

    getPosition(): Position {
        return this.position;
    }

    setMarker(_marker: MarkerEnum): void {
        if (this.getMarker() === MarkerEnum.NONE) {
            this.marker = _marker;
        }
    }

    getMarker(): MarkerEnum {
        return this.marker;
    }
}