export class Position {
    private row: number;
    private col: number;

    constructor(_row: number, _col: number) {
        this.row = _row;
        this.col = _col;
    }

    setPosition(_row: number, _col: number): void {
        this.row = _row;
        this.col = _col;
    }

    getCol() {
        return this.col;
    }

    getRow() {
        return this.row;
    }
}
