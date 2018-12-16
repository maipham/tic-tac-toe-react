import {MarkerEnum} from "./marker.enum";

export default class GridSquare {
    private marker: MarkerEnum = MarkerEnum.NONE;

    constructor() {
    }

    setMarker(_marker: MarkerEnum): void {
        this.marker = _marker;
    }

    getMarker(): MarkerEnum {
        return this.marker;
    }
}