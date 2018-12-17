import {MarkerEnum} from "./marker.enum";
import {Position} from "./position";

export default class GridSquare {
    private marker: MarkerEnum = MarkerEnum.NONE;
    private position: Position = new Position(-1, -1);

    constructor() {
    }

    setMarker(_marker: MarkerEnum): void {
        this.marker = _marker;
    }

    getMarker(): MarkerEnum {
        return this.marker;
    }
}